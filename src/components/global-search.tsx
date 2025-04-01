"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

export default function GlobalSearch() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(show);
  }, [show]);

  return (
    <div className="w-80 flex justify-center items-center gap-2 relative">
      <Search className="absolute left-4 size-4" />
      <Input
        placeholder="Search"
        className="pl-10"
        onFocus={() => setShow(true)}
      />
    </div>
  );
}
