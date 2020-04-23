import {fileTypeDetectionApi} from "../api/fileTypeDetectionApi";

const unsupportedTypes = [
    "Unknown",
    "FileIssues",
    "BufferIssues",
    "InternalIssues",
    "LicenseExpired",
    "PasswordProtectedOpcFile"
  ];

const validFileSize = file => {
    if (file.size > 20000000) {
        return false;
    }
    return true;
}

async function validFileType(file) {
    var result = await fileTypeDetectionApi.getFileType(file);
    
    if(unsupportedTypes.includes(result.fileTypeName)) {
        return false;
    }
    return true;
}

export const fileActions = {
    validFileSize,
    validFileType
  };
  