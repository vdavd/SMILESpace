import { Button } from "@mui/material";
import exampleDataUrl from "../data/example_data_BBBP.csv";
import type { LabelType, RowObject } from "../types";
import Papa from "papaparse";
import { FILE_ROW_LIMIT } from "../constants";

interface SelectExampleDataProps {
  setFile: (file: File | null) => void;
  setFileReady: (fileReady: boolean) => void;
  setRows: (rows: RowObject[]) => void;
  setColumns: (columns: string[]) => void;
  setParsedFile: (parsedFile: string) => void;
  setSmilesColumn: (smilesColumn: string) => void;
  setLabelColumn: (labelColumn: string) => void;
  setLabelType: (labelType: LabelType) => void;
  setFileSelectError: (fileSelectError: string | null) => void;
}
const LABEL_COLUMN = "Passes blood-brain barrier";
const LABEL_TYPE: LabelType = "categorical";

const SelectExampleData = ({
  setFile,
  setFileReady,
  setRows,
  setColumns,
  setParsedFile,
  setSmilesColumn,
  setLabelColumn,
  setLabelType,
  setFileSelectError,
}: SelectExampleDataProps) => {
  const parseFile = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as object[];

          if (data.length > FILE_ROW_LIMIT) {
            setFileSelectError(`Maximum number of rows: ${FILE_ROW_LIMIT}`);
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
  const loadFile = async () => {
    // Fetch the file as a blob
    const response = await fetch(exampleDataUrl);
    const blob = await response.blob();

    // Create a File object from the blob
    const file = new File([blob], "example_data_BBBP.csv", { type: blob.type });
    parseFile(file);

    setFile(file);
    setFileReady(true);
    setLabelColumn(LABEL_COLUMN);
    setLabelType(LABEL_TYPE);
    setFileSelectError(null);
  };
  return (
    <Button
      variant="contained"
      component="label"
      color="secondary"
      onClick={loadFile}
      sx={{
        py: 1,
        px: 3,
        fontSize: 28,
        boxShadow: 10,
        textShadow: "4px 4px 6px rgba(0,0,0,0.5)",
      }}
    >
      Example data
    </Button>
  );
};

export default SelectExampleData;
