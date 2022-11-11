import { useEffect, useState } from "react";
import "./customizableTableContent.scss";

interface SortableInfo {
  [ind: string]: { field: string; isIncrease: boolean };
}
export const CustomizableTableContent = (props: any) => {
  const { data, title, columns, sortData } = props;

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
    console.log({ sortableInfo });
    setSortInfo(sortableInfo);
  }, []);

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <div
        style={{
          padding: "16px 22px 1%",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          minHeight: 64,
          verticalAlign: "middle",
          fontSize: "1.25rem",
          fontFamily: "Roboto",
          fontWeight: 500,
          lineHeight: 1.6,
          letterSpacing: "0.0075em",
          boxShadow: "0 20px 27px 0 rgb(0 0 0 / 5%)",
          backgroundColor: "#fff",
        }}
      >
        {title}
      </div>
      <table aria-label="customized table">
        <tr>
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
                  className="table-header__sort-img"
                  onClick={() => onHandleSortColumn(col.field)}
                />
              )}
            </th>
          ))}
        </tr>
        {data.map((row: any, index: number) => (
          <tr key={row.id}>{getRowDisplay(row)}</tr>
        ))}
      </table>
    </div>
  );
};
