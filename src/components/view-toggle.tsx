"use client"

import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"

interface ViewToggleProps {
  view: "grid" | "list"
  setView: (view: "grid" | "list") => void
}

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant={view === "grid" ? "secondary" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => setView("grid")}
      >
        <Grid className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
      <Button
        variant={view === "list" ? "secondary" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => setView("list")}
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </Button>
    </div>
  )
}

