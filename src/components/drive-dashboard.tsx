"use client";

import { useState } from "react";
import { FileGrid } from "@/components/file-grid";
import { FileDetailPanel } from "@/components/file-detail-panel";

export function DriveDashboard() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentFolder, setCurrentFolder] = useState("Drive");
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const toggleDetailPanel = (fileId?: string) => {
    if (fileId) {
      setSelectedFile(fileId);
      setCurrentFolder("Drive");
      // setShowDetailPanel(true);
    } else {
      // setShowDetailPanel(!showDetailPanel);
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark bg-[#1e1e1e]">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            <FileGrid
              view={view}
              setView={setView}
              currentFolder={currentFolder}
              onSelectFile={toggleDetailPanel}
              selectedFile={selectedFile}
            />
          </div>
        </main>
        {showDetailPanel && (
          <FileDetailPanel
            onClose={() => setShowDetailPanel(false)}
            fileId={selectedFile}
          />
        )}
      </div>
    </div>
  );
}
