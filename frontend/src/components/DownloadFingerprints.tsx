import { Alert, Button, Snackbar, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { downloadFingerprints } from "../services/data";

interface DownloadFingerprintsProps {
  fingerprintDownloadUrl: string;
  buttonText: string;
}

const DownloadFingerprints = ({
  fingerprintDownloadUrl,
  buttonText,
}: DownloadFingerprintsProps) => {
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const response = await downloadFingerprints(fingerprintDownloadUrl);

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "fingerprints.csv.gz";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(link.href);
    } catch (err: any) {
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        variant="text"
        onClick={handleDownload}
        disabled={loading}
        sx={{ width: "30%" }}
      >
        {loading ? "Downloading fingerprints..." : buttonText}
        <Tooltip
          title="Fingerprints are available for download for 30 minutes after analysis"
          placement="right"
        >
          <InfoIcon fontSize="small" sx={{ ml: 1 }} />
        </Tooltip>
      </Button>
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Fingerprints expired. Please re-run the analysis.
        </Alert>
      </Snackbar>
    </>
  );
};

export default DownloadFingerprints;
