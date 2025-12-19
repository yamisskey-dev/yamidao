# YAMI DAO Roadmap

技術的なロードマップと将来の展望

## Phase 1: DAO立ち上げ (2025 Q1-Q2) - 完了

- [x] Webサイト・コミュニティ基盤
- [x] yamisskey-dev 継続開発

## Phase 2: Web3統合 (2025 Q3-Q4) - 進行中

- [x] Snapshot統合（オフチェーン投票）
- [x] Safe統合（Treasury管理）
- [ ] Misskey認証によるメンバー確認

### Misskey認証システム

OSSの理念に基づき、Misskeyアカウントを用いたメンバー認証システムを構築予定。

**目的:**
- 1人1票の投票権をMisskeyアカウントで保証
- Discord等の非公開ソフトウェアに依存しない認証
- YAMIエコシステム全体で利用可能な統一ID

**技術構成:**
- MiAuth/OAuth (Misskey認証)
- wagmi + viem (ウォレット接続)
- Cloudflare D1 (データ永続化)
- Snapshot API Strategy (投票権判定)

**対応予定:**
- ブラウザウォレット (MetaMask等)
- モバイルウォレット (WalletConnect)
- やみすきー系インスタンス (yami.ski, test.yami.ski等)

## Phase 3: フルDAO化 (2026以降) - 予定

- [ ] オンチェーン投票
- [ ] コントリビューター報酬自動配布
- [ ] エコシステム拡大

### 将来的な拡張

**Solidity連携:**
- SBT (Soulbound Token) によるメンバーシップ証明
- EAS (Ethereum Attestation Service) によるオンチェーン認証
- スマートコントラクトによる自動報酬分配

**エコシステム統合:**
- hub.yami.ski の各サービスとの連携
- 他のやみすきーインスタンスとの相互認証

## 技術スタック

| 項目 | 現在 | Phase 2 | Phase 3 |
|------|------|---------|---------|
| フロントエンド | Next.js 15 | + wagmi/viem | - |
| 認証 | - | MiAuth | + SBT/EAS |
| データベース | - | Cloudflare D1 | - |
| 投票 | Snapshot (whitelist) | Snapshot (API Strategy) | オンチェーン |
| Treasury | Safe | Safe | Safe + 自動化 |
