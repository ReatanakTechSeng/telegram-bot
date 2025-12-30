function exportToExcel() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  // CSV format
  const data = [
    ["Name", "Age"],
    [name, age]
  ];

  let csv = data.map(row => row.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  a.click();

  window.URL.revokeObjectURL(url);
}
