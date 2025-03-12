// src/components/VSCodeClassFixer.tsx
"use client";

import { useEffect } from 'react';

export default function VSCodeClassFixer() {
  useEffect(() => {
    // If the body has VSCode's class, store it and restore after hydration
    const hasVscClass = document.body.classList.contains('vsc-initialized');
    if (hasVscClass) {
      document.body.classList.remove('vsc-initialized');
      // Re-add it after hydration is complete
      setTimeout(() => {
        document.body.classList.add('vsc-initialized');
      }, 0);
    }
  }, []);
  
  return null;
}