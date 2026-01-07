import { Button } from "@mui/material";
import { FILE_ROW_LIMIT, MAX_FILE_SIZE_MB } from "../constants";
import Papa from "papaparse";
import type { RowObject } from "../types";

interface FileSelectProps {
  size: "small" | "large";
  setFile: (file: File | null) => void;
  setRows: (rows: RowObject[]) => void;
  setColumns: (columns: string[]) => void;
  setParsedFile: (parsedFile: string) => void;
  setSmilesColumn: (smilesColumn: string) => void;
  setLabelColumn: (labelColumn: string) => void;
  setAnalyzedData: (analyzedData: string) => void;
  setFileReady: (fileReady: boolean) => void;
  setFileSelectError: (fileSelectError: string | null) => void;
  setTargetSmiles: (targetSmiles: string[]) => void;
}

const FileSelect = ({
  size,
  setFile,
  setRows,
  setColumns,
  setParsedFile,
  setSmilesColumn,
  setLabelColumn,
  setAnalyzedData,
  setFileReady,
  setFileSelectError,
  setTargetSmiles,
}: FileSelectProps) => {
  const parseFile = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as object[];

          if (data.length > FILE_ROW_LIMIT) {
            setFileSelectError(
              `Maximum number of rows allowed: ${FILE_ROW_LIMIT}`
            );
            resolve(false);
            return;
          }

          const columns = Object.keys(data[0]);

          const dataWithIds = data.map((item, index) => ({
            molSimToolId: index,
            ...item,
          }));

          setRows(dataWithIds);
          setColumns(["molSimToolId", ...columns]);
          setParsedFile(Papa.unparse(dataWithIds));

          const smilesColumnCandidates = columns.filter((column) =>
            column.toLowerCase().includes("smiles")
          );

          if (smilesColumnCandidates.length > 0) {
            setSmilesColumn(smilesColumnCandidates[0]);
          }

          resolve(true);
        },
        error: () => resolve(false),
      });
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];

      const MAX_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

      if (file.size > MAX_SIZE) {
        setFileSelectError(
          `File size too large. Maximum allowed size: ${MAX_FILE_SIZE_MB} MB`
        );
        return;
      }

      const success = await parseFile(file);
      if (!success) {
        return;
      }

      setFileSelectError(null);
      setFile(event.target.files[0]);
    }
    setAnalyzedData("");
    setLabelColumn("");
    setFileReady(true);
    setTargetSmiles([]);
  };

  return (
    <div>
      {size === "large" ? (
        <>
          <Button
            variant="contained"
            component="label"
            sx={{
              py: 1,
              px: 3,
              fontSize: 28,
              boxShadow: 10,
              textShadow: "4px 4px 6px rgba(0,0,0,0.5)",
            }}
          >
            Select File
            <input
              id="file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              hidden
            />
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            component="label"
            sx={{ boxShadow: 3, position: "absolute", top: 15, right: 35 }}
          >
            Select File
            <input
              id="file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              hidden
            />
          </Button>
        </>
      )}
    </div>
  );
};

export default FileSelect;
