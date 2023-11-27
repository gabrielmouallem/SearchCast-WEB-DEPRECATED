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

  const handleAccessClick = () => navigate("/app");

  const handleAboutMoreClick = () => {
    const phoneNumber = "+5535998607515";
    const message = encodeURIComponent(
      "Olá, gostaria de saber mais sobre a ferramenta de cortes para criadores de conteúdo."
    );

    // Create the WhatsApp URL with the phone number and message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open the WhatsApp URL in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Container>
      <Stack sx={styles.sx.stack}>
        <Box sx={styles.sx.box}>
          <Typography variant="h2" gutterBottom letterSpacing="0.5rem">
            Pesquise cortes dos maiores{" "}
            <span style={styles.inline.highlightBlue}>podcasts</span> de acordo
            com seu <span style={styles.inline.highlightBlue}> interesse</span>.
          </Typography>
          <Typography
            variant="body1"
            marginTop="3rem"
            gutterBottom
            fontWeight={100}
            letterSpacing="0.3rem"
          >
            Com a nossa ferramenta você pesquisa um nome, palavra ou texto e nós
            retornamos o trecho exato em que algum podcast comenta sobre o
            assunto.
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
