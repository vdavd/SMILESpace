import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";

interface removeOutliersSelectProps {
  removeOutliers: boolean;
  setremoveOutliers: (removeOutliers: boolean) => void;
  outlierPercentage: number | null;
  setOutlierPercentage: (outlierPercentage: number | null) => void;
}

const removeOutliersSelect = ({
  removeOutliers,
  setremoveOutliers,
  outlierPercentage,
  setOutlierPercentage,
}: removeOutliersSelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setremoveOutliers(event.target.checked);
  };

  return (
    <FormControl sx={{ my: 3 }}>
      <Stack direction="row" gap={2}>
        <FormControlLabel
          control={<Switch onChange={handleChange} checked={removeOutliers} />}
          label="Remove outliers"
        />
        <FormControl sx={{ my: 1 }}>
          <FormLabel
            id="n-neighbors-umap"
            sx={{ visibility: removeOutliers ? "visible" : "hidden" }}
          >
            Outlier percentage
          </FormLabel>

          <TextField
            type="number"
            value={outlierPercentage}
            onChange={(e) => {
              const num = e.target.value === "" ? null : Number(e.target.value);
              setOutlierPercentage(num);
            }}
            onBlur={() => {
              setOutlierPercentage(
                Math.min(15, Math.max(1, Number(outlierPercentage)))
              );
            }}
            sx={{
              width: 80,
              visibility: removeOutliers ? "visible" : "hidden",
            }}
          />
        </FormControl>
      </Stack>
    </FormControl>
  );
};

export default removeOutliersSelect;
