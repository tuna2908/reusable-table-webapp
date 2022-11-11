import { useEffect, useState } from "react";

import { COMPONENT_STATUS, INPUT_MODE } from "../common/constants";
import { useChangeStatus } from "../common/custom-hooks/useChangeStatus";

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

const getSendingSearchParams = (data: any) => {
  // let resultObj = {};
  // data.forEach((item) => {
  //   let key = item.inField;
  //   if (item.value && item.value[key])
  //     resultObj[item.outField] = item.value[key];
  // });
  // return resultObj;
};

export const CustomizableSearchBar = (props: any) => {
  const { controller, searchConfig } = props;

  const [filter, setFilter] = useState();

  const { status, onSetLoading, onSetPending, onSetSuccess, onSetFailed } =
    useChangeStatus(COMPONENT_STATUS.PENDING);

  const doSearch = async () => {
    // try {
    //   let searchParams = {};
    //   let otherParams = getSendingSearchParams(filter);
    //   let page_size = 50;
    //   if (paginationConfig) page_size = paginationConfig.page_size;
    //   searchParams = { page_size, page: 1, ...otherParams };
    //   onSetLoading();
    //   await controller.get(searchParams);
    //   setReduxFilter({ ...searchParams });
    //   await setTimeOutAsync(500, onSetSuccess);
    //   await setTimeOutAsync(1500, onSetPending);
    // } catch (err) {
    //   console.log("doSearch", err);
    //   await setTimeOutAsync(1500, onSetPending);
    // }
  };

  useEffect(() => {
    setFilter(searchConfig);
  }, [searchConfig]);

  const onChangeTextInIndex = (value: string, index: number) => {
    // try {
    //   filter[index].value = value;
    //   setFilter([...filter]);
    // } catch (err) {
    //   console.log("onChangeTextInIndex", err);
    // }
  };

  return (
    <div className={"search-bar__container"}>
      {/* {searchConfig.map((filter, index) => (
        <div key={"F" + index}>
          {index !== 0 && <VerticalLine />}
          <div className={"search-bar__content"}>
            {filter.icon()}
            {filter.mode === INPUT_MODE.INPUT_TEXT && (
              <input
                title={filter.displayText}
                onChange={(event) =>
                  onChangeTextInIndex(
                    { [filter.inField]: event.target.value },
                    index
                  )
                }
                style={{ marginLeft: 10 }}
                className={"form__input"}
              />
            )}
          </div>
        </div>
      ))} */}

      <VerticalLine />
      <div className="search-bar__search-btn" onClick={doSearch}>
        {status === COMPONENT_STATUS.PENDING && (
          <img className={`search-bar__icon`} alt="" title="searching" />
        )}
        {/* {status === COMPONENT_STATUS.LOADING && (
          <CircularProgress
            style={{ width: 20, height: 20 }}
            className="text--color"
          />
        )}
        {status === COMPONENT_STATUS.SUCCESS && (
          <div className={`setting__headbar__icon-success`}>
            <DoneAllOutlined />
          </div>
        )} */}
      </div>
    </div>
  );
};

