import { LogIn, Wallet, Vote, ShieldCheck, FileCode2, ExternalLink } from 'lucide-react'
import { Section } from './Section'

// Misskey 認証 → ウォレット連携 → Snapshot → Safe の 4 ステップ。文言は GOVERNANCE.md に揃える。
const steps = [
  {
    Icon: LogIn,
    title: 'Misskey でログイン',
    description: 'やみすきーのアカウントで本人確認（MiAuth）。メールも実名もいりません。',
  },
  {
    Icon: Wallet,
    title: 'ウォレットをつなぐ',
    description: '1 アカウントにつき 1 アドレスだけ。署名で持ち主を確認します（SIWE）。',
  },
  {
    Icon: Vote,
    title: 'Snapshot で投票',
    description: 'ひとり 1 票、ガス代 0。投票権はこのサイトの API が自動で判定します。',
  },
  {
    Icon: ShieldCheck,
    title: 'Safe で執行',
    description: '可決したお金の動きは Optimism 上の 2/2 マルチシグで実行。履歴は全部オンチェーン。',
  },
]

const proofs = [
  {
    label: 'voting-power API',
    href: 'https://dao.yami.ski/api/governance/voting-power',
    note: 'Snapshot が参照する投票権エンドポイント',
  },
  {
    label: 'GOVERNANCE.md',
    href: 'https://github.com/yamisskey-dev/yamidao/blob/main/GOVERNANCE.md',
    note: '提案のルールと開発委託規定',
  },
  {
    label: 'src/app/api/governance',
    href: 'https://github.com/yamisskey-dev/yamidao/tree/main/src/app/api/governance',
    note: '判定ロジックのソースコード（AGPL-3.0）',
  },
]

export function HowItWorks() {
  return (
    <Section id="how-it-works" title="しくみ" dots>
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ Icon, title, description }, i) => (
          <li key={title} className="yami-acrylic relative flex flex-col gap-3 px-6 py-7">
            <div className="flex items-center justify-between">
              <span className="yami-step-number" aria-hidden="true">
                {i + 1}
              </span>
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <p className="text-sm leading-relaxed">{description}</p>
          </li>
        ))}
      </ol>

      <div className="yami-acrylic mt-6 px-6 py-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
          <FileCode2 className="h-4 w-4 text-primary" aria-hidden="true" />
          「信じて」じゃなくて、確かめられる
        </div>
        <ul className="grid gap-2 md:grid-cols-3">
          {proofs.map(({ label, href, note }) => (
            <li key={href} className="text-sm">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="yami-mono inline-flex items-center gap-1 font-bold text-primary hover:underline"
              >
                {label}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
              <p className="text-xs text-muted-foreground">{note}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
