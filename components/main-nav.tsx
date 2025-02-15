"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Library, Terminal, MessageSquare, FileText, Github, MessageCircle, Moon } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Arise</span>
          </Link>
        </div>
        <div className="flex gap-6 md:gap-10">
          <Link
            href="/"
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
              pathname === "/" ? "text-foreground" : "text-foreground/60"
            )}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
          <Link
            href="/models"
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
              pathname?.startsWith("/models") ? "text-foreground" : "text-foreground/60"
            )}
          >
            <Library className="mr-2 h-4 w-4" />
            Models
          </Link>
          <Link
            href="/console"
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
              pathname?.startsWith("/console") ? "text-foreground" : "text-foreground/60"
            )}
          >
            <Terminal className="mr-2 h-4 w-4" />
            Console
          </Link>
          <Link
            href="/assistant"
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
              pathname?.startsWith("/assistant") ? "text-foreground" : "text-foreground/60"
            )}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Assistant
          </Link>
          <Link
            href="/docs"
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
              pathname?.startsWith("/docs") ? "text-foreground" : "text-foreground/60"
            )}
          >
            <FileText className="mr-2 h-4 w-4" />
            Docs
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Support</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Moon className="h-4 w-4" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}