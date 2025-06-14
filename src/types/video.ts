export interface VideoData {
  id: string;
  title: string;
  videoId: string; // YouTube動画ID
  description?: string;
}

// サンプル動画データ（実際のYouTube動画IDに置き換える）
export const sampleVideos: VideoData[] = [
  {
    id: '1',
    title: 'アニメソングリミックス #1',
    videoId: 'dQw4w9WgXcQ', // サンプルID
    description: '人気アニメソングのリミックス'
  },
  {
    id: '2',
    title: 'アニメソングリミックス #2',
    videoId: 'dQw4w9WgXcQ', // サンプルID
    description: '最新アニメソングのリミックス'
  },
  {
    id: '3',
    title: 'アニメソングリミックス #3',
    videoId: 'dQw4w9WgXcQ', // サンプルID
    description: 'クラシックアニメソングのリミックス'
  },
  {
    id: '4',
    title: 'アニメソングリミックス #4',
    videoId: 'dQw4w9WgXcQ', // サンプルID
    description: 'ダンスミュージックリミックス'
  },
  {
    id: '5',
    title: 'アニメソングリミックス #5',
    videoId: 'dQw4w9WgXcQ', // サンプルID
    description: 'エレクトロニックリミックス'
  }
];