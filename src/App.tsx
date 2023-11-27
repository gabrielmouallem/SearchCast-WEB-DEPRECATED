import { useState, useMemo } from "react";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "./hooks/useSearch";
import { useDebounce } from "@uidotdev/usehooks";
import React from "react";
import {
  boxSx,
  circularProgressSx,
  innerBoxSx,
  linearProgressSx,
  secretKeyBoxSx,
  textFieldSx,
} from "./App.styles";
import { LoadMoreButton } from "./components/LoadMoreButton";
import { formatTime, highlightText } from "./utils";
import { secondsToHMS } from "./utils/secondsToHMS";
import useLocalStorageState from "./hooks/useLocalStorageState";

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

function App() {
  const [text, setText] = useState("");
  const [caseSensitive, _setCaseSensitive] = useState(false);
  const [exactText, _setExactText] = useState(false);
  const [secretKey, setSecretKey] = useLocalStorageState("Api-Key", "");
  const debouncedText = useDebounce(text, 1000);
  const {
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    data: axiosData,
    fetchNextPage,
    refetch,
  } = useSearch(debouncedText, { caseSensitive, exactText });

  const data = useMemo(() => {
    if (axiosData) {
      return axiosData?.pages ?? [];
    }
    return [];
  }, [axiosData]);

  const showLoadMoreButton = !(
    isLoading ||
    (!isFetchingNextPage && data.length === 0)
  );

  const showLinearProgress = (isLoading || isFetching) && !isError;

  const searchButtonDisabled = !text?.length;

  if (!secretKey || secretKey !== SECRET_KEY)
    return (
      <Box sx={secretKeyBoxSx}>
        <Typography variant="h4" gutterBottom letterSpacing="0.5rem">
          Seja <span style={{ backgroundColor: "blue" }}>bem-vindo!</span>
        </Typography>
        <TextField
          value={secretKey}
          onChange={(e) => {
            setSecretKey(e.target.value);
          }}
          id="api-key-field"
          label="Digite sua chave de acesso"
          variant="outlined"
          sx={textFieldSx} // White text color for the input
        />
      </Box>
    );

  return (
    <Box sx={boxSx}>
      <Container>
        <TextField
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          id="search-field"
          placeholder="Pesquise uma palavra, frase ou nome"
          variant="outlined"
          sx={textFieldSx} // White text color for the input
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={() => refetch()}
                  disabled={searchButtonDisabled}
                >
                  <SearchIcon htmlColor="white" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={innerBoxSx}>
          {showLinearProgress && <LinearProgress sx={linearProgressSx} />}
          {!isLoading && <> {data?.[0]?.data?.count ?? "N.A."} Resultados</>}
          {!isLoading &&
            data.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.results.map((el) => {
                  const transcription = el;
                  const videoData = transcription.video;

                  const publishDate = new Date(
                    videoData.publishDate
                  ).toLocaleDateString();

                  const title = videoData.title;
                  const transcriptText = transcription.text;
                  const viewCount = videoData.viewCount;

                  const timeSuffix = formatTime(transcription.start);
                  const timeHHMMSS = secondsToHMS(transcription.start);
                  const videoLink = `${videoData.watchUrl}&t=${timeSuffix}`;

                  const thumbnail = videoData.thumbnail.thumbnails?.[0];
                  const url = thumbnail.url;
                  const width = thumbnail.width;
                  const height = thumbnail.height;

                  return (
                    <div
                      style={{
                        marginTop: "2.5rem",
                        fontFamily: "Roboto, sans-serif",
                      }}
                    >
                      <img src={url} width={width} height={height} />
                      <div>
                        <b></b>
                      </div>
                      <div>
                        <b>{highlightText(debouncedText, title)}</b>
                      </div>
                      <div>
                        {publishDate} - {viewCount} Views
                      </div>
                      <div>
                        {highlightText(debouncedText, `"${transcriptText}"`)}
                      </div>
                      <div>
                        <a href={videoLink} target="_blank">
                          Access video at {timeHHMMSS}
                        </a>
                      </div>
                      <div></div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          {!!isFetchingNextPage && (
            <CircularProgress size={32} sx={circularProgressSx} />
          )}
          <LoadMoreButton show={showLoadMoreButton} onClick={fetchNextPage} />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
