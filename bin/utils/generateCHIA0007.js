function generateCHIA0007(nft, total) {
  //  Create a new object with the CHIA0007 schema
  const name = nft["Current Name"] || nft["File Name"] || nft["Filename"];
  const description = nft["Description"];
  const gender = nft["Gender"];

  /* Getting the serial number of the NFT. */
  const sn = parseInt(nft["Series Number"] || nft["Serial Number"]);

  const metadata = {
    format: "CHIA-0007",
    name: name,
    description: description,
    minting_tool: "",
    series_total: total,
    series_number: sn,
    attributes: [{ trait_type: "gender", value: gender }],
    collection: {
      name: "Zuri NFT Tickets for Free Lunch",

      id: "b774f676-c1d5-422e-beed-00ef5510c64d",

      attributes: [
        {
          type: "description",

          value: "Rewards for accomplishments during HNGi9.",
        },
      ],
    },
  };

  return metadata;
}

module.exports = generateCHIA0007;
