import { useState } from "react";

export const usePreviewDataJSON = () => {
  const [previewData, setPreviewData] = useState([]);
  const previewDataIds = previewData.map((data: any) => data.id);

  const onSelectData = (e: any, rowData: any) => {
    if (e.target.checked === true) {
      setPreviewData((prevData) => [...prevData, rowData] as any);
    } else {
      setPreviewData((prevData) =>
        prevData.filter((data: any) => data.id !== rowData.id)
      );
    }
  };

  const renderActions = (rowData: any) => {
    const isChecked = previewDataIds.includes(rowData.id);
    return (
      <div style={{ display: "flex" }}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onSelectData(e, rowData)}
        />
      </div>
    );
  };

  return { previewData, onSelectData, renderActions, setPreviewData };
};
