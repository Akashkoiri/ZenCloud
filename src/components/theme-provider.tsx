"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    const storedTheme = localStorage.getItem(storageKey)

    if (storedTheme) {
      setTheme(storedTheme as Theme)
      if (storedTheme === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    } else {
      setTheme(defaultTheme)
      if (defaultTheme === "dark") {
        root.classList.add("dark")
      }
    }
  }, [defaultTheme, storageKey])

  useEffect(() => {
    const root = window.document.documentElement

    if (disableTransitionOnChange) {
      root.classList.add("no-transitions")

      // Force a reflow
      window.getComputedStyle(root).getPropertyValue("opacity")
    }

    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    if (disableTransitionOnChange) {
      // Force a reflow
      window.getComputedStyle(root).getPropertyValue("opacity")

      root.classList.remove("no-transitions")
    }

    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey, disableTransitionOnChange])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

