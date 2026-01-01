import { Button } from "@mui/material";
import Papa from "papaparse";

type DownloadFingerprintsProps = {
  fingerprintData: Record<string, any>[];
  filename: string;
  buttonText: string;
};

const DownloadFingerprints = ({
  fingerprintData,
  filename,
  buttonText,
}: DownloadFingerprintsProps) => {
  const handleDownload = () => {
    if (fingerprintData.length === 0) return;

    const columns = Object.keys(fingerprintData[0]);
    const columns_ordered = [
      "SMILES",
      ...columns.filter((col) => col !== "SMILES"),
    ];

    const rows_ordered = fingerprintData.map((row) => {
      const row_ordered = [
        row.SMILES,
        ...Object.entries(row)
          .filter(([key]) => key !== "SMILES")
          .map(([, value]) => value),
      ];

      return row_ordered;
    });

    const data = { fields: columns_ordered, data: rows_ordered };

    const csv = Papa.unparse(data);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="text"
      onClick={handleDownload}
      disabled={!fingerprintData}
      sx={{ width: "30%" }}
    >
      {buttonText}
    </Button>
  );
};

export default DownloadFingerprints;
