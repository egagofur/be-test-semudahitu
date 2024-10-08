import { IPaginationMeta } from './index.interface';

export interface IApiResponse<T> {
  message: string;
  meta?: IPaginationMeta;
  data: T | null;
}

interface IDataUnprocessable {
  property: string;
  message: string[];
}

export interface IUnprocessableResponse {
  message: string;
  data: Array<IDataUnprocessable>;
}
