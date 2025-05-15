// components/sections/header.tsx
"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <Card className="rounded-none border-b border-b-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-md bg-gradient-to-b from-primary to-secondary flex items-center justify-center text-white font-bold">
              WT
            </div>
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              WiseTwin
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="#features" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Formations
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Fonctionnement
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Tarifs
            </Link>
            <Link 
              href="#contact" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary/80 text-primary hover:bg-primary/5 hover:border-primary"
            >
              Se connecter
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
            >
              Essai gratuit
            </Button>
          </div>
        </div>
      </Card>
    </header>
  );
}