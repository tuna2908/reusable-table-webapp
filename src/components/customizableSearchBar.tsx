import { useRef } from "react";
import { COMPONENT_STATUS } from "../common/constants";
import { useChangeStatus } from "../common/custom-hooks/useChangeStatus";
import { setTimeOutAsync } from "../common/helpers/async.utils";
import "./customizableSearchBar.scss";
import { useDispatch } from "react-redux";
import { onChangeCurrentPage, onSetSearchParams } from "../redux/slices/post";

export const VerticalLine = () => (
  <div style={{ height: "90%", display: "flex", flexDirection: "column" }}>
    <div
      style={{
        height: "50%",
        float: "left",
        width: 1.5,
        backgroundImage:
          "linear-gradient(to top, rgb(211, 220, 230), rgba(211, 220, 230, 0))",
      }}
    />
    <div
      style={{
        height: "50%",
        float: "left",
        width: 1.5,
        backgroundImage:
          "linear-gradient(to top, rgba(211, 220, 230, 0), rgb(211, 220, 230))",
      }}
    />
  </div>
);

type InputRef = React.LegacyRef<HTMLInputElement>;

export const CustomizableSearchBar = (props: any) => {
  const { searchData } = props;

  const { status, onSetLoading, onSetPending, onSetSuccess, onSetFailed } =
    useChangeStatus(COMPONENT_STATUS.PENDING);

  const inputRef: InputRef = useRef(null);

  const dispatcher = useDispatch();

  const doSearch = async () => {
    try {
      onSetLoading();

      const searchParams = { field: "type", value: inputRef.current?.value };
      searchData({ filter: searchParams });
      dispatcher(onSetSearchParams(searchParams));
      dispatcher(onChangeCurrentPage(0));

      await setTimeOutAsync(0, onSetSuccess);
      await setTimeOutAsync(1500, onSetPending);
    } catch (err) {
      console.log("doSearch", err);
      await setTimeOutAsync(1500, onSetPending);
    }
  };

  return (
    <div className={"search-bar__container"}>
      <div className={"search-bar__content"}>
        <div className={`setting__headbar__icon-success`} />
        <input
          ref={inputRef}
          placeholder={"enter type"}
          style={{ marginLeft: 10 }}
        />
      </div>

      <VerticalLine />
      <div className="search-bar__search-btn" onClick={doSearch}>
        {status === COMPONENT_STATUS.PENDING && (
          <img
            className={`search-bar__icon search-bar__icon--search`}
            alt=""
            title="searching"
          />
        )}
        {status === COMPONENT_STATUS.SUCCESS && (
          <div className={`search-bar__icon search-bar__icon--success`} />
        )}
      </div>
    </div>
  );
};
