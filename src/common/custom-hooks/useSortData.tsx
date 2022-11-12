import { useEffect, useState } from "react";
import { SortableInfo } from "../types";

export const useSortData = (props: any) => {
  const { columns, sortData } = props;

  const [sortInfo, setSortInfo] = useState({} as SortableInfo);

  const onHandleSortColumn = (field: string) => {
    const sortingData = {
      field,
      isIncrease: !sortInfo[field].isIncrease,
    };
    setSortInfo({
      ...sortInfo,
      [field]: sortingData,
    });
    sortData({
      sortInfo: sortingData,
    });
  };

  useEffect(() => {
    const sortableInfo: SortableInfo = {};
    columns.forEach((col: any) => {
      if (col.sortable) {
        sortableInfo[col.field] = { field: col.field, isIncrease: true };
      }
    });
    setSortInfo(sortableInfo);
  }, []);

  return { onHandleSortColumn,sortInfo, setSortInfo };
};
