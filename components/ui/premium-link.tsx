"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode, MouseEvent } from "react"

interface PremiumLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export function PremiumLink({ href, children, className = "", onClick }: PremiumLinkProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e)
    }

    if (
      !e.defaultPrevented && // onClick prevented default
      e.button === 0 && // left click
      !e.metaKey && // not command key
      !e.ctrlKey && // not control key
      !e.shiftKey && // not shift key
      !e.altKey // not alt key
    ) {
      e.preventDefault()

      // Add a small delay for a smoother transition feel
      const transitionNode = document.createElement("div")
      transitionNode.style.position = "fixed"
      transitionNode.style.top = "0"
      transitionNode.style.left = "0"
      transitionNode.style.width = "100%"
      transitionNode.style.height = "100%"
      transitionNode.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
      transitionNode.style.backdropFilter = "blur(4px)"
      transitionNode.style.zIndex = "100"
      transitionNode.style.opacity = "0"
      transitionNode.style.transition = "opacity 0.2s ease"
      document.body.appendChild(transitionNode)

      // Fade in
      setTimeout(() => {
        transitionNode.style.opacity = "1"
      }, 10)

      // Navigate after a short delay
      setTimeout(() => {
        router.push(href)

        // Fade out and remove
        transitionNode.style.opacity = "0"
        setTimeout(() => {
          document.body.removeChild(transitionNode)
        }, 200)
      }, 200)
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
