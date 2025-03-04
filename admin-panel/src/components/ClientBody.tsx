"use client"; // ✅ Marks this as a Client Component

import { useEffect, useState } from "react";

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const [bodyClass, setBodyClass] = useState("bg-background text-primary");

  useEffect(() => {
    setBodyClass(document.body.className); // ✅ Fixes hydration issue
  }, []);

  return <body className={bodyClass}>{children}</body>;
}
