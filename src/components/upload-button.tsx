import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileUp, FolderUp, Upload } from "lucide-react"

export function UploadButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="gap-1">
          <Upload className="h-4 w-4" />
          <span>Upload</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <FileUp className="mr-2 h-4 w-4" />
          <span>File upload</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FolderUp className="mr-2 h-4 w-4" />
          <span>Folder upload</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

