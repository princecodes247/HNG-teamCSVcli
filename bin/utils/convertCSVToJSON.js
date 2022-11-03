const fs = require("fs");

function csvToJSON(csv) {
  const array1 = csv.split("\r");

  const headers = array1[0].split(",");
  const lines = array1.slice(1);

  const json = lines.map((line) => {
    const obj = {};
    const currentline = line.split(",");

    headers.forEach((header, i) => {
      obj[header] = currentline[i];
    });

    return obj;
  });

  const jsonStr = JSON.stringify(json);

  // convert to javascript object
  const jsonObj = JSON.parse(jsonStr);
  return jsonObj;
}

module.exports = csvToJSON;
