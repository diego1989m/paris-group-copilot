import Link from "next/link";
import type { ReactNode } from "react";

// Layout compartilhado: header + navegação, reutilizado por todas as
// páginas de projetos sem duplicar código (composição de componentes).
export interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200">
        <nav className="mx-auto flex max-w-3xl items-center gap-6 p-4">
          <span className="font-bold">Paris Group Copilot</span>
          <Link href="/projects" className="text-sm underline">
            Projetos
          </Link>
          <Link href="/decisoes" className="text-sm underline">
            Decisões
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl p-6">{children}</main>
    </div>
  );
}
