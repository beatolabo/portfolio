# beatolabo Music Portfolio

https://beatolabo.pages.dev

アニメ・ゲーム楽曲のリミックス・カバー作品を展示する音楽ポートフォリオサイト。Apple風のアニメーションとモダンなデザインが特徴。

## 🎵 概要

beatolabo（ビートラボ）の音楽作品を紹介するシングルページアプリケーション。YouTube動画カルーセル、プロフィール情報、問い合わせフォームを含む。

### 特徴

- **Apple風アニメーション**：Framer Motionによる高品質なアニメーション
- **レスポンシブデザイン**：デスクトップ・タブレット・モバイル対応
- **静的サイト生成**：Cloudflare Pages等での高速配信
- **ダークモード対応**：システム設定に従った自動切り替え

## 🚀 技術スタック

### コア技術
- **[Next.js 15](https://nextjs.org/)** - App Router + 静的サイト生成
- **[React 19](https://react.dev/)** - UI フレームワーク
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全性
- **[Tailwind CSS v4](https://tailwindcss.com/)** - ユーティリティファーストCSS

### アニメーション・UX
- **[Framer Motion](https://www.framer.com/motion/)** - 高度なアニメーション
- **Intersection Observer API** - スクロール連動
- **[EmailJS](https://www.emailjs.com/)** - 問い合わせフォーム

### 開発ツール
- **ESLint** - コード品質管理
- **PostCSS** - CSS処理

## 📁 プロジェクト構成

```
src/
├── app/
│   ├── page.tsx         # メインページ（全セクション統合）
│   ├── layout.tsx       # ルートレイアウト
│   └── globals.css      # グローバルスタイル
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx     # ヒーロー・動画カルーセル
│   │   ├── ProfileSection.tsx  # プロフィール・スキル
│   │   ├── ContactSection.tsx  # 問い合わせフォーム
│   │   └── Footer.tsx          # フッター
│   └── ui/
│       ├── VideoCarousel.tsx   # YouTube動画カルーセル
│       ├── YouTubeVideo.tsx    # 動画埋め込み
│       └── SectionTitle.tsx    # セクションタイトル
└── types/
    └── video.ts         # 動画データ型定義
```

## 🛠️ 開発環境セットアップ

### 必要条件
- Node.js 18.0以上
- npm, yarn, pnpm, bun のいずれか

### インストール

```bash
# リポジトリをクローン
git clone [リポジトリURL]
cd portfolio

# 依存関係をインストール
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く。

## 📜 利用可能なスクリプト

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド（静的サイト生成）
npm run build

# プロダクションサーバー起動（通常は使用しない）
npm run start

# ESLint実行
npm run lint
```

## 🌟 主要機能

### アニメーション
- **スクロール進捗バー**：ページ上部のリアルタイム進捗表示
- **パララックス効果**：セクション間の滑らかな視差スクロール
- **マウス追従**：カーソル位置に応じた要素の微動
- **スプリングアニメーション**：物理ベースの自然なアニメーション

### ナビゲーション
- **フローティングナビ**：デスクトップ用の透明度調整ナビゲーション
- **ハンバーガーメニュー**：モバイル用のドロワーメニュー
- **自動セクション検出**：Intersection Observer APIによる現在位置検出

### コンテンツ
- **動画カルーセル**：9つのYouTube動画の自動再生・ナビゲーション
- **プロフィール**：スキルカード・ソーシャルリンク
- **問い合わせフォーム**：EmailJS統合による直接送信

## 🚀 デプロイ

### Cloudflare Pages（推奨）

**現在のデプロイ先：** https://beatolabo.pages.dev

```bash
# 静的サイト生成
npm run build

# outディレクトリをCloudflare Pagesにデプロイ
```

### Vercel

```bash
# Vercel CLIを使用
npx vercel

# または GitHub統合でのデプロイ
```

### その他の静的ホスティング

`npm run build`後の`out`ディレクトリを任意の静的ホスティングサービスにアップロード。

## 🔧 カスタマイズ

### 動画コンテンツの変更

```typescript
// src/types/video.ts
export const sampleVideos: VideoData[] = [
  {
    id: '1',
    title: '楽曲タイトル',
    videoId: 'YouTube動画ID',
    description: '説明文'
  },
  // 追加の動画...
];
```

### スタイルの調整

```css
/* src/app/globals.css */
/* Tailwind CSSクラスでカスタマイズ */
```

## 📝 ライセンス
All rights reserved. 再配布はご遠慮ください。

## 🤝 コントリビューション

1. フォークする
2. 機能ブランチを作成 (`git checkout -b feature/新機能`)
3. 変更をコミット (`git commit -am '新機能を追加'`)
4. ブランチをプッシュ (`git push origin feature/新機能`)
5. プルリクエストを作成

## 📞 お問い合わせ

プロジェクトに関する質問や提案があれば、サイト内の問い合わせフォームまたはIssueを通じてお気軽にご連絡ください。
