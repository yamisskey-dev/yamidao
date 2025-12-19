# YAMI DAO

**Mental Health Tech Collective**

プライバシー保護 × メンタルヘルス
オープンソース × Web3

## 概要

YAMI DAOは、メンタルヘルスとプライバシー保護を重視したテクノロジー・コレクティブです。オープンソースとWeb3の理念に基づき、誰もが安心してメンタルヘルスケアにアクセスできる環境を目指しています。

このリポジトリは、DAOの紹介サイトおよびメンバー認証DAppとして機能します。

**ブロックチェーン**: Optimism (Ethereum L2)

詳細なロードマップは [ROADMAP.md](ROADMAP.md) を参照してください。

## 技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org) 15.3.2 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **アイコン**: lucide-react
- **テスト**: Jest + React Testing Library
- **パッケージマネージャー**: pnpm
- **デプロイ**: Cloudflare

## セットアップ

### 前提条件

- Node.js 20以上
- pnpm

### インストール

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 開発

### ディレクトリ構造

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # ルートレイアウト
│   ├── page.tsx          # ホームページ
│   └── not-found.tsx     # 404ページ
└── components/           # Reactコンポーネント
    ├── Hero.tsx          # ヒーローセクション
    ├── AboutDAO.tsx      # DAOについて
    ├── Governance.tsx    # ガバナンス・トレジャリー
    ├── Roadmap.tsx       # ロードマップ
    ├── Join.tsx          # 参加方法
    ├── Footer.tsx        # フッター
    ├── ThemeProvider.tsx # テーマプロバイダー
    └── __tests__/        # コンポーネントテスト
```

### テスト

```bash
# テスト実行
pnpm test

# ウォッチモード
pnpm test:watch

# カバレッジ
pnpm test:coverage
```

### ビルド

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

## デプロイ

このプロジェクトは[Cloudflare Pages](https://pages.cloudflare.com)でデプロイされています。

### Cloudflare Pagesへのデプロイ

プロジェクトは**@cloudflare/next-on-pages**を使用してCloudflare Pages上で動作します。

#### Cloudflare Pagesでの設定

1. [Cloudflare Pagesダッシュボード](https://dash.cloudflare.com/)にアクセス
2. **Pages** → **Create a project** → **Connect to Git**
3. GitHubリポジトリを選択
4. ビルド設定:
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages@1`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: (空白)
   - **Environment variables**: 必要に応じて設定

5. **互換性フラグの設定（重要）**:
   - プロジェクト作成後、**Settings** → **Functions** に移動
   - **Compatibility Flags** セクションで以下を追加:
     - Production環境: `nodejs_compat`
     - Preview環境: `nodejs_compat`
   - **Compatibility Date**: `2025-11-16` (または最新の日付)
   - 設定後、保存して再デプロイ

#### 自動デプロイ

`main` ブランチへのプッシュで自動的にビルド・デプロイされます。

#### ローカルプレビュー

本番環境と同じCloudflare Pages環境でローカルテストできます:

```bash
pnpm build
pnpm preview
```

#### 技術詳細

- **アダプター**: [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)
- **ランタイム**: Cloudflare Pages (Edge Runtime)
- **ビルド出力**: `.vercel/output/static`

## ライセンス

このプロジェクトはオープンソースです。
