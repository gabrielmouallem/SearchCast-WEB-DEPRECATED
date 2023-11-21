import { useQuery } from "@tanstack/react-query";
import api from "../services/api/api";

const typeofData = {
  transcription: {
    _id: "f8257207a1dc243f66d4218e87cfd8a7",
    duration: 4.95,
    start: 12206.87,
    text: "ufologia causa o estica é o cara que é",
    videoData: {
      _id: "zxnYTeh0sHQ",
      allowRatings: true,
      author: "Flow Podcast 1.0 - Episódios Completos",
      channelId: "UC4ncvgh5hFr5O83MH7-jRJg",
      isCrawlable: true,
      isLiveContent: true,
      isLowLatencyLiveStream: false,
      isOwnerViewing: false,
      isPrivate: false,
      isUnpluggedCorpus: false,
      latencyClass: "MDE_STREAM_OPTIMIZATIONS_RENDERER_LATENCY_NORMAL",
      lengthSeconds: "13042",
      musicVideoType: "MUSIC_VIDEO_TYPE_PODCAST_EPISODE",
      thumbnail: {
        thumbnails: [
          {
            height: 180,
            url: "https://i.ytimg.com/vi/zxnYTeh0sHQ/mqdefault.jpg?v=5f7e93af",
            width: 320,
          },
          {
            height: 224,
            url: "https://i.ytimg.com/vi/zxnYTeh0sHQ/hqdefault.jpg?sqp=-oaymwEXCJADEOABSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAhsHvV6i7Bwi-a8StGpFtfRETX4Q",
            width: 400,
          },
          {
            height: 450,
            url: "https://i.ytimg.com/vi/zxnYTeh0sHQ/hq720.jpg?sqp=-oaymwEXCKAGEMIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBxly-Vz13b6zAnLx7Cux-yolXXsg",
            width: 800,
          },
          {
            height: 720,
            url: "https://i.ytimg.com/vi/zxnYTeh0sHQ/hq720.jpg?v=5f7e93af",
            width: 1280,
          },
        ],
      },
      title: "BRUNO BOCK - Flow Podcast #219",
      videoId: "zxnYTeh0sHQ",
      viewCount: "1501800",
      watchUrl: "https://youtube.com/watch?v=zxnYTeh0sHQ",
    },
    videoId: "zxnYTeh0sHQ",
  },
};

function fetch(text: string) {
  return api.get<(typeof typeofData)[]>("/search", { params: { text } });
}

export function useSearch(text: string) {
  return useQuery({
    queryKey: [`search-${text}`],
    queryFn: () => fetch(text),
    enabled: !!text,
  });
}
