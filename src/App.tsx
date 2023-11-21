import { useState, useMemo } from "react";
import {
  Box,
  Button,
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

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedTime = `${minutes}m${remainingSeconds}s`;

  return formattedTime;
}

function highlightText(searchText: string, text: string): React.ReactNode {
  if (!searchText) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${searchText})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
          <span key={i} style={{ backgroundColor: "yellow" }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function App() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 1000);
  const {
    isLoading,
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

  return (
    <Box sx={{ p: 5 }}>
      <Container>
        <Stack width="100%" direction="row" gap={1}>
          <TextField
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            id="search-field"
            label="Search"
            variant="outlined"
          />
          <IconButton onClick={() => refetch()}>
            <SearchIcon htmlColor="black" />
          </IconButton>
        </Stack>
        <Box sx={{ width: "100%", mt: 5 }}>
          {isLoading && <LinearProgress />}
          {!isLoading &&
            data.map((group, i) => (
              <React.Fragment key={i}>
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
                    <div style={{ marginTop: "15px" }}>
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
            <CircularProgress size={32} sx={{ margin: 2 }} />
          )}
          {!(isLoading || (!isFetchingNextPage && data.length === 0)) && (
            <div style={{ margin: "2rem 0" }}>
              <Button onClick={() => fetchNextPage()}>Load more</Button>
            </div>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default App;
