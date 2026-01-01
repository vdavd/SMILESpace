import { DataGrid, type GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import SearchToolbar from "./CustomToolbar";
import { Paper, Stack, Typography, Zoom } from "@mui/material";
import DownloadFingerprints from "./DownloadFingerprints";

interface SimilaritySearchresultProps {
  similarityData: string;
  similarityFingerprints: Record<string, any>[];
  targetFingerprints: Record<string, any>[];
}

type RowObject = Record<string, any> & { molSimToolId: number };

const SimilaritySearchResult = ({
  similarityData,
  similarityFingerprints,
  targetFingerprints,
}: SimilaritySearchresultProps) => {
  const [rows, setRows] = useState<RowObject[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [dataGridIsReady, setDataGridIsReady] = useState(false);

  const gridApiRef = useGridApiRef();

  useEffect(() => {
    if (gridApiRef.current) {
      setDataGridIsReady(true);
    }
  }, [gridApiRef]);

  useEffect(() => {
    if (similarityData) {
      const objectData = JSON.parse(similarityData);
      setRows(objectData);
      const columns = Object.keys(objectData[0]);
      setColumns(columns);
    }
  }, [similarityData]);

  const getRowId = (row: RowObject) => {
    return row.molSimToolId;
  };

  const visibleColumns = columns.filter((column) => column !== "molSimToolId");
  const gridColumns: GridColDef[] = visibleColumns.map((column) => {
    if (column === "id" || column === "") {
      return { field: column, headerName: column, width: 75 };
    }
    return {
      field: column,
      headerName: column,
      flex: 1,
      minWidth: 150,
    };
  });
  return (
    <Zoom in={dataGridIsReady} timeout={500}>
      <Paper
        elevation={10}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          px: 4,
          py: 3,
          my: 2,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6">Similarity search results</Typography>
        <DataGrid
          apiRef={gridApiRef}
          getRowId={getRowId}
          sx={{
            my: 2,
          }}
          rows={rows}
          columns={gridColumns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          slots={{
            toolbar: SearchToolbar,
          }}
          showToolbar
          disableRowSelectionOnClick
        />
        <Stack direction="row" gap={5}>
          <DownloadFingerprints
            fingerprintData={similarityFingerprints}
            filename="smilespace_fingerprints.csv"
            buttonText="Download Fingerprints"
          />
          <DownloadFingerprints
            fingerprintData={targetFingerprints}
            filename="smilespace_target_fingerprints.csv"
            buttonText="Download target Molecule Fingerprints"
          />
        </Stack>
      </Paper>
    </Zoom>
  );
};

export default SimilaritySearchResult;
