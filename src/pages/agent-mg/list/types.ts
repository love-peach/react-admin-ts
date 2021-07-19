export interface TDemo {
    rows: ITableDataItem[];
    [key: string]: any;
}

export interface ITableDataItem {
    id?: number;
    erp?: string;
    userName?: string;
    valid?: number;
    roleNames?: string;
    areaNames?: string;
    areaIds?: string;
    [key: string]: any;
}

export interface TQueryParams {
    name?: string;
}
