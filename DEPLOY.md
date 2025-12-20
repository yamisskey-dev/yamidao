# デプロイ

このプロジェクトは [Cloudflare Pages](https://pages.cloudflare.com) でデプロイされています。

## Cloudflare Pages 設定

### ビルド設定

| 項目 | 値 |
|------|-----|
| Framework preset | Next.js |
| Build command | `npx @cloudflare/next-on-pages@1` |
| Build output directory | `.vercel/output/static` |

### 互換性フラグ（重要）

プロジェクト作成後、**Settings** → **Functions** で以下を設定:

- **Compatibility Flags**: `nodejs_compat` (Production/Preview両方)
- **Compatibility Date**: `2025-11-16` (または最新)

設定後、再デプロイが必要です。

## 自動デプロイ

`main` ブランチへのプッシュで自動的にビルド・デプロイされます。

## ローカルプレビュー

```bash
pnpm build
pnpm preview
```

## 技術詳細

- **アダプター**: [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)
- **ランタイム**: Cloudflare Pages (Edge Runtime)
