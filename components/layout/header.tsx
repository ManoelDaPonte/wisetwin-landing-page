// components/layout/header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Menu,
  Mail,
  Boxes,
  FileText,
  Info,
  BookOpen,
  Video,
  GraduationCap,
  Shield,
  HardHat,
  ChartBar,
  School,
  Bot,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

// Menu items configuration
type MenuChild = {
  title: string;
  href: string;
  description: string;
  icon: string;
  iconComponent?: React.ReactNode;
};

type MenuItem = {
  title: string;
  href: string;
  children?: MenuChild[];
};

const menuItems: MenuItem[] = [
  {
    title: "Solutions",
    href: "/solutions",
    children: [
      {
        title: "WiseTrainer",
        href: "/solutions/wisetrainer",
        description: "Formations immersives en 3D pour vos équipes",
        icon: "/globe.svg",
        iconComponent: <GraduationCap className="size-4 text-secondary" />,
      },
      {
        title: "WiseTour",
        href: "/solutions/wisetour",
        description: "Visites industrielles virtuelles interactives",
        icon: "/window.svg",
        iconComponent: <Video className="size-4 text-secondary" />,
      },
      {
        title: "WiseScan",
        href: "/solutions/wisescan",
        description:
          "Analyse intelligente des accidents pour des recommandations sur-mesure",
        icon: "/chart.svg",
        iconComponent: <ChartBar className="size-4 text-secondary" />,
      },
      {
        title: "WiseAssist",
        href: "/solutions/wiseassist",
        description: "Assistant IA pour guider vos équipes en temps réel",
        icon: "/bot.svg",
        iconComponent: <Bot className="size-4 text-secondary" />,
      },
    ],
  },
  {
    title: "Vous êtes ?",
    href: "#vous-etes",
    children: [
      {
        title: "Responsable HSE",
        href: "/profils/responsable-hse",
        description: "Diminuez les incidents et améliorez la sécurité",
        icon: "/shield.svg",
        iconComponent: <Shield className="size-4 text-secondary" />,
      },
      {
        title: "Responsable Formation",
        href: "/profils/responsable-formation",
        description: "Centralisez et optimisez vos formations",
        icon: "/school.svg",
        iconComponent: <School className="size-4 text-secondary" />,
      },
      {
        title: "Chef de Production",
        href: "/profils/chef-production",
        description: "Augmentez la productivité et réduisez les arrêts",
        icon: "/factory.svg",
        iconComponent: <HardHat className="size-4 text-secondary" />,
      },
      {
        title: "Directeur Industriel",
        href: "/profils/directeur-industriel",
        description: "Modernisez vos processus et valorisez votre savoir-faire",
        icon: "/chart.svg",
        iconComponent: <ChartBar className="size-4 text-secondary" />,
      },
    ],
  },
  {
    title: "Ressources",
    href: "/ressources",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion variants
  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    hidden: {
      y: -30,
      opacity: 0,
    },
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.05 * i,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const menuChildVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.03 * i,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "py-2 bg-background/90 backdrop-blur-md shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              initial="initial"
              animate="animate"
              variants={logoVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src="/wisetwin-logo.png"
                alt="WiseTwin Logo"
                width={40}
                height={40}
                className="dark:invert"
              />
              <div className="hidden lg:block text-2xl font-bold text-foreground">
                <span className="text-primary">Wise</span>
                <span className="text-secondary">Twin</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item, index) => (
                  <NavigationMenuItem key={item.title}>
                    {item.children ? (
                      <>
                        <motion.div
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={navItemVariants}
                        >
                          <NavigationMenuTrigger>
                            {item.title}
                          </NavigationMenuTrigger>
                        </motion.div>
                        <NavigationMenuContent>
                          {item.title === "Solutions" ? (
                            <div className="w-[700px] grid grid-cols-5 gap-4 p-4">
                              {/* Colonne gauche : WiseTrainer - Plus large et plus attractive */}
                              <div
                                className="col-span-3 rounded-lg border"
                                style={{ backgroundColor: "hsl(190 95% 96%)" }}
                              >
                                {item.children && item.children[0] && (
                                  <motion.div
                                    key={item.children[0].title}
                                    custom={0}
                                    initial="hidden"
                                    animate="visible"
                                    variants={menuChildVariants}
                                    whileHover={{
                                      scale: 1.02,
                                      transition: { duration: 0.2 },
                                    }}
                                    className="h-full"
                                  >
                                    <Link
                                      href={item.children[0].href}
                                      className="block h-full hover:bg-accent rounded-lg transition-colors"
                                    >
                                      <div className="p-6 h-full flex flex-col justify-between">
                                        {/* En-tête avec icône et titre */}
                                        <div className="flex items-start gap-3 mb-4">
                                          <motion.div
                                            className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/50"
                                            whileHover={{
                                              rotate: [0, -5, 5, -5, 0],
                                            }}
                                            transition={{ duration: 0.5 }}
                                          >
                                            <GraduationCap className="size-5 text-secondary" />
                                          </motion.div>
                                          <div className="flex-1">
                                            <div className="font-medium text-lg">
                                              {item.children[0].title}
                                            </div>
                                            <p className="text-muted-foreground text-sm leading-tight mt-1">
                                              {item.children[0].description}
                                            </p>
                                          </div>
                                        </div>

                                        {/* Badge "Solution phare" */}
                                        {/* <div className="mb-4">
                                          <span
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                                            style={{
                                              backgroundColor:
                                                "hsl(190 95% 90%)",
                                              color: "hsl(240 80% 20%)",
                                              borderColor: "hsl(190 95% 80%)",
                                            }}
                                          >
                                            <div
                                              className="size-1.5 rounded-full animate-pulse"
                                              style={{
                                                backgroundColor:
                                                  "hsl(190 95% 50%)",
                                              }}
                                            ></div>
                                            Solution phare
                                          </span>
                                        </div> */}

                                        {/* Liste des avantages avec un meilleur espacement */}
                                        <div className="space-y-3 mb-4">
                                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <div
                                              className="size-1 rounded-full"
                                              style={{
                                                backgroundColor:
                                                  "hsl(190 95% 50%)",
                                              }}
                                            ></div>
                                            Formation immersive sans équipement
                                            VR
                                          </div>
                                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <div
                                              className="size-1 rounded-full"
                                              style={{
                                                backgroundColor:
                                                  "hsl(190 95% 50%)",
                                              }}
                                            ></div>
                                            Déploiement rapide et sans
                                            installation
                                          </div>
                                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <div
                                              className="size-1 rounded-full"
                                              style={{
                                                backgroundColor:
                                                  "hsl(190 95% 50%)",
                                              }}
                                            ></div>
                                            Suivi détaillé des performances
                                          </div>
                                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <div
                                              className="size-1 rounded-full"
                                              style={{
                                                backgroundColor:
                                                  "hsl(190 95% 50%)",
                                              }}
                                            ></div>
                                            Accessible depuis n'importe quel
                                            navigateur
                                          </div>
                                        </div>

                                        {/* Call-to-action subtil */}
                                        <div
                                          className="flex items-center text-sm font-medium"
                                          style={{ color: "hsl(240 80% 20%)" }}
                                        >
                                          <span>Découvrir WiseTrainer</span>
                                          <motion.div
                                            className="ml-2"
                                            animate={{ x: [0, 3, 0] }}
                                            transition={{
                                              duration: 1.5,
                                              repeat: Infinity,
                                              ease: "easeInOut",
                                            }}
                                          >
                                            →
                                          </motion.div>
                                        </div>
                                      </div>
                                    </Link>
                                  </motion.div>
                                )}
                              </div>

                              {/* Colonne droite : Autres solutions - Plus compacte */}
                              <div className="col-span-2 flex flex-col gap-3">
                                {/* WiseTour */}
                                <motion.div
                                  key="WiseTour"
                                  custom={1}
                                  initial="hidden"
                                  animate="visible"
                                  variants={menuChildVariants}
                                  whileHover={{
                                    scale: 1.03,
                                    backgroundColor:
                                      "rgba(var(--accent-rgb), 0.2)",
                                    transition: { duration: 0.2 },
                                  }}
                                >
                                  <Link href="/solutions/wisetour">
                                    <div className="flex gap-2 items-start p-3 hover:bg-accent rounded-md transition-colors">
                                      <motion.div
                                        className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/50"
                                        whileHover={{
                                          rotate: [0, -5, 5, -5, 0],
                                        }}
                                        transition={{ duration: 0.5 }}
                                      >
                                        <Video className="size-5 text-secondary" />
                                      </motion.div>
                                      <div>
                                        <div className="font-medium">
                                          WiseTour
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-tight mt-1">
                                          Visites industrielles virtuelles
                                          interactives
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </motion.div>

                                {/* WiseScan */}
                                <motion.div
                                  key="WiseScan"
                                  custom={2}
                                  initial="hidden"
                                  animate="visible"
                                  variants={menuChildVariants}
                                  whileHover={{
                                    scale: 1.03,
                                    backgroundColor:
                                      "rgba(var(--accent-rgb), 0.2)",
                                    transition: { duration: 0.2 },
                                  }}
                                >
                                  <Link href="/solutions/wisescan">
                                    <div className="flex gap-2 items-start p-3 hover:bg-accent rounded-md transition-colors">
                                      <motion.div
                                        className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/50"
                                        whileHover={{
                                          rotate: [0, -5, 5, -5, 0],
                                        }}
                                        transition={{ duration: 0.5 }}
                                      >
                                        <ChartBar className="size-5 text-secondary" />
                                      </motion.div>
                                      <div>
                                        <div className="font-medium">
                                          WiseScan
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-tight mt-1">
                                          Analyse intelligente des accidents
                                          pour des recommandations sur-mesure
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </motion.div>

                                {/* WiseAssist */}
                                <motion.div
                                  key="WiseAssist"
                                  custom={3}
                                  initial="hidden"
                                  animate="visible"
                                  variants={menuChildVariants}
                                  whileHover={{
                                    scale: 1.03,
                                    backgroundColor:
                                      "rgba(var(--accent-rgb), 0.2)",
                                    transition: { duration: 0.2 },
                                  }}
                                >
                                  <Link href="/solutions/wiseassist">
                                    <div className="flex gap-2 items-start p-3 hover:bg-accent rounded-md transition-colors">
                                      <motion.div
                                        className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/50"
                                        whileHover={{
                                          rotate: [0, -5, 5, -5, 0],
                                        }}
                                        transition={{ duration: 0.5 }}
                                      >
                                        <Bot className="size-5 text-secondary" />
                                      </motion.div>
                                      <div>
                                        <div className="font-medium">
                                          WiseAssist
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-tight mt-1">
                                          Assistant IA pour guider vos équipes
                                          et répondre à leurs questions en temps
                                          réel
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </motion.div>
                              </div>
                            </div>
                          ) : (
                            <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                              {item.children.map((child, childIndex) => (
                                <motion.div
                                  key={child.title}
                                  custom={childIndex}
                                  initial="hidden"
                                  animate="visible"
                                  variants={menuChildVariants}
                                  whileHover={{
                                    scale: 1.03,
                                    backgroundColor:
                                      "rgba(var(--accent-rgb), 0.2)",
                                    transition: { duration: 0.2 },
                                  }}
                                >
                                  <Link href={child.href}>
                                    <div className="flex gap-2 items-start p-3 hover:bg-accent rounded-md transition-colors">
                                      <motion.div
                                        className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted/50"
                                        whileHover={{
                                          rotate: [0, -5, 5, -5, 0],
                                        }}
                                        transition={{ duration: 0.5 }}
                                      >
                                        {child.iconComponent || (
                                          <Image
                                            src={child.icon}
                                            alt=""
                                            width={18}
                                            height={18}
                                          />
                                        )}
                                      </motion.div>
                                      <div>
                                        <div className="font-medium">
                                          {child.title}
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-tight mt-1">
                                          {child.description}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <motion.div
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={navItemVariants}
                      >
                        <Link
                          href={item.href}
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.title}
                        </Link>
                      </motion.div>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className="hidden md:flex">
                <Link href="/#contact">
                  <div>Nous contacter</div>
                </Link>
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Sheet>
                <SheetTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button variant="outline" size="icon" aria-label="Menu">
                      <Menu className="size-5" />
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent side="right" className="max-w-[320px] p-0">
                  <SheetTitle className="sr-only">
                    Menu de navigation
                  </SheetTitle>

                  {/* En-tête du menu mobile avec logo */}
                  <div className="border-b p-4">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1,
                        duration: 0.3,
                      }}
                      className="flex items-center justify-between"
                    >
                      <Link href="/">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/wisetwin-logo.png"
                            alt="WiseTwin Logo"
                            width={32}
                            height={32}
                            className="dark:invert"
                          />
                          <span className="font-bold text-lg">
                            <span className="text-primary">Wise</span>
                            <span className="text-muted-foreground">Twin</span>
                          </span>
                        </div>
                      </Link>
                      {/* Nous n'utilisons pas de SheetClose ici car le composant SheetContent a déjà un X en haut à droite */}
                    </motion.div>
                  </div>

                  {/* Corps du menu mobile */}
                  <div className="flex flex-col py-3 px-1 max-h-[calc(100vh-80px)] overflow-y-auto">
                    <nav className="flex flex-col">
                      {menuItems.map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{
                            opacity: 0,
                            x: -15,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: 0.1 * (index + 1),
                            duration: 0.3,
                          }}
                        >
                          {item.children ? (
                            <div className="mb-2">
                              <div className="flex items-center gap-2 px-4 py-2.5 font-medium">
                                {item.title === "Solutions" && (
                                  <Boxes className="size-4 text-primary" />
                                )}
                                {item.title === "Cas d'usage" && (
                                  <FileText className="size-4 text-primary" />
                                )}
                                {item.title === "À propos" && (
                                  <Info className="size-4 text-primary" />
                                )}
                                {item.title === "Ressources" && (
                                  <BookOpen className="size-4 text-primary" />
                                )}
                                {item.title}
                              </div>
                              <div className="ml-4 pl-3 border-l border-muted flex flex-col">
                                {item.children.map((child, childIndex) => (
                                  <motion.div
                                    key={child.title}
                                    initial={{
                                      opacity: 0,
                                      x: -8,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                    }}
                                    transition={{
                                      delay: 0.08 * childIndex + 0.2,
                                      duration: 0.3,
                                    }}
                                  >
                                    <Link
                                      href={child.href}
                                      className="flex items-center gap-2.5 py-2 px-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                                    >
                                      {child.iconComponent || (
                                        <Image
                                          src={child.icon}
                                          alt=""
                                          width={16}
                                          height={16}
                                        />
                                      )}
                                      <span className="text-sm">
                                        {child.title}
                                      </span>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className="flex items-center gap-2 px-4 py-2.5 font-medium hover:bg-muted/50 rounded-md transition-colors"
                            >
                              {item.title === "Solutions" && (
                                <Boxes className="size-4 text-primary" />
                              )}
                              {item.title === "Cas d'usage" && (
                                <FileText className="size-4 text-primary" />
                              )}
                              {item.title === "À propos" && (
                                <Info className="size-4 text-primary" />
                              )}
                              {item.title === "Ressources" && (
                                <BookOpen className="size-4 text-primary" />
                              )}
                              {item.title}
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </nav>
                  </div>

                  {/* Pied du menu mobile avec bouton de contact */}
                  <div className="border-t p-4 mt-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.5,
                        duration: 0.4,
                      }}
                    >
                      <Button asChild className="w-full">
                        <Link href="/#contact">
                          <div className="flex items-center justify-center gap-2">
                            <Mail className="size-4" />
                            Nous contacter
                          </div>
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </SheetContent>
              </Sheet>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
