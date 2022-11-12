export type InputRef = React.LegacyRef<HTMLInputElement>;

export interface SortableInfo {
  [ind: string]: { field: string; isIncrease: boolean };
}

export interface ParamsGetData {
  page: number;
  pageSize: number;
  filter?: { field: string; value: unknown }; //search info
  sortInfo?: { field: string; isIncrease: boolean } | null; //sort info
}

export interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
  [key: string]: any;
}
