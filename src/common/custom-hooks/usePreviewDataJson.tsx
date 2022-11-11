import { useState } from "react";

export const usePreviewDataJSON = () => {
  const [previewData, setPreviewData] = useState([]);

  const onSelectData = (e: any, rowData: any) => {
    if (e.target.checked === true) {
      setPreviewData((prevData) => [...prevData, rowData] as any);
    } else {
      setPreviewData((prevData) =>
        prevData.filter((data: any) => data.id !== rowData.id)
      );
    }
  };

  const renderActions = (rowData: any) => (
    <div style={{ display: "flex" }}>
      <input type="checkbox" onChange={(e) => onSelectData(e, rowData)} />
    </div>
  );

  return { previewData, onSelectData, renderActions };
};
