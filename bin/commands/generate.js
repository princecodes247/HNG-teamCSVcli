const fs = require("fs");
const crypto = require("crypto");
const csvToJSON = require("../utils/convertCSVToJSON");
const jsonToCSV = require("../utils/convertJSONtoCSV");
const generateCHIA0007 = require("../utils/generateCHIA0007");

function generate(path) {
  let csvFile;
  try {
    //   Convert CSV file to JSON
    csvFile = fs.readFileSync(path, "utf-8");
    console.log("Converting CSV to JSON...");
  } catch (error) {
    console.error("File not found or supported");
    return;
  }
  const json = csvToJSON(csvFile.toString());
  let newJSON = [];
  let teamName = "";
  //   Generate a hash for each object in the JSON array
  json.forEach((obj) => {
    // check if obj["Serial Number"] has "TEAM"
    if ((obj["Serial Number"] || obj["Series Number"]).includes("TEAM")) {
      teamName = (obj["Serial Number"] || obj["Series Number"])
        .toString()
        .trim();
      return;
    }
    // check if obj["Serial Number"] is empty
    if (
      (obj["Serial Number"] || !obj["Series Number"]).toString().trim() === ""
    ) {
      return;
    }
    const chia0007 = generateCHIA0007(obj, teamName, json.length);
    const hash = crypto.createHash("sha256");
    const data = JSON.stringify(chia0007);
    hash.update(data);
    obj.HASH = hash.digest("hex");

    newJSON.push(obj);
    /* Check if the object has a key of "File Name" or "Filename" or
  "Current Name". If it does, it will use that key's value as the file name. If it doesn't, it will
  use the default value of "". */
    const jsonPath = path.replace(
      ".csv",
      `/${obj["File Name"] || obj["Filename"] || obj["Current Name"]}.json`
    );

    // create directory if it doesn't exist
    const dir = path.replace(".csv", "");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(jsonPath, data);
  });

  //   Convert JSON array to CSV
  const newCSV = jsonToCSV(newJSON);

  //   Create a new CSV file with the hash appended to the filename
  const newFileName = new String(path).slice(0, -4) + ".output.csv";
  fs.writeFileSync(newFileName, newCSV);

  console.log(`New CSV file created: ${newFileName}`);
}

module.exports = generate;
