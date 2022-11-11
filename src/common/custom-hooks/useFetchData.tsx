import { useEffect } from "react";
import { useChangeStatus } from "./useChangeStatus";
import { COMPONENT_STATUS, DEFAULT_PAGE_SIZE } from "../constants";
import { onGetPosts, onSetTotalPosts } from "../../redux/slices/post";
import { useDispatch, useSelector } from "react-redux";
import virtualData from "../../sample-data.json";
import { setTimeOutAsync } from "../helpers/async.utils";

interface ParamsGetData {
  page: number;
  pageSize: number;
  filter?: { field: string; value: unknown };
  sortInfo?: { field: string; isIncrease: boolean } | null;
}

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
  [key: string]: any;
}

const sortIncrement = (arr: any[], field: string) => {
  return arr.sort((a, b) => a[field] - b[field]);
};

const sortDecrement = (arr: any[], field: string) => {
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

  if (filter?.value !== undefined && filter?.value !== "") {
    const { field, value } = filter;
    copyData = virtualData.filter((data: PostData) => data[field] === value);
    total = copyData.length;
  } else copyData = [...virtualData];

  console.log({ sortInfo });
  if (sortInfo?.field) {
    const { field, isIncrease } = sortInfo;
    if (isIncrease) copyData = sortIncrement(copyData, field);
    else copyData = sortDecrement(copyData, field);
  }

  const startInd = page * pageSize;
  const endInd = page * pageSize + pageSize;

  return {
    items: copyData.slice(startInd, endInd),
    total,
  };
};

export const useFetchData = () => {
  const { status, onSetLoading, onSetPending } = useChangeStatus(
    COMPONENT_STATUS.LOADING
  );

  const dispatcher = useDispatch();
  const data = useSelector((state: any) => state.postState.posts);
  const searchParams = useSelector(
    (state: any) => state.postState.searchParams
  );

  useEffect(() => {
    const loadData = async () => {
      await onFetchData({ page: 0 }, 1000);
    };
    loadData();
  }, []);

  const onFetchData = async (
    params: Partial<ParamsGetData>,
    delayTime: number = 0
  ) => {
    onSetLoading();

    const finalGetParams = {
      page: params.page || 0,
      pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
      filter: params.filter || searchParams,
      sortInfo: params.sortInfo || null,
    };
    const { items, total } = await getData(finalGetParams, delayTime);

    dispatcher(onGetPosts(items));

    dispatcher(onSetTotalPosts(total));
    onSetPending();
  };

  return { data, status, onFetchData };
};
