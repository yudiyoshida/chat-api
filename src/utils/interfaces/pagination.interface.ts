export interface IPagination<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  page: number;
}
