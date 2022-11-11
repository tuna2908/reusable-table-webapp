import { useDispatch, useSelector } from "react-redux";
import { getNumPages } from "../common/helpers/pagination.utils";
import { onChangeCurrentPage } from "../redux/slices/post";

export const CustomizableTablePagination = (props: any) => {
  const { pageSize, isDisable, changePageData } = props;
  const total = useSelector((state: any) => state.postState.total);
  const currentPage = useSelector((state: any) => state.postState.currentPage);
  const dispatcher = useDispatch();

  const handleBackButtonClick = () => {
    const prevPage = currentPage - 1;
    dispatcher(onChangeCurrentPage(prevPage));
    changePageData(prevPage);
  };

  const handleNextButtonClick = () => {
    const nextPage = currentPage + 1;
    dispatcher(onChangeCurrentPage(nextPage));
    changePageData(nextPage);
  };

  const IconClass = `pagination__icon ${
    !isDisable && "pagination__icon--disable"
  }`;

  return (
    <div className={"classes.root"}>
      <button
        onClick={handleBackButtonClick}
        disabled={currentPage === 0 || isDisable}
        className={IconClass}
        aria-label="previous page"
      >
        {"< Prev"}
      </button>
      <div>{currentPage + 1}</div>
      <button
        onClick={handleNextButtonClick}
        disabled={currentPage >= getNumPages(total, pageSize) - 1 || isDisable}
        className={IconClass}
        aria-label="next page"
      >
        {"Next >"}
      </button>
    </div>
  );
};
