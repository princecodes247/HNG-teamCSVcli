function jsonToCSV(json) {
  //  Convert JSON array to CSV

  // Get the keys from the first object in the array
  const array1 = json.map((obj) => {
    const arr = [];
    Object.keys(obj).forEach((key) => {
      arr.push(obj[key]);
    });
    return arr;
  });

  //  Create a new array with the keys as the first element
  const headers = Object.keys(json[0]);

  //  Add the headers to the beginning of the array
  const csv = [headers.join(",")]
    .concat(array1.map((line) => line.join(",")))
    .join("\r");

  return csv;
}

module.exports = jsonToCSV;
