"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertCircle,
  Clock,
  Cloud,
  Computer,
  HardDrive,
  LucideImages,
  PlusCircle,
  Share2,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

interface SidebarProps {
  currentFolder: string;
  setCurrentFolder: (folder: string) => void;
}

export function Sidebar({ currentFolder, setCurrentFolder }: SidebarProps) {
  const mainNavItems = [
    {
      name: "My Drive",
      icon: <HardDrive className="h-4 w-4" />,
    },
    {
      name: "Computers",
      icon: <Computer className="h-4 w-4" />,
    },
    {
      name: "Shared with me",
      icon: <Share2 className="h-4 w-4" />,
    },
    {
      name: "Recent",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      name: "Starred",
      icon: <Star className="h-4 w-4" />,
    },
    {
      name: "Trash",
      icon: <Trash2 className="h-4 w-4" />,
    },
  ];

  const secondaryNavItems = [
    {
      name: "Priority",
      icon: <AlertCircle className="h-4 w-4" />,
    },
    {
      name: "Shared drives",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  const labels = [
    { name: "Documents", color: "#4285f4" },
    { name: "Finance", color: "#0f9d58" },
    { name: "Personal", color: "#fbbc04" },
    { name: "Work", color: "#ea4335" },
  ];

  // Used GB calculation
  const totalStorage = 15; // GB
  const usedStorage = 6.43; // GB
  const usedPercentage = (usedStorage / totalStorage) * 100;
  // const remainingStorage = totalStorage - usedStorage;

  return (
    <div className="hidden md:flex w-64 flex-col border-r border-[#333] bg-[#1e1e1e] p-3">
      <Button
        className="mb-6 gap-2 justify-start px-6 bg-white/10 hover:bg-white/20 text-white rounded-full shadow-sm h-12"
        onClick={() => {}}
      >
        <PlusCircle className="h-5 w-5" />
        <span>New</span>
      </Button>

      <ScrollArea className="flex-1 -mr-4 pr-4">
        <nav className="grid gap-1 px-2">
          {mainNavItems.map((item) => (
            <Button
              key={item.name}
              variant={currentFolder === item.name ? "secondary" : "ghost"}
              className={`justify-start gap-3 h-10 px-3 ${
                currentFolder === item.name
                  ? "bg-[#414141] text-white hover:bg-[#4c4c4c]"
                  : "text-gray-300 hover:text-white hover:bg-[#2d2d2d]"
              }`}
              onClick={() => setCurrentFolder(item.name)}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Button>
          ))}

          <div className="my-2 border-t border-[#333]" />

          {secondaryNavItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="justify-start gap-3 h-10 px-3 text-gray-300 hover:text-white hover:bg-[#2d2d2d]"
              onClick={() => setCurrentFolder(item.name)}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Button>
          ))}

          <div className="my-2 border-t border-[#333]" />

          <div className="px-3 py-1 text-xs font-medium text-gray-400">
            LABELS
          </div>

          {labels.map((label) => (
            <Button
              key={label.name}
              variant="ghost"
              className="justify-start gap-3 h-10 px-3 text-gray-300 hover:text-white hover:bg-[#2d2d2d]"
              onClick={() => setCurrentFolder(label.name)}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: label.color }}
              />
              <span className="text-sm">{label.name}</span>
            </Button>
          ))}

          <div className="py-4">
            <Button
              variant="ghost"
              className="justify-start w-full gap-2 h-8 px-3 text-gray-300 hover:text-white hover:bg-[#2d2d2d]"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="text-sm">Create new label</span>
            </Button>
          </div>
        </nav>
      </ScrollArea>

      <div className="mt-auto p-3 bg-[#2d2d2d] rounded-lg">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Cloud className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-xs text-gray-300">Storage</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-[#414141]"
                >
                  <LucideImages className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Buy storage</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Progress value={usedPercentage} className="h-1.5 mb-2" />

        <div className="text-xs text-gray-400">
          <p>
            {usedStorage.toFixed(2)} GB of {totalStorage} GB used
          </p>
          <Button
            variant="link"
            className="h-auto p-0 text-xs text-[#4285f4] hover:text-[#5a9dff] mt-1"
          >
            Buy storage
          </Button>
        </div>
      </div>
    </div>
  );
}
