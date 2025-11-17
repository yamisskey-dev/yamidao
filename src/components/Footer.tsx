import { Heart, MessageCircle, Users, MessageSquare, Cloud } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-4 md:px-8 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* ロゴ・説明 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami-dao/yami-dao-icon.svg"
                alt="YAMI DAO Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h3 className="text-xl font-bold">YAMI DAO</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Mental Health Tech Collective
            </p>
            <p className="text-xs text-muted-foreground">
              やみすきーエコシステムのガバナンスを
              分散型で運営するオープンソース・Web3 DAOです。
            </p>
          </div>

          {/* リンク */}
          <div>
            <h4 className="font-semibold mb-4">リンク</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About DAO
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#governance"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Governance
                </a>
              </li>
              <li>
                <a
                  href="#funding"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Funding
                </a>
              </li>
              <li>
                <a
                  href="#members"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Members
                </a>
              </li>
              <li>
                <a
                  href="#roadmap"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#join"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Join
                </a>
              </li>
            </ul>
          </div>

          {/* コミュニティ */}
          <div>
            <h4 className="font-semibold mb-4">コミュニティ</h4>
            <div className="space-y-3">
              <a
                href="https://yami.ski"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Cloud className="h-4 w-4" />
                <span>Misskey</span>
              </a>
              <a
                href="https://discord.gg/WMgzEBvr8b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Discord</span>
              </a>
              <a
                href="https://vrc.group/YMSKY.5787"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>VRChat</span>
              </a>
              <a
                href="https://chat.yami.ski"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Element</span>
              </a>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Heart className="h-4 w-4 text-accent" />
            <span>© {currentYear} YAMI DAO. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
