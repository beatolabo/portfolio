# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

音楽ポートフォリオサイト - Next.js 15 + TypeScript + Tailwind CSS + Framer Motionを使用したアニメーション重視のポートフォリオサイト

## 開発コマンド

```bash
# 開発サーバー起動 (ユーザーが起動するのでAIは実行しない)
npm run dev

# 本番ビルド（静的サイト生成）
npm run build

# リント実行
npm run lint

# プロダクションサーバー起動（通常は使用せず）
npm run start
```

## アーキテクチャ

### プロジェクト構成
- **src/app/**: Next.js App Routerのページファイル
  - `page.tsx`: メインページ（全セクションを含む単一ページアプリ）
  - `layout.tsx`: ルートレイアウト（Geistフォント設定含む）
- **src/components/sections/**: 主要セクションコンポーネント
  - `HeroSection.tsx`: メインビジュアル + YouTubeビデオカルーセル
  - `ProfileSection.tsx`: プロフィール情報表示
  - `ContactSection.tsx`: 問い合わせフォーム（EmailJS使用）
- **src/components/ui/**: 再利用可能UIコンポーネント
  - `VideoCarousel.tsx`: YouTube動画のカルーセル表示
  - `YouTubeVideo.tsx`: 個別YouTube動画埋め込み
- **src/types/video.ts**: YouTube動画データの型定義とサンプルデータ

### 主要技術スタック
- **Next.js 15**: 静的サイト生成（`output: 'export'`）
- **Framer Motion**: 高度なアニメーション（パララックス、スプリング、スクロール連動）
- **Tailwind CSS v4**: スタイリング
- **EmailJS**: 問い合わせフォーム送信
- **TypeScript**: 型安全性

### アニメーション設計
- **スクロール進捗**: ページ上部に進捗バー表示
- **パララックス効果**: セクション間での背景とテキストの差速スクロール
- **マウス追従**: カーソル位置に応じた要素の微動
- **Intersection Observer**: 現在表示中セクションの自動検出
- **レスポンシブナビゲーション**: デスクトップ（フローティング）、モバイル（ドロワー）

### 重要な実装詳細
- **クライアントサイド処理**: `useEffect`でのクライアント判定（SSR対応）
- **セクション管理**: IDベースのスムーズスクロールと自動アクティブ検出
- **YouTube動画**: `sampleVideos`配列での動画データ管理
- **静的エクスポート**: Cloudflare Pages等での静的ホスティング対応（`output: 'export'`）

## 現在のタスク状況

### 完了済み機能（Phase 1-5）
- ✅ Next.jsプロジェクト基盤構築
- ✅ YouTube動画カルーセル（9動画対応）
- ✅ プロフィールセクション（スキルカード含む）
- ✅ 問い合わせフォーム（EmailJS統合）
- ✅ Apple風アニメーション（パララックス、マウス追従、3D効果）
- ✅ スクロール進捗インジケーター・フローティングナビゲーション
- ✅ モバイル専用ハンバーガーメニュー

### 残りタスク（Phase 6: 最終調整・デプロイ）

#### 🔴 最高優先度（最も重要）
- ✅ 実際のコンテンツへの差し替え
- ✅ 各サイトへのリンクを追加し、登録も促す機能を実装
- ✅ Cloudflare Pages デプロイ・動作確認

#### 🟡 中優先度（品質向上）
- [ ] 全体レスポンシブテスト
- [ ] パフォーマンス改善
- [ ] スマホでの動画読み込み最適化

#### 🟢 低優先度（有象無象）
- [ ] 縦向き・小画面対応の検証
- [ ] スマホでの動画inline再生対応検討
- [x] ライトモード対応（システム設定に従う）

## タスク管理指針

### 新規タスクの進行時
1. TodoWriteツールでタスクを細分化し計画を立てる
2. 各タスクの進捗をin_progress → completedで更新
3. **取り組んでいるタスクのtodoをCLAUDE.mdにも反映して管理する。作業の途中から再開できるようにするための措置である。**
4. 実装後は必ず `npm run lint` でコード品質を確認
5. レスポンシブ対応が必要な場合はモバイル・タブレット・デスクトップ全てで検証

### 重要な実装パターン
- **アニメーション**: Framer Motionの物理ベースアニメーション（spring: stiffness 100-300, damping 10-30）
- **レスポンシブ**: モバイル（~768px）、タブレット（768-1024px）、デスクトップ（1024px~）
- **パフォーマンス**: 遅延読み込み、軽量化を常に考慮