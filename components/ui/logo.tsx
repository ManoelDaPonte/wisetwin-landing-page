"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

interface LogoProps {
  variant?: "wisetwin" | "parrot"
  width?: number
  height?: number
  className?: string
}

export function Logo({ 
  variant = "wisetwin", 
  width = 120, 
  height = 32, 
  className 
}: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Eviter le flash pendant l'hydratation
  if (!mounted) {
    return (
      <div 
        style={{ width, height }} 
        className={`bg-transparent ${className}`}
      />
    )
  }

  // Logique pour choisir le bon logo
  const getLogoSrc = () => {
    const isDark = theme === "dark"
    
    if (variant === "wisetwin") {
      return isDark ? "/logo-wisetwin-light.png" : "/logo-wisetwin-dark.svg"
    } else {
      return isDark ? "/logo-parrot-light.png" : "/logo-parrot-dark.png"
    }
  }

  const getAltText = () => {
    return variant === "wisetwin" ? "WiseTwin Logo" : "Parrot Logo"
  }

  return (
    <Image
      src={getLogoSrc()}
      alt={getAltText()}
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}