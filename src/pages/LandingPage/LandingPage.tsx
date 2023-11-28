import {
  Box,
  Button,
  Container,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import videoSrc from "../../assets/landing_page_video.mp4";

type StylesProperties = {
  sx: Record<string, SxProps>;
  inline: Record<string, React.CSSProperties>;
};

type Styles<T> = { mobile: T; desktop: T };

const stylesSwitch: Styles<StylesProperties> = {
  mobile: {
    sx: {
      stack: {
        margin: "3rem 0 8rem 0",
        flexDirection: "column",
        padding: "2rem",
      },
      box: {
        flex: 1,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        backgroundColor: "#111",
        alignItems: "center",
        justifyContent: "center",
      },
      button: {
        backgroundColor: "#111",
      },
    },
    inline: {
      highlightBlue: { backgroundColor: "blue" },
      phoneFrame: {
        border: "1px solid gray",
        marginTop: "4rem",
        height: "500px",
        aspectRatio: "9 / 16",
        backgroundColor: "#202020",
        borderRadius: "10%",
      },
      actionButtons: {
        position: "fixed",
        top: "95%",
        left: "50%",
        transform: "translate(-50%, -95%)",
      },
    },
  },
  desktop: {
    sx: {
      stack: {
        marginTop: "-5rem",
        flexDirection: "row",
      },
      box: {
        flex: 1,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        backgroundColor: "#111",
        alignItems: "center",
        justifyContent: "center",
      },
      button: {
        backgroundColor: "#111",
      },
    },
    inline: {
      highlightBlue: { backgroundColor: "blue" },
      phoneFrame: {
        border: "1px solid gray",
        height: "500px",
        aspectRatio: "9 / 16",
        backgroundColor: "#202020",
        borderRadius: "10%",
      },
      actionButtons: {
        position: "fixed",
        top: "85%",
        left: "50%",
        transform: "translate(-50%, -85%)",
      },
    },
  },
};

const LandingPage = () => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:715px)");
  const stylesKey = isMobile ? "mobile" : "desktop";

  const styles = stylesSwitch[stylesKey];
  const titleVariant = isMobile ? "h4" : "h2";
  const descriptionVariant = isMobile ? "body2" : "body1";

  const handleAccessClick = () => navigate("/app");

  const handleAboutMoreClick = () => {
    const email = "recipient@example.com";
    const subject = "Hello from My Website";
    const body =
      "Dear recipient,\n\nI hope this email finds you well.\n\nBest regards,\n[Your Name]";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink, "_blank");
  };

  return (
    <Container>
      <Stack sx={styles.sx.stack}>
        <Box sx={styles.sx.box}>
          <Typography
            variant={titleVariant}
            gutterBottom
            letterSpacing="0.5rem"
          >
            Descubra trechos destacados de{" "}
            <span style={styles.inline.highlightBlue}> podcasts</span> conforme
            seus <span style={styles.inline.highlightBlue}> interesses</span>.
          </Typography>
          <Typography
            variant={descriptionVariant}
            marginTop="3rem"
            gutterBottom
            fontWeight={100}
            letterSpacing="0.3rem"
          >
            O <span style={styles.inline.highlightBlue}> SearchTube</span> é uma
            plataforma para buscar textos específicos em transcrições de
            podcasts do YouTube. Ela apresenta uma lista de vídeos que mencionam
            o texto, com links diretos para os momentos exatos das referências.
          </Typography>
        </Box>
        <Box sx={styles.sx.box}>
          <video
            autoPlay
            muted
            src={videoSrc}
            style={styles.inline.phoneFrame}
            loop
            controls={true}
          />
          <small>*** Ligue o som do vídeo ***</small>
        </Box>
      </Stack>
      <div style={styles.inline.actionButtons}>
        <Stack direction="row" gap="1rem">
          <Button variant="contained" size="large" onClick={handleAccessClick}>
            Acessar
          </Button>
          <Button
            sx={styles.sx.button}
            variant="outlined"
            size="large"
            color="secondary"
            onClick={handleAboutMoreClick}
          >
            Saiba mais
          </Button>
        </Stack>
      </div>
    </Container>
  );
};

export default LandingPage;
