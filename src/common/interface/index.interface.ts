export enum OrderDirectionType {
  Asc = 'asc',
  Desc = 'desc',
}

export interface ISortRequest {
  sort?: string;
  order?: OrderDirectionType;
}

export interface IPaginateRequest {
  perPage?: number;
  page?: number;
}

export interface IPaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPage: number;
}

export interface IPaginateResponse<T> {
  meta: IPaginationMeta;
  data: Array<T>;
}
