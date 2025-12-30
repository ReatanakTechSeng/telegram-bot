const express = require("express");
const xlsx = require("xlsx");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/save", (req, res) => {
  const { name, age } = req.body;

  const file = "data.xlsx";
  let workbook;
  let worksheet;

  if (fs.existsSync(file)) {
    workbook = xlsx.readFile(file);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    workbook = xlsx.utils.book_new();
    worksheet = xlsx.utils.aoa_to_sheet([["Name", "Age"]]);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  }

  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  data.push([name, age]);

  const newSheet = xlsx.utils.aoa_to_sheet(data);
  workbook.Sheets["Sheet1"] = newSheet;

  xlsx.writeFile(workbook, file);

  res.json({ message: "Data saved to Excel!" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
