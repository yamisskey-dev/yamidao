import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { HoneycombBackground } from '@/components/HoneycombBackground'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} aria-hidden="true">
        <svg className={`${styles.blob} ${styles.blob1}`} viewBox="-100 -100 200 200">
          <path
            fill="currentColor"
            d="M52,-61C66,-50,76,-33,79,-15C82,3,78,22,68,37C58,52,42,63,24,70C6,77,-14,80,-31,74C-48,68,-62,53,-70,36C-78,19,-80,0,-75,-18C-70,-36,-58,-52,-43,-63C-28,-74,-9,-80,8,-78C25,-76,38,-72,52,-61Z"
          />
        </svg>
        <svg className={`${styles.blob} ${styles.blob2}`} viewBox="-100 -100 200 200">
          <path
            fill="currentColor"
            d="M45,-55C59,-44,71,-29,75,-12C79,5,75,24,65,39C55,54,39,65,21,71C3,77,-17,78,-34,71C-51,64,-65,49,-72,32C-79,15,-79,-4,-72,-21C-65,-38,-51,-53,-36,-63C-21,-73,-4,-78,11,-76C26,-74,31,-66,45,-55Z"
          />
        </svg>
      </div>
      {/* blob の手前にハニカムグリッド。ロゴ (#hero-logo) の六角形にセルを揃える */}
      <HoneycombBackground className="absolute inset-0" />
      <div className={styles.inner}>
        <div>
          <h1 className={styles.title}>YAMI DAO</h1>
          <p className={styles.tagline}>
            <a
              href="https://hub.yami.ski/guides/ecosystem/"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              YAMIエコシステム
            </a>
            のガバナンスDAO。
            <br className="hidden sm:inline" />
            みんなの居場所を、みんなで支えるしくみ。
          </p>
          <div className={styles.actions}>
            <Link href="/join" className="yami-btn yami-btn-accent text-base">
              はいる
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/about" className="yami-btn yami-btn-plain text-base">
              わたしたちについて
            </Link>
          </div>
        </div>
        <div className={styles.art}>
          <Image
            id="hero-logo"
            src="https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami-dao/yami-dao-icon.svg"
            alt=""
            width={400}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  )
}
