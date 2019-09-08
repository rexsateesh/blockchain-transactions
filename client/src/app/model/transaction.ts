export interface TransactionPagination {
    count: number;
    rows: Transaction[]
}

export interface Transaction {
    id: number;
    hash: string;
    time: Date;
    weight: number;
    size: number;
}

export interface DataTablePagination {
    sort: string;
    order: string;
    page: number;
    dateFrom?: number;
    dateTo?: number;
}

export interface TransactionFetched {
    totalTransaction: number;
}