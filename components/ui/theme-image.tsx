"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ThemeImageProps {
  lightSrc: string
  darkSrc: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function ThemeImage({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  className,
  priority = false,
}: ThemeImageProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Éviter le flash pendant l'hydratation - afficher l'image dark par défaut
  if (!mounted) {
    return (
      <Image
        src={darkSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    )
  }

  const isDark = resolvedTheme === "dark"
  const src = isDark ? lightSrc : darkSrc

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
