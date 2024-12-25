import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen">
      Sidebar
      <section className="flex h-full flex-1 flex-col">
        Mobile navigation Header
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
}
