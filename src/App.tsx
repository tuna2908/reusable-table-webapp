import "./App.css";
import { TablePost } from "./common/constants/view";
import { useFetchData } from "./common/custom-hooks/useFetchData";
import { usePreviewDataJSON } from "./common/custom-hooks/usePreviewDataJson";
import { CustomizableSearchBar } from "./components/customizableSearchBar";
import { CustomizableTableContent } from "./components/customizableTableContent";
import { CustomizableTablePagination } from "./components/customizableTablePagination";

function App() {
  const { data, onFetchData } = useFetchData();
  const { previewData, renderActions } = usePreviewDataJSON();

  return (
    <div className="App">
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
      />
      <CustomizableTablePagination pageSize={25} changePageData={onFetchData} />
      <PreviewDataJSON data={previewData} />
    </div>
  );
}

const PreviewDataJSON = (props: any) => {
  const { data } = props;
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
};

export default App;
