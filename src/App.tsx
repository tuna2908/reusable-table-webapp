import "./App.scss";
import { TablePost } from "./common/constants/view";
import { useFetchData, usePreviewDataJSON } from "./common/custom-hooks";
import { CustomizableSearchBar, CustomizableTableContent, CustomizableTablePagination } from "./components";

function App() {
  const { data, onFetchData, status } = useFetchData();
  const { previewData, renderActions } = usePreviewDataJSON();

  return (
    <div className="App">
      <div className="app__container">
        <div style={{ width: "60%" }}>
          <h1 style={{ marginBottom: 5 }}>Table Manage Post</h1>
          <CustomizableSearchBar searchData={onFetchData} />
          <CustomizableTableContent
            data={data}
            columns={[
              { ...TablePost.columns.id },
              { ...TablePost.columns.useId },
              { ...TablePost.columns.title },
              { ...TablePost.columns.type },
              { ...TablePost.columns.actions, render: renderActions },
            ]}
            sortData={onFetchData}
            fetchStatus={status}
          />
          <CustomizableTablePagination
            pageSize={25}
            changePageData={onFetchData}
          />
        </div>
        <PreviewDataJSON data={previewData} />
      </div>
    </div>
  );
}

const PreviewDataJSON = (props: { data: object[] }) => {
  const { data } = props;
  return (
    <div className="app__preview-area">
      <h1 style={{ marginBottom: 0 }}>Preview JSON Data</h1>
      <pre
        style={{
          marginTop: 20,
          overflow: "scroll",
          background: "antiquewhite",
          border: "black 0.5px solid",
          maxHeight: "70vh",
          height: "70vh",
        }}
      >
        {JSON.stringify(data, null, 4)}
      </pre>
    </div>
  );
};

export default App;
