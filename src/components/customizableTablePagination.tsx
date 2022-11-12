import { useDispatch, useSelector } from "react-redux";
import { getNumPages } from "../common/helpers/pagination.utils";
import { onChangeCurrentPage } from "../redux/slices/post";
import "./customizableTablePagination.scss";

export const CustomizableTablePagination = (props: any) => {
  const { pageSize, isDisable, changePageData } = props;
  const total = useSelector((state: any) => state.postState.total);
  const currentPage = useSelector((state: any) => state.postState.currentPage);
  const dispatcher = useDispatch();

  const handleBackButtonClick = () => {
    const prevPage = currentPage - 1;
    dispatcher(onChangeCurrentPage(prevPage));
    changePageData({ page: prevPage });
  };

  const handleNextButtonClick = () => {
    const nextPage = currentPage + 1;
    dispatcher(onChangeCurrentPage(nextPage));
    changePageData({ page: nextPage });
  };

  const IconClass = `pagination__icon ${
    !isDisable && "pagination__icon--disable"
  }`;

  return (
    <div className={"pagination__container"}>
      <div style={{ marginLeft: 10 }}>total of {total}</div>
      <div className={"pagination__button-area"}>
        <button
          onClick={handleBackButtonClick}
          disabled={currentPage === 0 || isDisable}
          className={IconClass}
          aria-label="previous page"
        >
          {"< Prev"}
        </button>
        <span style={{ padding: "0 10px" }}>{currentPage + 1}</span>
        <button
          onClick={handleNextButtonClick}
          disabled={
            currentPage >= getNumPages(total, pageSize) - 1 || isDisable
          }
          className={IconClass}
          aria-label="next page"
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
};
