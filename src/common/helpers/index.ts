import { ParamsGetData, PostData } from "../types";
import { setTimeOutAsync } from "./async.utils";
import virtualData from "../../sample-data.json";

export const sortIncrement = (arr: any[], field: string) => {
  return arr.sort((a, b) => a[field] - b[field]);
};

export const sortDecrement = (arr: any[], field: string) => {
  return arr.sort((a, b) => b[field] - a[field]);
};

export const getData = async (
  option: ParamsGetData,
  delayTimeInMillisecond: number
) => {
  await setTimeOutAsync(delayTimeInMillisecond);
  const { filter, page, pageSize, sortInfo } = option;

  let copyData = [];
  let total = virtualData.length;

  //prepare data for searching by field
  if (filter?.value !== undefined && filter?.value !== "") {
    const { field, value } = filter;
    copyData = virtualData.filter((data: PostData) => data[field] === value);
    total = copyData.length;
  } else copyData = [...virtualData];

  //prepare data for sorting by field
  if (sortInfo?.field) {
    const { field, isIncrease } = sortInfo;
    if (isIncrease) copyData = sortIncrement(copyData, field);
    else copyData = sortDecrement(copyData, field);
  }

  //preate pagination data
  const startInd = page * pageSize;
  const endInd = page * pageSize + pageSize;

  return {
    items: copyData.slice(startInd, endInd),
    total,
  };
};

export const getQueryParams = (): Partial<ParamsGetData> => {
  const searchParams = new URLSearchParams(window.location.search);
  const page = searchParams.get("page");
  const type = searchParams.get("type");

  let queryParams: Partial<ParamsGetData> = { page: 0 };

  if (page) {
    queryParams = { page: parseInt(page as string) };
  }
  if (type) {
    queryParams = { ...queryParams, filter: { field: "type", value: type } };
  }
  return queryParams;
};
