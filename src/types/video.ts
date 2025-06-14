export interface VideoData {
  id: string;
  title: string;
  videoId: string; // YouTube動画ID
  description?: string;
}

// 実際のYouTube動画データ
export const sampleVideos: VideoData[] = [
  {
    id: '1',
    title: 'アニメソングリミックス #1',
    videoId: '_a5BD_-EiRk',
    description: 'アニメソングリミックス作品'
  },
  {
    id: '2',
    title: 'アニメソングリミックス #2',
    videoId: 'CXPyI1PGDyM',
    description: 'アニメソングリミックス作品'
  },
  {
    id: '3',
    title: 'アニメソングリミックス #3',
    videoId: 'jWmZR8bIgcY',
    description: 'アニメソングリミックス作品'
  },
  {
    id: '4',
    title: 'アニメソングリミックス #4',
    videoId: 'AQlnM9W44Qs',
    description: 'アニメソングリミックス作品'
  },
  {
    id: '5',
    title: 'アニメソングリミックス #5',
    videoId: 'Ogqxqqtc9Iw',
    description: 'アニメソングリミックス作品'
  },
  {
    id: '6',
    title: 'アニメソングリミックス #6',
    videoId: 'OueJmbrrJ24',
    description: 'アニメソングリミックス作品'
  },
  {
    id: '7',
    title: 'アニメソングリミックス #7',
    videoId: 'jceQcqYzo48',
    description: 'アニメソングリミックス作品'
  },
  {
    id: '8',
    title: 'アニメソングリミックス #8',
    videoId: 'rHh9iWKpQ0I',
    description: 'アニメソングリミックス作品'
  }
];