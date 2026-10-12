interface SectionProps {
  id?: string
  title?: string
  dots?: boolean
  children: React.ReactNode
}

// ランディング用のセクション。dots を付けるとドット模様の背景になる。
export function Section({ id, title, dots = false, children }: SectionProps) {
  return (
    <section id={id} className={`py-16 ${dots ? 'yami-dots' : ''}`}>
      {title && (
        <h2 className="yami-section-title text-center mb-10">
          <span>{title}</span>
        </h2>
      )}
      {children}
    </section>
  )
}
