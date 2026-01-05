import { Button, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { apiBaseUrl } from "../constants";

interface DownloadFingerprintsProps {
  fingerprintDownloadUrl: string;
  buttonText: string;
}

const DownloadFingerprints = ({
  fingerprintDownloadUrl,
  buttonText,
}: DownloadFingerprintsProps) => {
  return (
    <Button
      variant="text"
      href={apiBaseUrl + fingerprintDownloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      download
      sx={{ width: "30%" }}
    >
      {buttonText}
      <Tooltip
        title="Fingerprints are available for download for 30 minutes after analysis"
        placement="right"
      >
        <InfoIcon fontSize="small" sx={{ ml: 1 }} />
      </Tooltip>
    </Button>
  );
};

export default DownloadFingerprints;
