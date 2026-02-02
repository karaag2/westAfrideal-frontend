"use client"

import * as React from "react"
import { Moon, Sun, Palette, Leaf, CloudSun, Waves } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 border border-slate-200 dark:border-white/10">
          <Palette className="h-5 w-5 rotate-0 scale-100 transition-all text-slate-600 dark:text-slate-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[150px] shadow-2xl border-slate-100 dark:border-white/10 dark:bg-zinc-900">
        <DropdownMenuItem onClick={() => setTheme("light")} className="rounded-xl flex items-center gap-3 cursor-pointer py-3 hover:bg-slate-50 dark:hover:bg-white/5">
          <Sun className="h-4 w-4 text-orange-500" />
          <span className="font-bold text-sm">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="rounded-xl flex items-center gap-3 cursor-pointer py-3 hover:bg-slate-50 dark:hover:bg-white/5">
          <Moon className="h-4 w-4 text-primary" />
          <span className="font-bold text-sm">Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("forest")} className="rounded-xl flex items-center gap-3 cursor-pointer py-3 hover:bg-slate-50 dark:hover:bg-white/5">
          <Leaf className="h-4 w-4 text-emerald-500" />
          <span className="font-bold text-sm">Forest</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("sunset")} className="rounded-xl flex items-center gap-3 cursor-pointer py-3 hover:bg-slate-50 dark:hover:bg-white/5">
          <CloudSun className="h-4 w-4 text-rose-500" />
          <span className="font-bold text-sm">Sunset</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("ocean")} className="rounded-xl flex items-center gap-3 cursor-pointer py-3 hover:bg-slate-50 dark:hover:bg-white/5">
          <Waves className="h-4 w-4 text-blue-500" />
          <span className="font-bold text-sm">Ocean</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
