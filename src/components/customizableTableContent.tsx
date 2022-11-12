import { useEffect, useState } from "react";
import { COMPONENT_STATUS } from "../common/constants";
import "./customizableTableContent.scss";

interface SortableInfo {
  [ind: string]: { field: string; isIncrease: boolean };
}
export const CustomizableTableContent = (props: any) => {
  const { data, columns, sortData, fetchStatus } = props;

  const getRowDisplay = (row: any) => {
    return (columns || []).map((column: any) => (
      <td>{column.render ? column.render(row) : row[column.field]}</td>
    ));
  };

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

  return (
    <div className="table__container">
      <table
        aria-label="customized table"
        style={{ width: "100%", height: "100%" }}
      >
        <tr className="table__header table__header--sticky">
          {columns.map((col: any, index: number) => (
            <th key={col.title + index}>
              <span>{col.title}</span>
              {col.sortable && (
                <img
                  src={`${
                    sortInfo[col.field]?.isIncrease
                      ? "./images/up.png"
                      : "./images/down.png"
                  }`}
                  alt=""
                  className="table__header__sort-img"
                  onClick={() => onHandleSortColumn(col.field)}
                />
              )}
            </th>
          ))}
        </tr>

        {fetchStatus === COMPONENT_STATUS.LOADING && (
          <h1 className="table__loading">LOADING...</h1>
        )}

        {fetchStatus !== COMPONENT_STATUS.LOADING && data.length === 0 && (
          <h1 className="table__loading">No Data To Show</h1>
        )}
        {data.map((row: any, index: number) => (
          <tr key={row.id}>{getRowDisplay(row)}</tr>
        ))}
      </table>
    </div>
  );
};
