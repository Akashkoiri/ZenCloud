"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarClock,
  Clock,
  Download,
  ExternalLink,
  FileIcon,
  Link,
  Share2,
  UserPlus,
  X,
} from "lucide-react";
import type { FileItem } from "./file-grid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface FileDetailPanelProps {
  onClose: () => void;
  fileId: string | null;
}

export function FileDetailPanel({ onClose, fileId }: FileDetailPanelProps) {
  // In a real application, you would fetch this data based on the fileId
  const mockFile: FileItem = {
    id: fileId || "",
    name: "Q1 Report 2025.docx",
    type: "doc",
    size: "2.4 MB",
    modified: "Mar 25, 2025",
    modifiedTime: "3:20 PM",
    owner: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
    },
    shared: true,
    starred: true,
    thumbnail: "/placeholder.svg?height=400&width=300",
  };

  const sharedWith = [
    {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Editor",
    },
    {
      name: "Alex Chen",
      email: "alex.c@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Viewer",
    },
    {
      name: "Maria Garcia",
      email: "maria.g@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Commenter",
    },
  ];

  return (
    <div className="w-96 border-l border-[#333] bg-[#1e1e1e] flex flex-col h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between border-b border-[#333] p-4">
        <h2 className="text-sm font-medium text-gray-200">Details</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="aspect-video bg-[#2d2d2d] rounded-md overflow-hidden mb-4 relative">
            <Image
              src={mockFile.thumbnail || "/placeholder.svg"}
              alt={mockFile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <FileIcon className="h-16 w-16 text-[#4285f4]" />
            </div>
          </div>

          <h1 className="text-lg font-medium text-gray-100 mb-1">
            {mockFile.name}
          </h1>
          <p className="text-sm text-gray-400 mb-4">{mockFile.size}</p>

          <div className="grid grid-cols-2 gap-2 mb-6">
            <Button className="w-full gap-2 bg-[#2d2d2d] hover:bg-[#3a3a3a] text-gray-200">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
            <Button className="w-full gap-2 bg-[#2d2d2d] hover:bg-[#3a3a3a] text-gray-200">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full bg-[#2d2d2d]">
              <TabsTrigger
                value="details"
                className="flex-1 data-[state=active]:bg-[#4285f4]"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="flex-1 data-[state=active]:bg-[#4285f4]"
              >
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-400 mb-2">
                    General
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Type</span>
                      <span className="text-xs text-gray-200">
                        Microsoft Word Document
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Size</span>
                      <span className="text-xs text-gray-200">
                        {mockFile.size}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Location</span>
                      <span className="text-xs text-gray-200">My Drive</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Owner</span>
                      <span className="text-xs text-gray-200">
                        {mockFile.owner.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Modified</span>
                      <span className="text-xs text-gray-200">
                        {mockFile.modified}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Created</span>
                      <span className="text-xs text-gray-200">
                        Mar 15, 2025
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-400 mb-2">
                    Description
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-sm text-gray-400 border-dashed border-gray-600 h-auto py-2"
                  >
                    <span>Add a description</span>
                  </Button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-medium text-gray-400">
                      Who has access
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-[#4285f4] hover:text-[#5a9dff] hover:bg-[#2d2d2d]"
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      <span>Share</span>
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 hover:bg-[#2d2d2d] rounded-md">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={mockFile.owner.avatar}
                            alt="Avatar"
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-medium text-gray-200">
                            {mockFile.owner.name} (you)
                          </p>
                          <p className="text-xs text-gray-400">
                            john.doe@example.com
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">Owner</span>
                    </div>

                    {sharedWith.map((person, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-[#2d2d2d] rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={person.avatar} alt="Avatar" />
                            <AvatarFallback>
                              {person.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-medium text-gray-200">
                              {person.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {person.email}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {person.role}
                        </span>
                      </div>
                    ))}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm text-gray-400 h-8"
                    >
                      <Link className="h-4 w-4 mr-1" />
                      <span>Copy link</span>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-[#333]">
                  <CalendarClock className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-200">
                      You created this item
                    </h3>
                    <p className="text-xs text-gray-400">
                      Mar 15, 2025 at 10:15 AM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-[#333]">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-200">
                      You modified this item
                    </h3>
                    <p className="text-xs text-gray-400">
                      Mar 25, 2025 at 3:20 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-[#333]">
                  <UserPlus className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-200">
                      You shared with Sarah Johnson
                    </h3>
                    <p className="text-xs text-gray-400">
                      Mar 20, 2025 at 11:45 AM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-[#333]">
                  <ExternalLink className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-200">
                      Sarah Johnson opened this item
                    </h3>
                    <p className="text-xs text-gray-400">
                      Mar 22, 2025 at 2:30 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <UserPlus className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-200">
                      You shared with Alex Chen
                    </h3>
                    <p className="text-xs text-gray-400">
                      Mar 24, 2025 at 9:10 AM
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
