'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Wallet } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'navbar-scrolled'
          : 'navbar-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://raw.githubusercontent.com/yamisskey-dev/yamisskey-assets/main/yami-dao/yami-dao-icon.svg"
              alt="YAMI DAO Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-bold text-lg">YAMI DAO</span>
          </Link>

          {/* Connect Wallet Button */}
          <button className="dao-btn-primary flex items-center gap-2 text-sm py-2 px-4">
            <Wallet className="h-4 w-4" />
            <span>Connect</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
