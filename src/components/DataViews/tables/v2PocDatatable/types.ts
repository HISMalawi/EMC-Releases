export interface v2ColumnDataInterface {
    column: v2ColumnInterface;
    value: string;
    data: any;
}

// export interface TDClickParams {
//     column: v2ColumnInterface;
//     data: any;
//     refData: any;
//     value: string;
// }

export interface v2ColumnInterface {
    /**
     * Unique column identifier
     */
    ref: string;
    /**
     * Table header string that appears on the report template
     */
    label: string;
    /**
     * May be used as a name of exported column or other things
     */
    secondaryLabel?: string;
    /**
     * Use this function to return value that appears on a value cell of the template
    */
    value?: (data: any, rowIndex?: number) => string | number;
    /**
     * Use this function to format provided ref value from the provided table data
    */
    toValue?: (data: any) => string | number;
    /**
     * If exportable, the column will appear when exported in any format such as PDF or CSV
     */
    exportable?: boolean;
    colSpan?: (data: any) => number;
    dataStyle?: (data: any) => Record<string, string|number>;
    /**
     * Define column or rowspan
     */
    span?: {
        thColspan?: number;
        tdColspan?: number;
        thRowspan?: number;
        tdRowspan?: number;
    };
    /**
     * Define if the column can be be exported in the predefined formats
     */
    canExport?: {
        pdf?: boolean;
        csv?: boolean;
    };
    /**
     * Define the final exportable value
     */
    exportedValue?: {
        column?: (column: v2ColumnInterface) => string;
        dataValue?: (v: v2ColumnDataInterface) => string;
    };
    /**
     * Declare what happens when table data is clicked
     */
    tdClick?: (data: any) => void;
}