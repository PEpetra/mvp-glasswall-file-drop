const urlPrefix = ' https://fglpdf9gf6.execute-api.us-west-2.amazonaws.com/Prod';
const fileTypeDetectionSuffix = '/api/FileTypeDetection/base64';
const apiKey = 'dp2Ug1jtEh4xxFHpJBfWn9V7fKB3yVcv60lhwOAG';

const getFileType = (file) => {
  return readFileBase64Async(file).then(base64 => {
    var raw = JSON.stringify({ "Base64": base64 });
    var url = urlPrefix + fileTypeDetectionSuffix;
    return callFileTypeDetection(url, raw);
  });
}

const readFileBase64Async = (file) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var base64 = reader.result.replace(/^data:.+;base64,/, '');
      resolve(base64);
    };
  });
}

const callFileTypeDetection = (url, raw) => {
  const promise = new Promise((resolve, reject) => {
      resolve(fetch(url, {
        method: 'POST',
        body: raw,
        headers: {
          "x-api-key" : apiKey,
          "Content-Type": "application/json"
      }})
      .then ((response) => {
        if (response.ok) {
          return response.json()
        }
        else{
          throw new Error('Something went wrong');
        }
      })
      .catch (error => {
        console.log("Error occured ladedaa: " + error)
      }))
    });

  return promise;
}

export const fileTypeDetectionApi = {
  getFileType
};
