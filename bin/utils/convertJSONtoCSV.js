function jsonToCSV(json) {
  const array1 = json.map((obj) => {
    const arr = [];
    Object.keys(obj).forEach((key) => {
      arr.push(obj[key]);
    });
    return arr;
  });

  const headers = Object.keys(json[0]);
  const csv = [headers.join(",")]
    .concat(array1.map((line) => line.join(",")))
    .join("\r");

  return csv;
}

module.exports = jsonToCSV;
