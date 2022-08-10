import { computed, defineComponent, h, onMounted, PropType, reactive, ref, watch } from "vue";
import { TableColumnInterface, TableFilterInterface, ActionButtonInterface, RowActionButtonInterface, CustomFilterInterface } from "./types";
import './datatable.css'
import get from 'lodash/get';
import isEmpty from "lodash/isEmpty";
import orderBy from "lodash/orderBy";
import range from "lodash/range";
import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonSkeletonText } from "@ionic/vue";
import { arrowDown, arrowUp, swapVertical, caretBack, caretForward } from "ionicons/icons";
import dayjs from "dayjs";
import DateRangePicker from "../inputs/DateRangePicker.vue";

export const DataTable = defineComponent({
  name: "DataTable",
  props: {
    rows: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    asyncRows: {
      type: Function as PropType<() => Promise<any[]>>,
      required: false
    },
    columns: {
      type: Array as PropType<TableColumnInterface[]>,
      default: () => []
    },
    actionsButtons: {
      type: Array as PropType<ActionButtonInterface[]>,
      default: () => []
    },
    rowActionsButtons: {
      type: Array as PropType<RowActionButtonInterface[]>,
      default: () => []
    },
    customFilters: {
      type: Array as PropType<CustomFilterInterface[]>,
      default: () => []
    },
    color: {
      type: String as PropType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "dark" | "medium" | "custom">,
    },
  },
  emits: ["customFilter", "queryChange", "drilldown"],
  setup(props, { emit }) {
    const isLoading = ref(false);
    const totalColumns = computed(() => isEmpty(props.rowActionsButtons) ? props.columns.length : props.columns.length + 1);
    const tableRows = ref<any[]>([]);
    const filteredRows = ref<any[]>([]);
    const activeRows = ref<any[]>([])
    const totalFilteredRows = computed(() => filteredRows.value.length);
    const filters = reactive<TableFilterInterface>({
      search: "",
      sort: [],
      pagination: {
        enabled: true,
        page: 1,
        pageSize: 10,
        start: 1,
        end: 1,
        totalPages: 1,
        visibleBtns: 7,
        pageSizeOptions: [5, 10, 20, 50, 100]
      }
    });

    const customFiltersValues = reactive<Record<string, any>>(
      props.customFilters.reduce((acc, filter) => {
        acc[filter.id] = filter.value;
        return acc;
      }, {} as Record<string, any>)
    );

    watch(customFiltersValues, () => {
      if (Object.values(customFiltersValues).every(value => {
        if (typeof value === "object") {
          return Object.values(value).every(v => !isEmpty(v));
        }
        return !isEmpty(value);
      })) {
        emit("customFilter", customFiltersValues);
      }
    },
      {
        immediate: true,
        deep: true
      });

    const paginationPages = computed(() => filters.pagination.enabled
      ? range(filters.pagination.start, filters.pagination.end + 1)
      : []
    )

    const filter = () => {
      if (!filters.search) return filteredRows.value = tableRows.value;
      const filter = filters.search.toLowerCase();
      filteredRows.value = tableRows.value.filter(row => Object.values(row).some((value: any) =>
        value && JSON.stringify(value).toLowerCase().includes(filter)
      ));
    }

    const sort = () => {
      if (isEmpty(filters.sort) || isEmpty(filteredRows)) return;
      const orders = filters.sort.map((sortConfig) => sortConfig.order);
      filteredRows.value = orderBy(
        filteredRows.value,
        filters.sort.map(({ columnId, caseSensitive }) => (row) => {
          const value = get(row, columnId);
          if (columnId.match(/arv_number/i)) return parseInt(value.toString().split("-")[2]);
          if (typeof value === "number") return value;
          if (caseSensitive) return value !== null ? value : "";
          return value !== null ? value.toString().toLowerCase() : "";
        }),
        orders as any
      );
    };

    const paginate = () => {
      if (isEmpty(filteredRows)) return;
      const start = (filters.pagination.page - 1) * filters.pagination.pageSize;
      const end = start + filters.pagination.pageSize;
      activeRows.value = filteredRows.value.slice(start, end);
    };

    const isNextPrevPageVisible = () => {
      return (
        paginationPages.value.includes(filters.pagination.page - 1) ||
        filters.pagination.page === 1
      ) && (
          paginationPages.value.includes(filters.pagination.page + 1) ||
          filters.pagination.page === filters.pagination.totalPages
        )
    }

    const calculatePageRange = (force = false) => {
      filters.pagination.totalPages = Math.ceil(totalFilteredRows.value / filters.pagination.pageSize)

      if (filters.pagination.totalPages <= filters.pagination.visibleBtns) {
        filters.pagination.start = 1
        filters.pagination.end = filters.pagination.totalPages
        return
      }

      if (!force && isNextPrevPageVisible()) return;

      filters.pagination.start = filters.pagination.page === 1 ? 1 : filters.pagination.page - 1;
      filters.pagination.end = filters.pagination.start + filters.pagination.visibleBtns - 5;

      if (filters.pagination.start <= 3) {
        filters.pagination.end += 3 - filters.pagination.start;
        filters.pagination.start = 1;
      }

      if (filters.pagination.end >= filters.pagination.totalPages - 2) {
        filters.pagination.start -= filters.pagination.end - (filters.pagination.totalPages - 2);
        filters.pagination.end = filters.pagination.totalPages;
      }

      filters.pagination.start = Math.max(filters.pagination.start, 1);
    };

    const initializeFilters = () => {
      filters.sort = props.columns
        .filter(({ initialSort }) => initialSort)
        .map(({ path, initialSortOrder, sortCaseSensitive }) => ({
          columnId: path,
          order: initialSortOrder || "asc",
          caseSensitive: sortCaseSensitive || false
        }));
    }

    const updateSortQueries = (column: TableColumnInterface) => {
      const queryIndex = filters.sort.findIndex(({ columnId }) => columnId === column.path);
      if (queryIndex >= 0) {
        filters.sort[queryIndex].order = filters.sort[queryIndex].order === 'asc'
          ? 'desc'
          : 'asc'
      } else {
        filters.sort = [{
          columnId: column.path,
          order: "asc",
          caseSensitive: column.sortCaseSensitive || false
        }]
      }
    }

    const initializeRows = async () => {
      if (typeof props.asyncRows === "function") {
        isLoading.value = true;
        tableRows.value = await props.asyncRows();
        isLoading.value = false;
      } else {
        tableRows.value = props.rows
      }
    }

    watch(() => props.rows, async () => {
      await initializeRows();
      initializeFilters();
    });

    watch(filters, () => {
      filter();
      sort()
      paginate()
      calculatePageRange()
    }, {
      immediate: true,
      deep: true
    })

    onMounted(async () => {
      await initializeRows()
      initializeFilters();
    });

    return () => [
      h(IonGrid, { class: "ion-padding-vertical", style: { width: '100%', fontWeight: 500 } },
        h(IonRow, [
          h(IonCol, { size: '7' },
            h(IonRow, [
              h(IonCol, { size: '4', class: "ion-margin-bottom" },
                h(IonSearchbar, {
                  placeholder: 'Search here...',
                  class: 'box ion-no-padding',
                  value: filters.search,
                  onIonChange: (e: Event) => {
                    filters.search = (e.target as HTMLInputElement).value;
                    filters.pagination.page = 1;
                  },
                })
              ),
              ...props.customFilters.map(filter => {
                if (filter.type === 'dateRange') {
                  return h(IonCol, { size: 8 },
                    h(DateRangePicker, {
                      range: (computed(() => filter.value || { startDate: "", endDate: "" })).value,
                      onRangeChange: async (newRange: any) => {
                        customFiltersValues[filter.id] = newRange;
                      }
                    })
                  )
                } else if (filter.type === 'select') {
                  return h(IonCol, { size: 4 },
                    h(IonItem, { class: "box ion-padding-start", lines: "none", style: { display: 'inline-block', '--min-height': '11px', width: '100%' } }, [
                      h(IonLabel, filter.label),
                      h(IonSelect, {
                        value: (computed(() => filter.value || "")).value,
                        onIonChange: (e: Event) => {
                          customFiltersValues[filter.id] = (e.target as HTMLInputElement).value;
                        }
                      },
                        filter.options?.map((option, index) =>
                          h(IonSelectOption, { value: option, key: index }, option)
                        )),
                    ])
                  )
                } else {
                  return h(IonCol, { size: 4 },
                    h(IonInput, {
                      class: 'box',
                      type: filter.type,
                      placeholder: filter.placeholder,
                      value: (computed(() => filter.value || "")).value,
                      onIonInput: async (e: Event) => {
                        customFiltersValues[filter.id] = (e.target as HTMLInputElement).value;
                      }
                    })
                  )
                }
              })
            ])
          ),
          h(IonCol, { size: '5', class: "ion-padding-end" },
            props.actionsButtons.map(btn => h(IonButton, {
              class: 'ion-float-right',
              color: btn.color || 'primary',
              onClick: () => btn.action(activeRows.value, tableRows.value, filters)
            }, [
              btn.label,
              btn.icon && h('span', { style: { color: 'white', paddingLeft: '5px', paddingRight: '5px' } }, ' | '),
              btn.icon && h(IonIcon, { icon: btn.icon }),
            ]))
          )
        ])
      ),
      h("div", { class: "responsive-table ion-padding-horizontal" },
        h("table", { class: "table bordered-table striped-table" }, [
          h("thead", { class: props.color },
            h("tr", [
              ...props.columns.map(column =>
                h("th", { key: column.label, style: {minWidth: '190px'}, onClick: () => updateSortQueries(column) },
                  [
                    h("span", column.label),
                    h(IonIcon, {
                      icon: (computed(() => {
                        const query = filters.sort.find(({ columnId }) => columnId === column.path);
                        return !query ? swapVertical : query.order == "asc" ? arrowUp : arrowDown;
                      })).value,
                      style: {
                        marginRight: "5px",
                        float: "right",
                        cursor: 'pointer'
                      }
                    })
                  ]
                )
              ),
              !isEmpty(props.rowActionsButtons) && h('th', 'Actions')
            ])
          ),
          h("tbody", { class: "table-body" }, isLoading.value
            ? [...Array(10)].map((i: number) =>
              h("tr", { key: i },
                h('td', { colspan: totalColumns.value },
                  h(IonSkeletonText, { animated: true, style: { width: '100%' } })
                )
              )
            )
            : isEmpty(filteredRows.value)
              ? h('tr', h('td', { colspan: totalColumns.value },
                h('div', { class: 'no-data-table' }, 'No data available')
              ))
              : activeRows.value.map(row =>
                h('tr', {
                  key: row, onClick: async () => {
                    const defualtActionBtn = props.rowActionsButtons.find(btn => btn.default)
                    if (defualtActionBtn) await defualtActionBtn.action(row)
                  }
                }, [
                  ...props.columns.map(column => {
                    let value = get(row, column.path);
                    if (column.date && value) value = dayjs(value).format('DD/MMM/YYYY');
                    return h('td', { key: column.path, style: {minWidth: '190px'} }, 
                      column.drillable && value
                        ? h('a', { onClick: () => emit("drilldown", {column, row})}, value)
                        : value
                    )
                  }),
                  !isEmpty(props.rowActionsButtons) && h('td', props.rowActionsButtons.map(btn =>
                    h(IonButton, { key: btn.icon, size: 'small', color: btn.color || 'primary', onClick: () => btn.action(row) },
                      btn.icon ? h(IonIcon, { icon: btn.icon }) : btn.label || "Button"
                    )
                  ))
                ])
              )
          ),
        ])
      ),
      h(IonGrid, { style: { width: '100%', textAlign: 'left', color: 'black' }, class: 'ion-padding' },
        h(IonRow, [
          h(IonCol, { size: 4 }, [
            h(IonButton, {
              color: "light",
              size: 'medium',
              disabled: filters.pagination.page === filters.pagination.start,
              onClick: () => filters.pagination.page--
            }, h(
              IonIcon, { icon: caretBack }
            )),
            filters.pagination.start > 3 && h(IonButton, { size: 'medium', color: "light", onClick: () => filters.pagination.page = 1 }, 1),
            filters.pagination.start > 3 && h(IonButton, { size: 'medium', color: "light", disabled: true }, '...'),
            paginationPages.value.map(page => h(
              IonButton, {
              size: 'medium',
              color: filters.pagination.page === page ? 'primary' : 'light',
              onClick: () => filters.pagination.page = page
            },
              page
            )),
            filters.pagination.end < (filters.pagination.totalPages - 2) && h(IonButton, { size: 'medium', color: "light", disabled: true }, '...'),
            filters.pagination.end < (filters.pagination.totalPages - 2) && h(IonButton, { size: 'medium', color: "light", onClick: () => filters.pagination.page = filters.pagination.totalPages }, filters.pagination.totalPages),
            h(IonButton, {
              color: "light",
              size: 'medium',
              disabled: filters.pagination.page === filters.pagination.end,
              onClick: () => filters.pagination.page++
            }, h(
              IonIcon, { icon: caretForward }
            )),
          ]),
          h(IonCol, { size: 4, style: { textAlign: 'center' } }, [
            h(IonItem, { class: "box", lines: "none", style: { display: 'inline-block', '--min-height': '11px', width: '190px', marginLeft: '.5rem' } }, [
              h(IonLabel, { class: 'ion-margin-end' }, "Go to page"),
              h(IonInput, {
                type: "number",
                min: 1,
                max: filters.pagination.totalPages,
                value: filters.pagination.page,
                style: { paddingRight: '15px' },
                debounce: 500,
                onIonChange: (e: Event) => {
                  const page = parseInt((e.target as HTMLInputElement).value);
                  if (page > 0 && page <= filters.pagination.totalPages) {
                    filters.pagination.page = page;
                  }
                }
              }),
            ]),
            h(IonItem, { class: "box", lines: "none", style: { display: 'inline-block', '--min-height': '11px', width: '240px', marginLeft: '.5rem' } }, [
              h(IonLabel, "Items per page"),
              h(IonSelect, {
                value: filters.pagination.pageSize,
                onIonChange: (e: Event) => {
                  filters.pagination.pageSize = parseInt((e.target as HTMLInputElement).value)
                  filters.pagination.page = 1
                }
              }, [
                ...filters.pagination.pageSizeOptions.map((option, index) =>
                  h(IonSelectOption, { value: option, key: index }, option)
                ),
                h(IonSelectOption, { value: totalFilteredRows.value }, "All")
              ]),
            ]),
          ]),
          h(IonCol, { size: 4, style: { marginTop: '1rem', textAlign: 'right', fontWeight: 500 } }, totalFilteredRows.value
            ? `Showing ${(computed(() => (filters.pagination.page === 1) ? 1 : (filters.pagination.page * filters.pagination.pageSize) - (filters.pagination.pageSize - 1)
            )).value
            } to ${(computed(() => (filters.pagination.page === filters.pagination.totalPages)
              ? totalFilteredRows.value
              : filters.pagination.page * filters.pagination.pageSize
            )).value
            } of ${totalFilteredRows.value} entries`
            : "No data available"
          )
        ])
      )
    ]
  }
})