import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-x-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mesh-glow grain-overlay"
      />
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
