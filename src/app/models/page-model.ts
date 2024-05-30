export interface PageModel<T> {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  elements: T;
}
