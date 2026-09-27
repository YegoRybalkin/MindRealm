"use client";

import { Toaster } from "sonner";
import { MemoryStoreProvider } from "@/lib/store/MemoryStore";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MemoryStoreProvider>
      {children}
      <Toaster theme="dark" position="bottom-center" visibleToasts={1} toastOptions={{ className: "!rounded-xl !font-sans", duration: 2600 }} />
    </MemoryStoreProvider>
  );
}
