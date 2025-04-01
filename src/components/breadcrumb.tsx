import { ChevronRight, FileSymlink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface BreadcrumbProps {
  currentFolder: string
}

export function Breadcrumb({ currentFolder }: BreadcrumbProps) {
  const folderPath = ["My Drive", "Work Documents", "Projects", currentFolder].filter(
    (item) => item !== "My Drive" || currentFolder === "My Drive",
  )

  const isAtRoot = folderPath.length === 1 && folderPath[0] === "My Drive"

  return (
    <div className="flex items-center">
      <nav className="flex items-center text-sm text-gray-200">
        {!isAtRoot && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 px-2 text-gray-300 hover:text-white hover:bg-[#2d2d2d] mr-1">
                <FileSymlink className="h-4 w-4 mr-1" />
                My Drive
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>Computers</DropdownMenuItem>
              <DropdownMenuItem>Shared drives</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {folderPath.map((folder, index) => {
          // Skip the first item if we're showing the dropdown
          if (index === 0 && !isAtRoot) return null

          const isLast = index === folderPath.length - 1

          return (
            <div key={folder} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />}
              <Button
                variant="ghost"
                className={`px-2 h-8 text-sm ${
                  isLast
                    ? "font-medium text-white hover:bg-[#2d2d2d]"
                    : "text-gray-300 hover:text-white hover:bg-[#2d2d2d]"
                }`}
              >
                {folder}
              </Button>
            </div>
          )
        })}
      </nav>
    </div>
  )
}

