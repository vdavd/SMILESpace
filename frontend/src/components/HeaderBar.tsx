import { Box, Typography } from "@mui/material";
//@ts-ignore
import "@fontsource/figtree";

const HeaderBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="images/SMILESpace_logo_only.png" height={150} />
      <Typography
        sx={{
          textShadow: "3px 3px 8px rgba(0,0,0,1)",
          color: "#F0FBFF",
          fontSize: 70,
          letterSpacing: "0.03em",
          ml: 1,
          mr: 10,
          fontFamily: "figtree",
        }}
        variant="h2"
        textAlign="center"
      >
        SMILESpace
      </Typography>
      <Box sx={{ mr: 10 }}>
        <img src="images/HY__LD01_LogoFP_EN_B3____BW.png" height={110} />
      </Box>
      <img src="images/fimm_logo.png" height={90} />
    </Box>
  );
};

export default HeaderBar;
