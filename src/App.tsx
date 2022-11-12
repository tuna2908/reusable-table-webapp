import "./App.scss";
import { TablePost } from "./common/constants/view";
import { useFetchData } from "./common/custom-hooks/useFetchData";
import { usePreviewDataJSON } from "./common/custom-hooks/usePreviewDataJson";
import { CustomizableSearchBar } from "./components/customizableSearchBar";
import { CustomizableTableContent } from "./components/customizableTableContent";
import { CustomizableTablePagination } from "./components/customizableTablePagination";

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
            title="Table Post"
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

const PreviewDataJSON = (props: any) => {
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
