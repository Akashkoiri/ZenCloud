"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/modal";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FileUpload } from "./ui/file-upload";

export function AnimatedModal() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileSubmit = () => {
    // TODO: Submit the files to backend
    console.log(files);
    setFiles([]);
  };

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="group/modal-btn">
          <Plus />
          New
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <div className="h-100 flex justify-center items-center">
              <FileUpload files={files} setFiles={setFiles} />
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-24 cursor-pointer"
              onClick={() => setFiles([])}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-24 cursor-pointer"
              onClick={handleFileSubmit}
            >
              Upload
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
