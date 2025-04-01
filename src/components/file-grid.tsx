"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Icons
import {
  Download,
  FileIcon,
  FileImage,
  FileIcon as FilePdf,
  FileText,
  Folder,
  FolderOpen,
  Grid,
  LinkIcon,
  List,
  MoreVertical,
  Play,
  Share2,
  Star,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { Breadcrumb } from "./breadcrumb";

type props = {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  currentFolder: string;
  onSelectFile: (fileId: string) => void;
  selectedFile: string | null;
};

type FileType =
  | "folder"
  | "pdf"
  | "doc"
  | "sheet"
  | "slide"
  | "image"
  | "video"
  | "audio"
  | "other";

export type FileItem = {
  id: string;
  name: string;
  type: FileType;
  size?: string;
  modified: string;
  modifiedTime: string;
  owner: {
    name: string;
    avatar?: string;
  };
  shared?: boolean;
  starred: boolean;
  thumbnail?: string;
  color?: string;
};

export function FileGrid({
  view,
  setView,
  currentFolder,
  onSelectFile,
  selectedFile,
}: props) {
  // Mock data - in a real app this would come from an API
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "folder-1",
      name: "Projects",
      type: "folder",
      modified: "Apr 1, 2025",
      modifiedTime: "2:35 PM",
      owner: {
        name: "Me",
      },
      shared: true,
      starred: false,
      color: "#4285f4",
    },
    {
      id: "folder-2",
      name: "Personal",
      type: "folder",
      modified: "Mar 28, 2025",
      modifiedTime: "10:12 AM",
      owner: {
        name: "Me",
      },
      shared: false,
      starred: true,
      color: "#0f9d58",
    },
    {
      id: "folder-3",
      name: "Shared with team",
      type: "folder",
      modified: "Mar 25, 2025",
      modifiedTime: "1:45 PM",
      owner: {
        name: "Me",
      },
      shared: true,
      starred: true,
      color: "#fbbc04",
    },
    {
      id: "doc-1",
      name: "Q1 Report 2025.docx",
      type: "doc",
      size: "2.4 MB",
      modified: "Mar 25, 2025",
      modifiedTime: "3:20 PM",
      owner: {
        name: "Me",
      },
      shared: true,
      starred: true,
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "sheet-1",
      name: "Financial Projections.xlsx",
      type: "sheet",
      size: "1.8 MB",
      modified: "Mar 20, 2025",
      modifiedTime: "11:32 AM",
      owner: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      shared: true,
      starred: false,
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "slide-1",
      name: "Quarterly Presentation.pptx",
      type: "slide",
      size: "5.2 MB",
      modified: "Mar 15, 2025",
      modifiedTime: "9:45 AM",
      owner: {
        name: "Me",
      },
      shared: false,
      starred: false,
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "image-1",
      name: "Team Photo.jpg",
      type: "image",
      size: "3.1 MB",
      modified: "Mar 10, 2025",
      modifiedTime: "2:15 PM",
      owner: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      shared: true,
      starred: false,
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "pdf-1",
      name: "User Research Report.pdf",
      type: "pdf",
      size: "2.8 MB",
      modified: "Mar 5, 2025",
      modifiedTime: "4:50 PM",
      owner: {
        name: "Me",
      },
      shared: false,
      starred: false,
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "doc-2",
      name: "Meeting Notes.docx",
      type: "doc",
      size: "0.5 MB",
      modified: "Mar 1, 2025",
      modifiedTime: "11:23 AM",
      owner: {
        name: "Me",
      },
      shared: true,
      starred: false,
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "video-1",
      name: "Product Demo.mp4",
      type: "video",
      size: "128.5 MB",
      modified: "Feb 25, 2025",
      modifiedTime: "3:45 PM",
      owner: {
        name: "Me",
      },
      shared: false,
      starred: false,
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "pdf-2",
      name: "Design Guidelines.pdf",
      type: "pdf",
      size: "4.2 MB",
      modified: "Feb 20, 2025",
      modifiedTime: "10:15 AM",
      owner: {
        name: "Me",
      },
      shared: false,
      starred: true,
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "audio-1",
      name: "Interview Recording.mp3",
      type: "audio",
      size: "12.8 MB",
      modified: "Feb 15, 2025",
      modifiedTime: "1:30 PM",
      owner: {
        name: "Me",
      },
      shared: false,
      starred: false,
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles(
      files.map((file) =>
        file.id === id ? { ...file, starred: !file.starred } : file
      )
    );
  };

  const clearSelection = () => {
    setSelectedItems({});
  };

  const getFileIcon = (type: string, color?: string) => {
    const iconSize = "h-6 w-6";

    if (type === "folder")
      return (
        <Folder
          className={`${iconSize} ${color ? "" : "text-[#4285f4]"}`}
          style={color ? { color } : {}}
        />
      );
    if (type === "pdf")
      return <FilePdf className={`${iconSize} text-[#ea4335]`} />;
    if (type === "doc")
      return <FileText className={`${iconSize} text-[#4285f4]`} />;
    if (type === "sheet")
      return <FileText className={`${iconSize} text-[#0f9d58]`} />;
    if (type === "slide")
      return <FileText className={`${iconSize} text-[#fbbc04]`} />;
    if (type === "image")
      return <FileImage className={`${iconSize} text-[#4285f4]`} />;
    if (type === "video")
      return <Play className={`${iconSize} text-red-500`} />;
    if (type === "audio")
      return <FileIcon className={`${iconSize} text-purple-500`} />;
    return <FileIcon className={`${iconSize} text-gray-500`} />;
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between item-center mb-4 ">
        <Breadcrumb currentFolder={currentFolder} />
        <div className="border border-[#333] rounded-md overflow-hidden">
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="sm"
            className={`h-8 w-8 p-0 rounded-none ${
              view === "grid"
                ? "bg-[#414141] text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setView("grid")}
          >
            <Grid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="sm"
            className={`h-8 w-8 p-0 rounded-none ${
              view === "list"
                ? "bg-[#414141] text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="sticky top-0 z-10 mb-2 flex items-center justify-between bg-[#2d2d2d] px-4 py-2 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-gray-400 hover:text-white"
              onClick={clearSelection}
            >
              <X className="h-5 w-5" />
            </Button>
            <span className="text-sm text-gray-200">
              {selectedCount} selected
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    <Star className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Star</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}

      {view === "grid" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {files.map((file) => (
            <Card
              key={file.id}
              className={`overflow-hidden border-[#333] bg-[#2d2d2d] transition-all hover:bg-[#3a3a3a] ${
                selectedItems[file.id] ? "ring-2 ring-[#4285f4]" : ""
              } ${selectedFile === file.id ? "ring-2 ring-[#4285f4]" : ""}`}
              onClick={() => onSelectFile(file.id)}
            >
              <div className="relative">
                {file.type === "folder" ? (
                  <div
                    className="h-full w-full aspect-video flex items-center justify-center"
                    style={{ backgroundColor: file.color || "#4285f4" }}
                  >
                    <FolderOpen className="h-16 w-16 text-white" />
                  </div>
                ) : (
                  <div className="aspect-video bg-[#3a3a3a] relative overflow-hidden">
                    {file.thumbnail ? (
                      <img
                        src={file.thumbnail || "/placeholder.svg"}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>
                )}

                <div className="absolute top-2 left-2">
                  <Checkbox
                    checked={selectedItems[file.id] || false}
                    onCheckedChange={() => {}}
                    onClick={(e) => toggleSelect(file.id, e)}
                    className={`h-5 w-5 ${
                      selectedItems[file.id]
                        ? "bg-[#4285f4] border-[#4285f4]"
                        : "border-gray-500 bg-transparent data-[state=checked]:bg-[#4285f4] data-[state=checked]:border-[#4285f4]"
                    } opacity-${
                      selectedItems[file.id] ? "100" : "0"
                    } group-hover:opacity-100 transition-opacity`}
                  />
                </div>

                {file.shared && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-[#2d2d2d] p-1 rounded-full">
                      <UserPlus className="h-3.5 w-3.5 text-gray-300" />
                    </div>
                  </div>
                )}
              </div>

              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 max-w-[80%]">
                    <div className="flex-shrink-0 mt-0.5">
                      {getFileIcon(file.type, file.color)}
                    </div>
                    <div>
                      <div className="font-medium text-sm truncate text-gray-200">
                        {file.name}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-gray-400">
                          {file.modified}
                        </span>
                        {file.owner.name !== "Me" && (
                          <span className="text-xs text-gray-400">
                            • {file.owner.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-gray-400 hover:text-yellow-400"
                      onClick={(e) => toggleStar(file.id, e)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          file.starred ? "fill-yellow-400 text-yellow-400" : ""
                        }`}
                      />
                      <span className="sr-only">Star</span>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-gray-400 hover:text-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <LinkIcon className="mr-2 h-4 w-4" />
                          <span>Get link</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(file.id, e);
                          }}
                        >
                          <Star
                            className={`mr-2 h-4 w-4 ${
                              file.starred
                                ? "fill-yellow-400 text-yellow-400"
                                : ""
                            }`}
                          />
                          <span>{file.starred ? "Unstar" : "Star"}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Remove</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-[#333] bg-[#2d2d2d] overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 p-3 text-xs font-medium text-gray-400 border-b border-[#333]">
            <div className="pl-2"></div>
            <div>Name</div>
            <div>Owner</div>
            <div>Last modified</div>
            <div>File size</div>
          </div>
          <div>
            {files.map((file) => (
              <div
                key={file.id}
                className={`grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-2 p-3 hover:bg-[#3a3a3a] cursor-pointer border-b border-[#333] last:border-b-0 transition-colors ${
                  selectedItems[file.id] ? "bg-[#3a3a3a]" : ""
                } ${selectedFile === file.id ? "bg-[#3a3a3a]" : ""}`}
                onClick={() => onSelectFile(file.id)}
              >
                <div className="flex items-center gap-2 pl-2">
                  <Checkbox
                    checked={selectedItems[file.id] || false}
                    onCheckedChange={() => {}}
                    onClick={(e) => toggleSelect(file.id, e)}
                    className={`h-4 w-4 ${
                      selectedItems[file.id]
                        ? "bg-[#4285f4] border-[#4285f4]"
                        : "border-gray-500 bg-transparent data-[state=checked]:bg-[#4285f4] data-[state=checked]:border-[#4285f4]"
                    }`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-yellow-400"
                    onClick={(e) => toggleStar(file.id, e)}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        file.starred ? "fill-yellow-400 text-yellow-400" : ""
                      }`}
                    />
                    <span className="sr-only">Star</span>
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {getFileIcon(file.type, file.color)}
                  </div>
                  <div className="text-sm text-gray-200 font-medium truncate max-w-xs">
                    {file.name}
                  </div>
                  {file.shared && (
                    <UserPlus className="h-3.5 w-3.5 text-gray-400" />
                  )}
                </div>

                <div className="text-xs text-gray-400 min-w-[100px]">
                  {file.owner.name}
                </div>

                <div className="text-xs text-gray-400 whitespace-nowrap min-w-[150px]">
                  {file.modified} at {file.modifiedTime}
                </div>

                <div className="flex items-center justify-between min-w-[100px]">
                  <span className="text-xs text-gray-400">
                    {file.size || "—"}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 p-0 text-gray-400 hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(file.id, e);
                        }}
                      >
                        <Star
                          className={`mr-2 h-4 w-4 ${
                            file.starred
                              ? "fill-yellow-400 text-yellow-400"
                              : ""
                          }`}
                        />
                        <span>{file.starred ? "Unstar" : "Star"}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Remove</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
