import { useState } from "react";
import { COMPONENT_STATUS } from "../constants";

export const useChangeStatus = (initStatus = COMPONENT_STATUS.PENDING) => {
  const [status, onChangeStatus] = useState(initStatus);

  const onSetPending = () => onChangeStatus(COMPONENT_STATUS.PENDING);
  const onSetDeleting = () => onChangeStatus(COMPONENT_STATUS.DELETING);
  const onSetEditing = () => onChangeStatus(COMPONENT_STATUS.EDITING);
  const onSetCreating = () => onChangeStatus(COMPONENT_STATUS.CREATING);

  const onSetSuccess = () => onChangeStatus(COMPONENT_STATUS.SUCCESS);
  const onSetFailed = () => onChangeStatus(COMPONENT_STATUS.FAILED);
  const onSetLoading = () => onChangeStatus(COMPONENT_STATUS.LOADING);

  return {
    status,
    onSetPending,
    onSetDeleting,
    onSetEditing,
    onSetSuccess,
    onSetFailed,
    onSetLoading,
    onSetCreating,
  };
};
