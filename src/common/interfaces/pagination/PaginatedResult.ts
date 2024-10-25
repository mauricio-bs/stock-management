export class PaginatedResult<T> {
  total: number;
  page: number;
  data: T[];
}
