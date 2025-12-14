import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Fade,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import PersonIcon from "@mui/icons-material/Person";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import HeaderBar from "./HeaderBar";

const ContactPage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
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
        <Fade in={loaded} timeout={800}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              px: 4,
              py: 1,
              my: 3,
            }}
          >
            <Card elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Contact Information
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Stack spacing={3}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PersonIcon fontSize="large" color="action" />
                    <Typography fontSize="large">
                      Author: <strong>Ville Davidsson</strong>
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <EmailIcon fontSize="large" color="action" />
                    <Typography fontSize="large">
                      ville.davidsson@helsinki.fi
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <GitHubIcon fontSize="large" color="action" />
                    <Link
                      fontSize="large"
                      sx={{ fontFamily: "Inter", textShadow: "none" }}
                      href="https://github.com/vdavd/SMILESpace"
                      target="_blank"
                      rel="noopener"
                      underline="hover"
                      color="inherit"
                    >
                      github.com/vdavd/SMILESpace
                    </Link>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Box>
    </Container>
  );
};

export default ContactPage;
