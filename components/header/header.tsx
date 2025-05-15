// components/header/header.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Card className="relative z-50 w-full border-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">WiseTwin</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link 
            href="#features" 
            className="text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            Features
          </Link>
          <Link 
            href="#pricing" 
            className="text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            Pricing
          </Link>
          <Link 
            href="#about" 
            className="text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            About
          </Link>
          <Link 
            href="#contact" 
            className="text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button 
            className="bg-white text-indigo-600 hover:bg-white/90 hover:text-indigo-700"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white md:hidden"
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-16 z-50 bg-white p-4 shadow-lg md:hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="menu">
              <AccordionTrigger className="py-2 text-indigo-600">Navigation</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-3 p-2">
                  <Link 
                    href="#features" 
                    className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    href="#pricing" 
                    className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link 
                    href="#about" 
                    className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    href="#contact" 
                    className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-4">
            <Button 
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

export default Header