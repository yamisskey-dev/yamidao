interface Props {
  className?: string
}

// Optimism の OP マーク（赤丸に白い OP）。ブランドカラー #FF0420。
export function OptimismMark({ className }: Props) {
  return (
    <svg viewBox="0 0 500 500" className={className} role="img" aria-label="Optimism">
      <circle cx="250" cy="250" r="250" fill="#FF0420" />
      <circle cx="172" cy="250" r="58" fill="none" stroke="#fff" strokeWidth="38" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M258 174h78a56 56 0 0 1 0 112h-40v40h-38zm38 36v40h40a20 20 0 0 0 0-40z"
      />
    </svg>
  )
}
