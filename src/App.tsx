import { useState, useMemo } from "react";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
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
  textFieldSx,
} from "./App.styles";
import { LoadMoreButton } from "./components/LoadMoreButton";
import { formatTime, highlightText } from "./utils";
import "./index.css";

function App() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 1000);
  const {
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    data: axiosData,
    fetchNextPage,
    refetch,
  } = useSearch(debouncedText);

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

  return (
    <Box sx={boxSx}>
      <Container>
        <Stack
          width="100%"
          direction="row"
          gap={1}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <TextField
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            id="search-field"
            label="Search"
            variant="outlined"
            sx={textFieldSx} // White text color for the input
          />
          <IconButton onClick={() => refetch()} disabled={searchButtonDisabled}>
            <SearchIcon htmlColor="white" />
          </IconButton>
        </Stack>
        <Box sx={innerBoxSx}>
          {showLinearProgress && <LinearProgress sx={linearProgressSx} />}
          {!isLoading &&
            data.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.count} Results
                {group.data.results.map((el) => {
                  const transcription = el.transcription;
                  const videoData = transcription.videoData;

                  const title = videoData.title;
                  const transcriptText = transcription.text;
                  const viewCount = videoData.viewCount;

                  const timeSuffix = formatTime(transcription.start);
                  const videoLink = `${transcription.videoData.watchUrl}&t=${timeSuffix}`;

                  const thumbnail = videoData.thumbnail.thumbnails?.[0];
                  const url = thumbnail.url;
                  const width = thumbnail.width;
                  const height = thumbnail.height;

                  return (
                    <div style={{ marginTop: "2.5rem" }}>
                      <img src={url} width={width} height={height} />
                      <div>
                        <b>{highlightText(debouncedText, title)}</b>
                      </div>
                      <div>{viewCount} Views</div>
                      <div>
                        {highlightText(debouncedText, `"${transcriptText}"`)}
                      </div>
                      <div>
                        <a href={videoLink}>Access video</a>
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
