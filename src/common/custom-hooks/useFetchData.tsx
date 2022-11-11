import { useEffect } from "react";
import { useChangeStatus } from "./useChangeStatus";
import { COMPONENT_STATUS, DEFAULT_PAGE_SIZE } from "../constants";
import { onGetPosts, onSetTotalPosts } from "../../redux/slices/post";
import { useDispatch, useSelector } from "react-redux";
import virtualData from "../../sample-data.json";
import { setTimeOutAsync } from "../helpers/async.utils";

export const getData = async (
  page: number,
  page_size: number = DEFAULT_PAGE_SIZE,
  timeout: number = 1000
) => {
  await setTimeOutAsync(timeout);

  const startInd = page * page_size;
  const endInd = page * page_size + page_size;
  const copyData = [...virtualData];

  return {
    items: copyData.slice(startInd, endInd),
    total: virtualData.length,
  };
};

export const useFetchData = () => {
  const { status, onSetLoading, onSetPending } = useChangeStatus(
    COMPONENT_STATUS.LOADING
  );

  const dispatcher = useDispatch();
  const data = useSelector((state: any) => state.postState.posts);

  useEffect(() => {
    async function loadData() {
      await onFetchData(0, 1000);
    }
    loadData();
  }, []);

  const onFetchData = async (page: number, timeout: number = 0) => {
    onSetLoading();
const { items, total } = await getData(page, DEFAULT_PAGE_SIZE, timeout);
    dispatcher(onGetPosts(items));
    dispatcher(onSetTotalPosts(total));
    onSetPending();
  };

  return { data, status, onFetchData };
};
