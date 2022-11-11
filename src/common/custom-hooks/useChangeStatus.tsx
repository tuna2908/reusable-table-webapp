import { useState } from 'react';
import { COMPONENT_STATUS } from '../constants';

export const useChangeStatus = (initStatus = COMPONENT_STATUS.PENDING) => {
    const [status, onChangeStatus] = useState(initStatus);

    const onSetPending = () => onChangeStatus(COMPONENT_STATUS.PENDING);
    const onSetDeleting = () => onChangeStatus(COMPONENT_STATUS.DELETING);
    const onSetEditing = () => onChangeStatus(COMPONENT_STATUS.EDITING);
    const onSetCreating = () => onChangeStatus(COMPONENT_STATUS.CREATING);

    const onSetSuccess = () => onChangeStatus(COMPONENT_STATUS.SUCCESS);
    const onSetFailed = () => onChangeStatus(COMPONENT_STATUS.FAILED);
    const onSetLoading = () => onChangeStatus(COMPONENT_STATUS.LOADING);

    const onSetInit = () => onChangeStatus(COMPONENT_STATUS.INIT);
    const onSetAuthorizedFailed = () => onChangeStatus(COMPONENT_STATUS.AUTHORIZED_FAILED);
    const onSetAuthorizedSuccess = () => onChangeStatus(COMPONENT_STATUS.AUTHORIZED_SUCCESS);

    const onSetConfiguring = () => onChangeStatus(COMPONENT_STATUS.CONFIGURING);

    //config devices
    const onSetHasNewOTA = () => onChangeStatus(COMPONENT_STATUS.CONFIG_DEVICE.HAS_NEW_FW);

    //upgrade OTA
    const onSetGettingInfo = () => onChangeStatus(COMPONENT_STATUS.UPGRADE_OTA.GETTING_INFO);

    //showDetail
    const onSetShowDetail = () => onChangeStatus(COMPONENT_STATUS.SHOW_DETAIL);

    //devices
    const onSetDownloadCert = () => onChangeStatus(COMPONENT_STATUS.DEVICE.DOWNLOAD_CERT);

    //firmware
    const onSetDownloadFirmware = () => onChangeStatus(COMPONENT_STATUS.FIRMWARE.DOWNLOAD);
    const onSetUploadFirmware = () => onChangeStatus(COMPONENT_STATUS.FIRMWARE.UPLOAD);
    const onSetAttachFirmware = () => onChangeStatus(COMPONENT_STATUS.FIRMWARE.ATTACH);

    //app
    const onSetAttachTypes = () => onChangeStatus(COMPONENT_STATUS.APP.ATTACH_TYPE);
    const onSetAppScope = () => onChangeStatus(COMPONENT_STATUS.APP.SHOW_APP_SCOPE);
    const onSetBuildApp = () => onChangeStatus(COMPONENT_STATUS.APP.BUILD_APP);
    const onSetSelectEmail = () => onChangeStatus(COMPONENT_STATUS.APP.SELECT_EMAIL);
    const onSetSecret = () => onChangeStatus(COMPONENT_STATUS.APP.SECRET);
    const onSetManageEntity = () => onChangeStatus(COMPONENT_STATUS.APP.MANAGE_ENTITY);
    const onSetEditName = () => onChangeStatus(COMPONENT_STATUS.APP.EDIT_NAME);
    const onSetMoreSetting = () => onChangeStatus(COMPONENT_STATUS.APP.MORE_SETTING);
    const onSetCreateNotification = () => onChangeStatus(COMPONENT_STATUS.APP.APP_NOTIFICATION);
    const onSetDeleteNotificationSuccess = () => onChangeStatus(COMPONENT_STATUS.APP.DELETING_NOTIF_SUCCESS);

    return {
        status,
        onSetPending,
        onSetDeleting,
        onSetEditing,
        onSetSuccess,
        onSetFailed,
        onSetLoading,
        onSetInit,
        onSetAuthorizedFailed,
        onSetAuthorizedSuccess,
        onSetCreating,
        onSetConfiguring,
        onSetHasNewOTA,
        onSetGettingInfo,
        onSetShowDetail,
        onSetDownloadCert,
        onSetDownloadFirmware,
        onSetUploadFirmware,
        onSetAttachFirmware,
        onSetAttachTypes,
        onSetAppScope,
        onSetBuildApp,
        onSetSelectEmail,
        onSetSecret,
        onSetManageEntity,
        onSetEditName,
        onSetMoreSetting,
        onSetCreateNotification,
        onSetDeleteNotificationSuccess,
    };
};
