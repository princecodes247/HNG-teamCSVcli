const fs = require("fs");
const crypto = require("crypto");
const csvToJSON = require("../utils/convertCSVToJSON");
const jsonToCSV = require("../utils/convertJSONtoCSV");

function generate(path) {
  try {
    //   Convert CSV file to JSON
    const csvFile = fs.readFileSync(path, "utf-8");
    console.log("Converting CSV to JSON...");

    const json = csvToJSON(csvFile.toString());

    //   Generate a hash for each object in the JSON array
    json.forEach((obj) => {
      const hash = crypto.createHash("sha256");
      hash.update(JSON.stringify(obj));
      obj.HASH = hash.digest("hex");
    });

    //   Convert JSON array to CSV
    const newCSV = jsonToCSV(json);

    //   Create a new CSV file with the hash appended to the filename
    const newFileName = new String(path).slice(0, -4) + ".output.csv";
    fs.writeFileSync(newFileName, newCSV);

    console.log(`New CSV file created: ${newFileName}`);
  } catch (error) {
    console.error("File not found or supported");
  }
}

module.exports = generate;
