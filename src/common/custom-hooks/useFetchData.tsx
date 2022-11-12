import { useEffect } from "react";
import { useChangeStatus } from "./useChangeStatus";
import { COMPONENT_STATUS, DEFAULT_PAGE_SIZE } from "../constants";
import { onChangeCurrentPage, onGetPosts, onSetTotalPosts } from "../../redux/slices/post";
import { useDispatch, useSelector } from "react-redux";
import { ParamsGetData } from "../types";
import { getData, getQueryParams } from "../helpers";

export const useFetchData = () => {
  const { status, onSetLoading, onSetPending } = useChangeStatus(COMPONENT_STATUS.LOADING);

  const dispatcher = useDispatch();
  const data = useSelector((state: any) => state.postState.posts);
  const searchParams = useSelector((state: any) => state.postState.searchParams);

  useEffect(() => {
    const loadData = async () => {
      const queryParams = getQueryParams(); //get init data from url query params
      await onFetchData(queryParams, 1000);
      dispatcher(onChangeCurrentPage(queryParams.page));
    };
    loadData();
  }, []);

  const onFetchData = async (
    params: Partial<ParamsGetData>,
    delayTime: number = 0
  ) => {
    try {
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
    } catch (error) {
      onSetPending();
    }
  };

  return { data, status, onFetchData };
};
