import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import api from "../services/api/api";

const typeofData = {
  page: 1,
  count: 1,
  results: [
    {
      _id: "3751cccf395f2979235dab4f1b71d156",
      duration: 3.63,
      start: 7076.46,
      text: "de pensamento que tem absolutamente nada",
      video: {
        _id: "prTpQU0ekb0",
        allowRatings: true,
        author: "Flow Podcast 1.0 - Episódios Completos",
        channelId: "UC4ncvgh5hFr5O83MH7-jRJg",
        isCrawlable: true,
        isLiveContent: true,
        isOwnerViewing: false,
        isPrivate: false,
        isUnpluggedCorpus: false,
        latencyClass: "MDE_STREAM_OPTIMIZATIONS_RENDERER_LATENCY_NORMAL",
        lengthSeconds: "8527",
        thumbnail: {
          thumbnails: [
            {
              height: 180,
              url: "https://i.ytimg.com/vi/prTpQU0ekb0/mqdefault.jpg?v=618db9dc",
              width: 320,
            },
            {
              height: 224,
              url: "https://i.ytimg.com/vi/prTpQU0ekb0/hqdefault.jpg?sqp=-oaymwEXCJADEOABSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAzxA50WNllNQ6xv1eVAwqhaQ_Z4Q",
              width: 400,
            },
            {
              height: 450,
              url: "https://i.ytimg.com/vi/prTpQU0ekb0/hq720.jpg?sqp=-oaymwEXCKAGEMIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCbHiHQmPEe3lOdMk_1J0K8OPwVqw",
              width: 800,
            },
            {
              height: 720,
              url: "https://i.ytimg.com/vi/prTpQU0ekb0/hq720.jpg?v=618db9dc",
              width: 1280,
            },
          ],
        },
        title: "FELIPE MOURA BRASIL - Flow Podcast #502",
        videoId: "prTpQU0ekb0",
        viewCount: "275130",
        watchUrl: "https://youtube.com/watch?v=prTpQU0ekb0",
      },
      videoId: "prTpQU0ekb0",
    },
  ],
};

function fetch({
  text,
  pageParam,
  signal,
  ...options
}: {
  text: string;
  pageParam: number;
  signal: AbortSignal;
} & SearchOptions) {
  return api.get<typeof typeofData>("/search", {
    params: { text, page: pageParam, ...options },
    signal,
  });
}

interface SearchOptions {
  caseSensitive: boolean;
  exactText: boolean;
}

export function useSearch(
  text: string,
  options: SearchOptions = { caseSensitive: false, exactText: false }
) {
  return useInfiniteQuery({
    queryKey: [`search`, text, options],
    queryFn: ({ pageParam, signal }) =>
      fetch({ text, pageParam, signal, ...options }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPageCondition =
        lastPage.data.results.length < 10 && lastPage.data.page > 1;
      const nextPage = nextPageCondition ? undefined : lastPage.data.page + 1;
      return nextPage;
    },
    enabled: text?.length >= 1,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    refetchOnMount: false,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
}
