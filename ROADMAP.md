# YAMI DAO Roadmap

技術的なロードマップと将来の展望

## Phase 1: DAO立ち上げ (2025 Q1-Q2) - 完了

- [x] Webサイト・コミュニティ基盤
- [x] yamisskey-dev 継続開発

## Phase 2: Web3統合 (2025 Q3-Q4) - 進行中

- [x] Snapshot統合（オフチェーン投票）
- [x] Safe統合（Treasury管理）
- [ ] Misskey認証によるメンバー確認
- [ ] Semaphoreによるゼロ知識証明（ZKP）匿名投票

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

### Semaphore ZKP匿名投票

プライバシーファーストの理念を技術的に実現するため、ゼロ知識証明（ZKP）プロトコル「Semaphore」を導入予定。

**目的:**
- 投票者のウォレットアドレスを公開せずに投票権を証明
- 「誰が何に投票したか」を追跡不可能にし、心理的安全性を確保
- Sybil攻撃耐性を維持しつつ完全匿名投票を実現

**技術構成:**
- @semaphore-protocol/core (ZK証明生成)
- @semaphore-protocol/contracts (Optimism上のグループ管理)
- カスタムSnapshot Strategy (ZK証明検証)

**フロー:**
1. ユーザーがMiAuthでMisskeyアカウント認証
2. サーバーでSemaphore identity commitmentを生成
3. commitmentをSemaphoreグループに登録
4. 投票時: ユーザーはローカルでZK証明を生成
5. Snapshot StrategyでZK証明を検証し投票を受理

**メンタルヘルスコミュニティにおける意義:**
- 自分の意見表明が誰にも追跡されない安心感
- センシティブなテーマでも率直な投票が可能
- 匿名性による参加ハードルの低減

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
| プライバシー | - | Semaphore (ZKP) | + zkSBT |
| データベース | - | Cloudflare D1 | - |
| 投票 | Snapshot (whitelist) | Snapshot (API Strategy + ZK証明) | オンチェーン |
| Treasury | Safe | Safe | Safe + 自動化 |
