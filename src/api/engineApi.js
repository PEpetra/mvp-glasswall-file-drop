const analysisSuffix = '/api/Analyse/base64';
const rebuildSuffix = '/api/Rebuild/base64';

const analyseFile = (file) => {
  return readFileBase64Async(file).then(base64 => {
    var raw = JSON.stringify({ "Base64": base64 });
    var url = process.env.REACT_APP_ANALYSE_API_ENDPOINT + analysisSuffix;
    return callFileAnalysis(url, raw);
  });
}

const protectFile = (file) => {
  return readFileBase64Async(file).then(base64 => {
    var raw = JSON.stringify({ "Base64": base64 });
    var url = process.env.REACT_APP_REBUILD_API_ENDPOINT + rebuildSuffix;
    return callFileProtect(url, raw);
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

const callFileAnalysis = (url, raw) => {
  const promise = new Promise((resolve, reject) => {
      resolve(fetch(url, {
        method: 'POST',
        body: raw,
        headers: {
          "x-api-key" : process.env.REACT_APP_ANALYSE_API_KEY,
          "Content-Type": "application/json"
        } 
      })
      .then ((response) => {
        if (response.ok) {
          return response.text()
        }
        else{
          throw new Error('Something went wrong');
        }
      }));
  });

  return promise;
}

const callFileProtect = (url, data) => {
  const promise = new Promise((resolve, reject) => {
      resolve(fetch(url, {
        method: 'POST',
        body: data,
        headers: {
          "x-api-key" : process.env.REACT_APP_REBUILD_API_KEY,
          "Content-Type": "application/json"
        }
      })
      .then ((response) => {
        if (response.ok) {
          return response.text().then(function (text) {
            var chars = atob(text);

            var byteNumbers = new Array(chars.length);
            for (let i = 0; i < chars.length; i++){
              byteNumbers[i] = chars.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            return new Blob([byteArray])
          })
        }
        else{
          throw new Error('Something went wrong');
        }
      }));
  });

  return promise;
}

export const engineApi = {
  analyseFile,
  protectFile,
};
