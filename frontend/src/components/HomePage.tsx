import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Container,
  Fade,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import UploadFile from "./FileUpload";
import InteractivePlot from "./InteractivePlot";
import DisplayData from "./DisplayData";
import SelectFile from "./SelectFile";
import {
  type FingerPrintTypeType,
  type DimRedMethodType,
  type LabelType,
  type RowObject,
  type AnalysisMode,
} from "../types";
import PlotSkeleton from "./PlotSkeleton";
import NavBar from "./NavBar";
import SelectExampleData from "./SelectExampleData";
import HeaderBar from "./HeaderBar";
import VisualizationSettings from "./VisualizationSettings";
import SimilaritySearchSettings from "./SimilaritySearchSettings";
import AnalysisModeSelect from "./AnalysisModeSelect";
import SimilaritySearchResult from "./SimilaritySearchResult";
//@ts-ignore
import "@fontsource/figtree";

const HomePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedFile, setParsedFile] = useState("");
  const [analyzedData, setAnalyzedData] = useState("");
  const [rows, setRows] = useState<RowObject[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [smilesColumn, setSmilesColumn] = useState("");
  const [labelColumn, setLabelColumn] = useState("");
  const [labelType, setLabelType] = useState<LabelType>("");
  const [highlightedSmiles, setHighlightedSmiles] = useState<string[]>([]);
  const [dimRedMethod, setDimRedMethod] = useState<DimRedMethodType>("PCA");
  const [fingerPrintType, setFingerPrintType] =
    useState<FingerPrintTypeType>("Morgan");
  const [removeOutliers, setremoveOutliers] = useState(false);
  const [outlierPercentage, setOutlierPercentage] = useState<number | null>(1);
  const [numberNeighborsUmap, setNumberNeighborsUmap] = useState<number | null>(
    25
  );
  const [visualizationAnalysisInProcess, setVisualizationAnalysisInProcess] =
    useState(false);
  const [similarityAnalysisInProcess, setSimilarityAnalysisInProcess] =
    useState(false);
  const [fileReady, setFileReady] = useState(false);
  const [fileSelectError, setFileSelectError] = useState<string | null>(null);
  const [plotDataError, setPlotDataError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [analysisMode, setAnalysisMode] =
    useState<AnalysisMode>("Visualization");
  const [targetSmiles, setTargetSmiles] = useState<string[]>([]);
  const [similarityData, setSimilarityData] = useState("");
  const [visualizationFingerprintUrl, setVisualizationFingerprintUrl] =
    useState("");
  const [similarityFingerprintUrl, setSimilarityFingerprintUrl] = useState("");
  const [targetFingerprintUrl, setTargetFingerprintUrl] = useState("");

  const visualizationScrollTargetRef = useRef<HTMLDivElement>(null);
  const similarityScrollTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (
      visualizationAnalysisInProcess &&
      visualizationScrollTargetRef.current
    ) {
      visualizationScrollTargetRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [visualizationAnalysisInProcess]);

  useEffect(() => {
    if (similarityData && similarityScrollTargetRef.current) {
      similarityScrollTargetRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [similarityData]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        minWidth: 1280,
        minHeight: 800,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Fade in={loaded} timeout={800}>
        <Box>
          <NavBar />
        </Box>
      </Fade>

      <Box
        sx={{
          width: "90%",
          minHeight: analyzedData ? "210vh" : "80vh",
          px: 4,
          py: 3,
        }}
      >
        {file ? (
          <>
            <Fade in={fileReady} timeout={800}>
              <Box>
                <HeaderBar />
              </Box>
            </Fade>
            <Slide in={fileReady} timeout={800} direction="up">
              <Paper
                elevation={10}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  px: 4,
                  py: 3,
                  my: 4,
                  borderRadius: 3,
                }}
              >
                <SelectFile
                  size="small"
                  setFile={setFile}
                  setRows={setRows}
                  setColumns={setColumns}
                  setParsedFile={setParsedFile}
                  setSmilesColumn={setSmilesColumn}
                  setLabelColumn={setLabelColumn}
                  setAnalyzedData={setAnalyzedData}
                  setFileReady={setFileReady}
                  setFileSelectError={setFileSelectError}
                  setTargetSmiles={setTargetSmiles}
                />
                {fileSelectError && (
                  <Alert
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 180,
                    }}
                    severity="error"
                  >
                    {fileSelectError}
                  </Alert>
                )}
                <DisplayData
                  file={file}
                  rows={rows}
                  columns={columns}
                  smilesColumn={smilesColumn}
                  setRows={setRows}
                  setColumns={setColumns}
                  setParsedFile={setParsedFile}
                  setSmilesColumn={setSmilesColumn}
                  highlightedSmiles={highlightedSmiles}
                  setHighlightedSmiles={setHighlightedSmiles}
                  analyzedData={analyzedData}
                  targetSmiles={targetSmiles}
                  setTargetSmiles={setTargetSmiles}
                  setFileSelectError={setFileSelectError}
                  setFile={setFile}
                />
                <AnalysisModeSelect
                  analysisMode={analysisMode}
                  setAnalysisMode={setAnalysisMode}
                />
                {analysisMode === "Visualization" && (
                  <>
                    <VisualizationSettings
                      columns={columns}
                      rows={rows}
                      labelColumn={labelColumn}
                      setLabelColumn={setLabelColumn}
                      smilesColumn={smilesColumn}
                      setSmilesColumn={setSmilesColumn}
                      labelType={labelType}
                      setLabelType={setLabelType}
                      fingerPrintType={fingerPrintType}
                      setFingerPrintType={setFingerPrintType}
                      dimRedMethod={dimRedMethod}
                      setDimRedMethod={setDimRedMethod}
                      numberNeighborsUmap={numberNeighborsUmap}
                      setNumberNeighborsUmap={setNumberNeighborsUmap}
                      removeOutliers={removeOutliers}
                      setremoveOutliers={setremoveOutliers}
                      outlierPercentage={outlierPercentage}
                      setOutlierPercentage={setOutlierPercentage}
                    />
                    <UploadFile
                      parsedFile={parsedFile}
                      smilesColumn={smilesColumn}
                      setAnalyzedData={setAnalyzedData}
                      dimRedMethod={dimRedMethod}
                      fingerPrintType={fingerPrintType}
                      removeOutliers={removeOutliers}
                      outlierPercentage={outlierPercentage}
                      numberNeighborsUmap={numberNeighborsUmap}
                      visualizationAnalysisInProcess={
                        visualizationAnalysisInProcess
                      }
                      setVisualizationAnalysisInProcess={
                        setVisualizationAnalysisInProcess
                      }
                      buttonDisabled={
                        !(
                          parsedFile &&
                          smilesColumn &&
                          labelColumn &&
                          labelType
                        )
                      }
                      plotDataError={plotDataError}
                      setPlotDataError={setPlotDataError}
                      setFingerprintUrl={setVisualizationFingerprintUrl}
                    />
                  </>
                )}
                {analysisMode === "Similarity" && (
                  <SimilaritySearchSettings
                    parsedFile={parsedFile}
                    columns={columns}
                    smilesColumn={smilesColumn}
                    setSmilesColumn={setSmilesColumn}
                    targetSmiles={targetSmiles}
                    setTargetSmiles={setTargetSmiles}
                    setSimilarityData={setSimilarityData}
                    similarityAnalysisInProcess={similarityAnalysisInProcess}
                    setSimilarityAnalysisInProcess={
                      setSimilarityAnalysisInProcess
                    }
                    setSimilarityFingerprintUrl={setSimilarityFingerprintUrl}
                    setTargetFingerprintUrl={setTargetFingerprintUrl}
                  />
                )}
              </Paper>
            </Slide>
            <div ref={visualizationScrollTargetRef}>
              {visualizationAnalysisInProcess ? (
                <PlotSkeleton size={"large"} />
              ) : (
                analyzedData &&
                labelColumn && (
                  <InteractivePlot
                    analyzedData={analyzedData}
                    labelColumn={labelColumn}
                    smilesColumn={smilesColumn}
                    labelType={labelType}
                    highlightedSmiles={highlightedSmiles}
                    dimRedMethod={dimRedMethod}
                    removeOutliers={removeOutliers}
                    setPlotDataError={setPlotDataError}
                    visualizationFingerprintUrl={visualizationFingerprintUrl}
                  />
                )
              )}
            </div>

            <div ref={similarityScrollTargetRef}>
              {similarityData && (
                <SimilaritySearchResult
                  similarityData={similarityData}
                  similarityFingerprintUrl={similarityFingerprintUrl}
                  targetFingerprintUrl={targetFingerprintUrl}
                />
              )}
            </div>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Fade in={loaded} timeout={800}>
              <Box>
                <HeaderBar />
              </Box>
            </Fade>
            <Fade in={loaded} timeout={800}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 10,
                  mb: 5,
                }}
              >
                <SelectFile
                  size="large"
                  setFile={setFile}
                  setRows={setRows}
                  setColumns={setColumns}
                  setParsedFile={setParsedFile}
                  setSmilesColumn={setSmilesColumn}
                  setLabelColumn={setLabelColumn}
                  setAnalyzedData={setAnalyzedData}
                  setFileReady={setFileReady}
                  setFileSelectError={setFileSelectError}
                  setTargetSmiles={setTargetSmiles}
                />

                <Typography
                  sx={{
                    color: "white",
                    textShadow: "4px 4px 8px rgba(0,0,0,1)",
                    mx: 4,
                  }}
                  variant="h5"
                  textAlign="center"
                >
                  OR
                </Typography>

                <SelectExampleData
                  setFile={setFile}
                  setFileReady={setFileReady}
                  setRows={setRows}
                  setColumns={setColumns}
                  setParsedFile={setParsedFile}
                  setSmilesColumn={setSmilesColumn}
                  setLabelColumn={setLabelColumn}
                  setLabelType={setLabelType}
                  setFileSelectError={setFileSelectError}
                />
              </Box>
            </Fade>

            {fileSelectError && (
              <Alert sx={{ mt: 4 }} severity="error">
                {fileSelectError}
              </Alert>
            )}
            <Fade in={loaded} timeout={800}>
              <Box sx={{ mt: 4, width: "80%" }}>
                <Typography
                  variant="h5"
                  color="white"
                  textAlign="center"
                  sx={{
                    textShadow: `
    2px 2px 3px rgba(0,0,0,1),
    4px 4px 8px rgba(0,0,0,1)
  `,
                    lineHeight: 1.8,
                  }}
                >
                  SMILESpace is an interactive web tool for visualizing chemical
                  space from SMILES input. It maps molecules into intuitive 2D
                  PCA or UMAP projections using multiple fingerprint and
                  embedding types, enabling visual similarity analysis, compound
                  highlighting, and fast similarity searches between target
                  molecules and chemical libraries.
                </Typography>
              </Box>
            </Fade>

            <Fade in={loaded} timeout={800}>
              <Box
                sx={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  color="white"
                  textAlign="center"
                  sx={{
                    textShadow: `
    2px 2px 3px rgba(0,0,0,1),
    4px 4px 8px rgba(0,0,0,1)
  `,
                    mb: 2,
                  }}
                >
                  SMILESpace is free and available or all users, including
                  commercial use. No login is required.
                </Typography>
              </Box>
            </Fade>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
