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
import flowSrc from "../../assets/flow_podcast.jpg";
import ltdaSrc from "../../assets/inteligencia_ltda_podcast.jpg";
import podpahSrc from "../../assets/podpah_podcast.jpg";
import podPeopleSrc from "../../assets/podpeople_podcast.jpg";
import renCarianiSrc from "../../assets/renato_cariani__podcast.jpg";
import primoSrc from "../../assets/primo_cast_podcast.jpg";
import joelJotaSrc from "../../assets/joel_jota_podcast.jpg";
import flowGamesSrc from "../../assets/flow_games_podcast.jpg";
import osSociosSrc from "../../assets/os_socios_podcast.jpg";
import videoSrc from "../../assets/landing_page_video.mp4";

type StylesProperties = {
  sx: Record<string, SxProps>;
  inline: Record<string, React.CSSProperties>;
};

type Styles<T> = { mobile: T; desktop: T };

const stylesSwitch: Styles<StylesProperties> = {
  mobile: {
    sx: {
      container: {
        position: "relative",
        paddingTop: "2rem",
      },
      stack: {
        margin: "5rem 0 8rem 0",
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
      navbar: {
        width: "100%",
        height: "70px",
        position: "fixed",
        padding: "1rem 3rem",
        inset: 0,
        display: "flex",
        gap: "1rem",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        backgroundColor: "#181818",
        borderBottom: "1px solid #272727",
      },
      highlightBlue: { backgroundColor: "blue" },
      phoneFrame: {
        border: "1px solid gray",
        marginTop: "4rem",
        height: "500px",
        width: "285px",
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
      avatar: {
        width: "50px",
        borderRadius: "100%",
        cursor: "pointer",
      },
      podcasts: {
        width: "100%",
        backgroundColor: "#181818",
        borderTop: "1px solid #272727",
        padding: "3rem 3rem 5rem 3rem",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        textAlign: "center",
      },
      bottomWrapper: {
        width: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      textWidth: { maxWidth: "700px" },
    },
  },
  desktop: {
    sx: {
      container: {
        position: "relative",
      },
      stack: {
        maxHeight: "800px",
        marginTop: "-5rem",
        flexDirection: "row",
        gap: "4rem",
      },
      box: {
        flex: 1,
        width: "100%",
        height: "100vh",
        display: "flex",
        textAlign: "right",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "center",
      },
      button: {
        backgroundColor: "#111",
      },
    },
    inline: {
      navbar: {
        width: "100%",
        height: "70px",
        position: "fixed",
        padding: "1rem 3rem",
        inset: 0,
        display: "flex",
        gap: "1rem",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        backgroundColor: "#181818",
        borderBottom: "1px solid #272727",
      },
      highlightBlue: { backgroundColor: "blue" },
      phoneFrame: {
        border: "1px solid gray",
        height: "500px",
        width: "285px",
        backgroundColor: "#202020",
        borderRadius: "10%",
      },
      actionButtons: {},
      small: {
        width: "285px",
        textAlign: "center",
      },
      avatar: {
        width: "64px",
        borderRadius: "100%",
        cursor: "pointer",
      },
      podcasts: {
        width: "100%",
        backgroundColor: "#181818",
        borderTop: "1px solid #272727",
        padding: "3rem 3rem 5rem 3rem",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        textAlign: "center",
      },
      bottomWrapper: {
        width: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      textWidth: { maxWidth: "700px" },
    },
  },
};

const LandingPage = () => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:905px)");
  const stylesKey = isMobile ? "mobile" : "desktop";

  const styles = stylesSwitch[stylesKey];
  const titleVariant = isMobile ? "h5" : "h3";
  const descriptionVariant = isMobile ? "body2" : "body1";

  const handleAccessClick = () => navigate("/app");

  const handleAboutMoreClick = () => {
    const phoneNumber = "+5535998607515";
    const message = encodeURIComponent(
      "Olá, gostaria de saber mais sobre a ferramenta busca para criadores de conteúdo SearchTube."
    );

    // Create the WhatsApp URL with the phone number and message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open the WhatsApp URL in a new tab
    window.open(whatsappUrl, "_blank");
  };

  function openLinkInNewTab(url: string): void {
    // Open the link in a new tab/window
    window.open(url, "_blank");
  }

  return (
    <div>
      <Container sx={styles.sx.container}>
        <div style={styles.inline.navbar}>
          <Button
            sx={styles.sx.button}
            variant="outlined"
            size="large"
            color="secondary"
            onClick={handleAboutMoreClick}
          >
            Saiba mais
          </Button>
          <Button variant="contained" size="large" onClick={handleAccessClick}>
            Acessar
          </Button>
        </div>
        <Stack sx={styles.sx.stack}>
          <Box sx={styles.sx.box}>
            <Typography
              variant={titleVariant}
              gutterBottom
              letterSpacing="0.5rem"
            >
              Descubra trechos destacados de{" "}
              <span style={styles.inline.highlightBlue}> podcasts</span>{" "}
              conforme seus{" "}
              <span style={styles.inline.highlightBlue}> interesses</span>.
            </Typography>
            <Typography
              variant={descriptionVariant}
              marginTop="3rem"
              gutterBottom
              fontWeight={100}
              letterSpacing="0.3rem"
            >
              O <span style={styles.inline.highlightBlue}> SearchTube</span> é
              uma plataforma para buscar textos específicos em transcrições de
              podcasts do YouTube. Ela apresenta uma lista de vídeos que
              mencionam o texto, com links diretos para os momentos exatos das
              referências.
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
            <small style={styles.inline.small}>
              *** Ligue o som do vídeo ***
            </small>
          </Box>
        </Stack>
      </Container>
      <div style={styles.inline.podcasts}>
        <div style={styles.inline.bottomWrapper}>
          <div style={styles.inline.textWidth}>
            <Typography
              gutterBottom
              variant="h5"
              marginBottom="2rem"
              letterSpacing="0.2rem"
            >
              Os{" "}
              <span style={styles.inline.highlightBlue}>
                {" "}
                principais podcasts
              </span>{" "}
              do Youtube
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              fontWeight="light"
              marginBottom="2rem"
              letterSpacing="0.2rem"
              sx={{ opacity: 0.85 }}
            >
              Mais de{" "}
              <span style={styles.inline.highlightBlue}> 3000 vídeos</span> dos
              principais podcasts para você pesquisar o conteúdo que quiser
              quando quiser.
            </Typography>
          </div>
        </div>
        <img
          style={styles.inline.avatar}
          src={flowSrc}
          title="Flow Podcast"
          alt="Flow Podcast"
          onClick={() =>
            openLinkInNewTab("https://www.youtube.com/@FlowPodcast")
          }
        />
        <img
          style={styles.inline.avatar}
          src={ltdaSrc}
          title="Inteligência LTDA Podcast"
          alt="Inteligência LTDA Podcast"
          onClick={() =>
            openLinkInNewTab("https://www.youtube.com/@inteligencialtda")
          }
        />
        <img
          style={styles.inline.avatar}
          src={podpahSrc}
          title="Podpah Podcast"
          alt="Podpah Podcast"
          onClick={() => openLinkInNewTab("https://www.youtube.com/@Podpah")}
        />
        <img
          style={styles.inline.avatar}
          src={podPeopleSrc}
          title="Podpeople Podcast"
          alt="Podpeople Podcast"
          onClick={() =>
            openLinkInNewTab("https://www.youtube.com/@podpeopleanabeatriz")
          }
        />
        <img
          style={styles.inline.avatar}
          src={renCarianiSrc}
          title="Renato Cariani Podcast"
          alt="Renato Cariani Podcast"
          onClick={() =>
            openLinkInNewTab("https://www.youtube.com/@renatocariani")
          }
        />
        <img
          style={styles.inline.avatar}
          src={primoSrc}
          title="Primo Cast Podcast"
          alt="Primo Cast Podcast"
          onClick={() => openLinkInNewTab("https://www.youtube.com/@PrimoCast")}
        />
        <img
          style={styles.inline.avatar}
          src={joelJotaSrc}
          title="Joel Jota Podcast"
          alt="Joel Jota Podcast"
          onClick={() => openLinkInNewTab("https://www.youtube.com/@JoelJota")}
        />
        <img
          style={styles.inline.avatar}
          src={flowGamesSrc}
          title="Flow Games Podcast"
          alt="Flow Games Podcast"
          onClick={() =>
            openLinkInNewTab("https://www.youtube.com/@FlowGamesPodcast")
          }
        />
        <img
          style={styles.inline.avatar}
          src={osSociosSrc}
          title="Os Sócios Podcast"
          alt="Os Sócios Podcast"
          onClick={() => openLinkInNewTab("https://www.youtube.com/@ossocios")}
        />
      </div>
    </div>
  );
};

export default LandingPage;
