import { Heart, Shield, Users } from 'lucide-react'

// hero 直下の 3 枚カード。文言は「わたしたちについて」のコアバリューから。
const features = [
  {
    Icon: Heart,
    title: 'メンタルファースト',
    description: 'つかう人のこころの安全がいちばん。弱音をそのまま言葉にしていい場所を守る。',
  },
  {
    Icon: Shield,
    title: 'プライバシーファースト',
    description: '個人情報をあつめない設計。集めないから、売ることも漏らすこともできない。',
  },
  {
    Icon: Users,
    title: 'コミュニティ主導',
    description: 'みんなで決めるから、こころもプライバシーも守れる。ひとり1票のガバナンス。',
  },
]

export function Features() {
  return (
    <div className="relative grid gap-4 md:grid-cols-3">
      {features.map(({ Icon, title, description }) => (
        <div key={title} className="yami-acrylic px-6 py-8 text-center">
          <div className="inline-grid place-items-center w-14 h-14 rounded-full bg-primary/15 text-primary">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </div>
          <h3 className="mt-3 mb-2 text-lg font-bold text-foreground">{title}</h3>
          <p className="text-sm leading-relaxed">{description}</p>
        </div>
      ))}
    </div>
  )
}
