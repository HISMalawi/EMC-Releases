import { Option } from "@/components/Forms/FieldInterface";

export interface TableColumnInterface {
  label: string;
  path: string;
  exportable?: boolean;
  initialSort?: boolean;
  sortable?: boolean;
  date?: boolean;
  initialSortOrder?: sortType;
  sortCaseSensitive?: boolean;
}

export interface SortQueryInterface {
  columnId: string;
  order: sortType;
  caseSensitive: boolean;
}

export type sortType = "asc" | "desc" | "none";

export interface PaginationInterface {
  enabled: boolean;
  page: number;
  pageSize: number;
  start: number;
  end: number;
  totalPages: number;
  visibleBtns: number;
  pageSizeOptions: number[];
}
export interface TableFilterInterface {
  pagination: PaginationInterface;
  search: string;
  sort: SortQueryInterface[];
}

export interface ActionButtonInterface {
  label: string;
  icon?: string;
  action: (activeRows: any[], allRows: any[], filters: TableFilterInterface) => any;
  color?: string;
}

export interface RowActionButtonInterface {
  label?: string;
  icon?: string;
  action: (row: any) => any;
  color?: string;
  default?: boolean;
}

export interface CustomFilterInterface {
  id: string;
  label: string;
  value?: any;
  type: "text" | "number" | "date" | "select" | "dateRange";
  options?: string[];
  placeholder?: string;
}