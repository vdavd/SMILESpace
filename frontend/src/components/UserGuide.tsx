import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Container,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Slide,
  Typography,
} from "@mui/material";
import NavBar from "./NavBar";
import HeaderBar from "./HeaderBar";
import PanIcon from "./icons/PanIcon";
import CameraIcon from "./icons/CameraIcon";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useEffect, useState } from "react";

const UserGuide = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        minWidth: 1280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
          width: "100%",
          maxWidth: "90%",
          px: 4,
          py: 3,
        }}
      >
        <Fade in={loaded} timeout={800}>
          <Box>
            <HeaderBar />
          </Box>
        </Fade>
        <Slide in={loaded} timeout={800} direction="up">
          <Paper
            elevation={0}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              px: 4,
              py: 1,
              my: 1,
              borderRadius: 3,
              backgroundColor: "#FFFFFF00",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                mb: 1,
                textAlign: "center",
                textShadow: "4px 4px 6px rgba(0,0,0,1)",
              }}
            >
              User Guide
            </Typography>
            <Card
              elevation={10}
              sx={{
                my: 3,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ ml: 2 }}>
                  1. Visualization
                </Typography>

                <List dense sx={{ ml: 3 }}>
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="#step-1.1">
                      <ListItemText primary="Step 1.1. — Select File" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a" href="#step-1.2">
                      <ListItemText primary="Step 1.2. — Analysis Settings" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a" href="#step-1.3">
                      <ListItemText primary="Step 1.3. — Explore & Visualize" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a" href="#step-1.4">
                      <ListItemText primary="Step 1.4. — Highlight Molecules" />
                    </ListItemButton>
                  </ListItem>
                </List>
                <Typography gutterBottom variant="h5" sx={{ ml: 2 }}>
                  2. Similarity Search
                </Typography>
                <List dense sx={{ ml: 3 }}>
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="#step-2.1">
                      <ListItemText primary="Step 2.1. — Select File and Choose the Similarity Search Mode" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a" href="#step-2.2">
                      <ListItemText primary="Step 2.2. — Confirm SMILES Column and Select Fingerprint Type" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a" href="#step-2.3">
                      <ListItemText primary="Step 2.3. — Select target SMILES" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component="a" href="#step-2.4">
                      <ListItemText primary="Step 2.4. — View and download results" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>{" "}
            <Typography
              variant="h3"
              sx={{
                my: 1,
                textAlign: "center",
                textShadow: "4px 4px 6px rgba(0,0,0,1)",
              }}
            >
              1. Visualization
            </Typography>
            <Card id="step-1.1" elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Step 1.1. Select File
                </Typography>
                <Typography variant="body1">
                  Click
                  {
                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        py: 1,
                        px: 1.5,
                        mx: 1,
                        fontSize: 14,
                        boxShadow: 10,
                        textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
                      }}
                    >
                      Select File
                    </Button>
                  }
                  to upload your own <strong>.csv</strong> file with:
                </Typography>
                <List dense>
                  <ListItem>
                    <Typography variant="body1">
                      - A column containing SMILES strings
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      - A column containing labels (e.g. activity values or
                      categories)
                    </Typography>
                  </ListItem>
                </List>
                <Typography variant="body1">
                  <strong>or</strong> use the
                  {
                    <Button
                      variant="contained"
                      component="label"
                      color="secondary"
                      sx={{
                        py: 1,
                        px: 1.5,
                        mx: 1,
                        fontSize: 14,
                        boxShadow: 10,
                        textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
                      }}
                    >
                      Example data
                    </Button>
                  }
                </Typography>
              </CardContent>
            </Card>
            <Card id="step-1.2" elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Step 1.2. Confirm Columns and Choose Analysis Settings
                </Typography>
                <Typography variant="body1">
                  After selecting your file, confirm your{" "}
                  <strong>SMILES</strong> and <strong>Label</strong> columns,{" "}
                  <strong>label type</strong>, and select your analysis
                  parameters:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Fingerprint type"
                      secondary="Morgan / MACCS / RDKit — determines how molecular features are encoded before comparison"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Dimensionality reduction method"
                      secondary="PCA / UMAP — reduces high-dimensional data to 2D for visualization"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Outlier removal"
                      secondary="On / Off — removes structurally distant points that may distort the plot"
                    />
                  </ListItem>
                </List>
              </CardContent>
              <CardMedia
                component="video"
                src="/videos/visualization_settings.webm"
                autoPlay
                loop
                muted
                playsInline
                sx={{
                  width: "95%",
                  objectFit: "cover",
                  mx: 2,
                  mt: 2,
                }}
              />
              <CardContent>
                <Typography variant="body1">
                  {" "}
                  After selecting your analysis parameters, click{" "}
                  {
                    <Button
                      className="submit"
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Upload
                    </Button>
                  }{" "}
                  to generate the plot.
                </Typography>
              </CardContent>
            </Card>
            <Card id="step-1.3" elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Step 1.3. Explore and Visualize
                </Typography>
                <List dense>
                  <ListItem>
                    <Typography variant="body1">
                      - Select a region of the plot with the cursor to zoom in
                      and enter molecular view
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      - Adjust the <strong>Molecule size</strong> -slider to get
                      a clearer view
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      - Select the <strong>panning tool</strong> {<PanIcon />}{" "}
                      in the top right corner to adjust the view
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      - To save the plot, select{" "}
                      <strong>Download plot as png</strong> {<CameraIcon />} in
                      the top right corner
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      - To return to global view, simply double click on the
                      plot
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
              <CardMedia
                component="video"
                src="/videos/interactive_plot.webm"
                autoPlay
                loop
                muted
                playsInline
                sx={{ width: "85%", objectFit: "cover", mt: 2, mb: 4, mx: 2 }}
              />
              <CardContent>
                <Typography variant="body1">
                  Click on the molecules to fetch additional molecular
                  information from the <strong>PubChem API</strong>. Click the{" "}
                  {
                    <img
                      src="/images/PubChem_logo.svg"
                      alt="PubChem"
                      style={{
                        height: "4vh",
                        verticalAlign: "middle",
                      }}
                    />
                  }{" "}
                  icon to open the compound's PubChem page in a new tab.
                </Typography>
              </CardContent>
            </Card>
            <Card id="step-1.4" elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Step 1.4. Highlight Molecules
                </Typography>
                <Typography variant="body1">
                  Use the data grid's search function and select molecules to
                  highlight them in the plot.
                </Typography>
              </CardContent>
              <CardMedia
                component="video"
                src="/videos/search_select.webm"
                autoPlay
                loop
                muted
                playsInline
                sx={{ width: "95%", objectFit: "cover", mt: 2, mb: 4 }}
              />
            </Card>
            <Typography
              variant="h3"
              sx={{
                my: 1,
                textAlign: "center",
                textShadow: "4px 4px 6px rgba(0,0,0,1)",
              }}
            >
              2. Similarity search
            </Typography>
            <Card id="step-2.1" elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Step 2.1. Select File and Choose the Similarity Search Mode
                </Typography>
                <Typography variant="body1">
                  Click
                  {
                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        py: 1,
                        px: 1.5,
                        mx: 1,
                        fontSize: 14,
                        boxShadow: 10,
                        textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
                      }}
                    >
                      Select File
                    </Button>
                  }
                  to upload your own <strong>.csv</strong> file with a column
                  containing SMILES strings <strong>or</strong> use the
                  {
                    <Button
                      variant="contained"
                      component="label"
                      color="secondary"
                      sx={{
                        py: 1,
                        px: 1.5,
                        mx: 1,
                        fontSize: 14,
                        boxShadow: 10,
                        textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
                      }}
                    >
                      Example data
                    </Button>
                  }
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  After selecting your file, choose the{" "}
                  <strong>Similarity Search</strong> mode:{" "}
                  {
                    <ButtonGroup variant="outlined">
                      <Button
                        size="large"
                        variant={"outlined"}
                        sx={{ borderRadius: 40 }}
                      >
                        Visualization
                      </Button>
                      <Button
                        size="large"
                        variant={"contained"}
                        sx={{ borderRadius: 40 }}
                      >
                        Similarity search
                      </Button>
                    </ButtonGroup>
                  }
                </Typography>
              </CardContent>
            </Card>
            <Card id="step-2.2" elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Step 2.2. Confirm SMILES Column and Select Fingerprint Type
                </Typography>
                <Typography variant="body1">
                  Confirm that the selected column contains{" "}
                  <strong>SMILES</strong> strings, and choose the{" "}
                  <strong>fingerprint type</strong> for analysis:
                </Typography>
                <FormControl sx={{ my: 2 }}>
                  <FormLabel id="fingerprint-type-select-label">
                    Fingerprint type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="fingerprint-type-select-label"
                    name="fingerprint-type-select"
                  >
                    <FormControlLabel
                      value="Morgan"
                      control={<Radio />}
                      label="Morgan"
                    />
                    <FormControlLabel
                      value="Topological"
                      control={<Radio />}
                      label="RDKit Topological"
                    />
                    <FormControlLabel
                      value="MACCS"
                      control={<Radio />}
                      label="MACCS"
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
            <Card id="step-2.3" elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Step 2.3. Select target SMILES
                </Typography>
                <Typography variant="body1">
                  Select up to <strong>five</strong> SMILES strings to act as
                  target molecules in the similarity search. SMILES strings can
                  be added manually or by selecting them in the datagrid.
                </Typography>
              </CardContent>
              <CardMedia
                component="video"
                src="/videos/select_target_smiles.webm"
                autoPlay
                loop
                muted
                playsInline
                sx={{ width: "85%", objectFit: "cover", mt: 2, mb: 4, ml: 2 }}
              />
              <CardContent>
                <Typography variant="body1">
                  {" "}
                  After selecting the <strong>SMILES column</strong>,{" "}
                  <strong>fingerprint type</strong> and{" "}
                  <strong>target SMILES</strong>, click{" "}
                  {
                    <Button
                      className="submit"
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Upload
                    </Button>
                  }{" "}
                  to begin the similarity search.
                </Typography>
              </CardContent>
            </Card>
            <Card id="step-2.4" elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Step 2.4. View and download results
                </Typography>
                <Typography variant="body1">
                  When the similarity search is complete, you can view the
                  results and download the generated <strong>.csv</strong> file
                  by clicking the <strong>download as CSV</strong>{" "}
                  {
                    <FileDownloadIcon
                      color="primary"
                      sx={{ verticalAlign: "middle" }}
                    />
                  }{" "}
                  -button.
                </Typography>

                <img src="/images/similarity_search_results.png" width="90%" />

                <Typography variant="body1" sx={{ mt: 1 }}>
                  The results are tanimoto similarity values between molecules
                  in the selected file and the target molecules. If more than
                  one target molecule was selected, the{" "}
                  <strong> max_similarity</strong> column indicates the maximum
                  similarity value for each row.
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Slide>
      </Box>
    </Container>
  );
};

export default UserGuide;
