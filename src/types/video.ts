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
    title: 'ブラックボックス beatolobo remix / 重音テト(SynthesizerV AI) 【NieR:Automata Ver1.1a OP】',
    videoId: '_a5BD_-EiRk',
    description: ''
  },
  {
    id: '2',
    title: 'Creepy Nuts - オトノケ beatolabo bootleg 【ダンダダン OP】',
    videoId: 'CXPyI1PGDyM',
    description: ''
  },
  {
    id: '3',
    title: '名もなき何もかも beatolabo remix / Vo.夢ノ結唱 ROSE (SynthesizerV AI) 【ガールズバンドクライ挿入歌】',
    videoId: 'jWmZR8bIgcY',
    description: ''
  },
  {
    id: '4',
    title: '空の箱 beatolabo remix / Vo.夏色花梨 (SynthesizerV AI) 【ガールズバンドクライ挿入歌】',
    videoId: 'AQlnM9W44Qs',
    description: ''
  },
  {
    id: '5',
    title: 'トゲナシトゲアリ - 誰にもなれない私だから Acoustic Remix 【ガールズバンドクライ ED】',
    videoId: 'Ogqxqqtc9Iw',
    description: ''
  },
  {
    id: '6',
    title: 'サカナクション - 怪獣 beatolabo remix / 夢ノ結唱 ROSE (SynthesizerV AI)【チ。 OP】',
    videoId: 'OueJmbrrJ24',
    description: ''
  },
  {
    id: '7',
    title: 'ヨルシカ - 火星人 garage bootleg 【小市民シリーズ 2期 OP】',
    videoId: 'jceQcqYzo48',
    description: ''
  },
  {
    id: '8',
    title: '予光 (yu guang) / 日本語Cover by 重音テト 【龍族0話挿入歌】',
    videoId: 'rHh9iWKpQ0I',
    description: ''
  },
  {
    id: '9',
    title: 'Aimer - Sign beatolobo remix / Vo.花隈千冬(SynthesizerV AI)【狼と香辛料 OP】',
    videoId: 'DsoP0gaVBKs',
    description: ''
  }
];