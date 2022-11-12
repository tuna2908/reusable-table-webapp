import { COMPONENT_STATUS } from "../common/constants";
import { useSortData } from "../common/custom-hooks/useSortData";
import "./customizableTableContent.scss";

export const CustomizableTableContent = (props: PropsTypes) => {
  const { data, columns, fetchStatus } = props;

  const { sortInfo, onHandleSortColumn } = useSortData(props);

  const getRowDisplay = (row: any) => {
    return (columns || []).map((column: any, ind: number) => (
      <td key={row.id + ind}>
        {column.render ? column.render(row) : row[column.field]}
      </td>
    ));
  };

  return (
    <div className="table__container">
      <table
        aria-label="customized table"
        style={{ width: "100%", height: "100%" }}
      >
        <tbody>
          <tr className="table__header table__header--sticky">
            {columns.map((col: any, index: number) => (
              <th key={col.title + index} style={{ position: "relative" }}>
                <span>{col.title}</span>
                {col.sortable && (
                  <img
                    src={`${
                      sortInfo[col.field]?.isIncrease
                        ? "./images/up.png"
                        : "./images/down.png"
                    }`}
                    alt={col.field}
                    className="table__header__sort-img"
                    onClick={() => onHandleSortColumn(col.field)}
                  />
                )}
              </th>
            ))}
          </tr>
          {data.length === 0 && <tr />}
          {data.map((row: any) => (
            <tr key={"row" + row.id} className={"table__data-row"}>{getRowDisplay(row)}</tr>
          ))}
        </tbody>
      </table>
      {fetchStatus === COMPONENT_STATUS.LOADING && (
        <h1 className="table__loading">LOADING...</h1>
      )}
      {fetchStatus !== COMPONENT_STATUS.LOADING && data.length === 0 && (
        <h1 className="table__loading">No Data To Show</h1>
      )}
    </div>
  );
};

interface PropsTypes {
  data: object[];
  columns: object[];
  fetchStatus: string;
  sortData: (...params: any) => Promise<void>;
}
