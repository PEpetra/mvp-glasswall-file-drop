const rebuildUrlPrefix = ' https://6twzcr250l.execute-api.us-west-2.amazonaws.com/Prod'
const analysisUrlPrefix = 'https://o7ymnow6vf.execute-api.us-west-2.amazonaws.com/Prod'
const analysisSuffix = '/api/Analyse/base64';
const rebuildSuffix = '/api/Rebuild/base64';
const apiKey = 'dp2Ug1jtEh4xxFHpJBfWn9V7fKB3yVcv60lhwOAG'

const analyseFile = (file) => {
  return readFileBase64Async(file).then(base64 => {
    var raw = JSON.stringify({ "Base64": base64 });
    var url = analysisUrlPrefix + analysisSuffix;
    return callFileAnalysis(url, raw);
  });
}

const protectFile = (file) => {
  return readFileBase64Async(file).then(base64 => {
    var raw = JSON.stringify({ "Base64": base64 });
    var url = rebuildUrlPrefix + rebuildSuffix;
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
          "x-api-key" : apiKey,
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
          "x-api-key" : apiKey
        }
      })
      .then ((response) => {
        if (response.ok) {
          return response.blob()
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
