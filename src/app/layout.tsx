import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MT5 Trading Platform - Admin Dashboard",
  description: "Professional MetaTrader 5 Trading Platform Administration",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-950">
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <TopBar />
            <div className="p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

function Sidebar() {
  const navItems = [
    { name: "Dashboard", href: "/", icon: "📊" },
    { name: "Clients", href: "/clients", icon: "👥" },
    { name: "Trades", href: "/trades", icon: "💹" },
    { name: "Positions", href: "/positions", icon: "📈" },
    { name: "Symbols", href: "/symbols", icon: "🏷️" },
    { name: "Risk Monitor", href: "/risk", icon: "🛡️" },
    { name: "Financial Ops", href: "/financial", icon: "💰" },
    { name: "Settings", href: "/settings", icon: "⚙️" },
  ];
  return (
    <aside className="w-64 bg-dark-900 border-r border-dark-700 flex flex-col">
      <div className="p-6 border-b border-dark-700">
        <h1 className="text-xl font-bold text-primary-400">MT5 Server</h1>
        <p className="text-xs text-dark-400 mt-1">Trading Platform v1.0</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <a key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-dark-300 hover:bg-dark-800 hover:text-white transition-colors text-sm">
            <span>{item.icon}</span><span>{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-dark-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
          <div><p className="text-sm font-medium text-dark-200">Admin</p><p className="text-xs text-dark-500">Super Administrator</p></div>
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="h-14 border-b border-dark-700 bg-dark-900/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-success-500 text-sm"><span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />Server Online</span>
        <span className="text-dark-500 text-sm">|</span>
        <span className="text-dark-400 text-sm">Uptime: 45d 12h 33m</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-dark-400 text-sm">Connected Clients: 1,247</span>
        <span className="text-dark-400 text-sm">Orders/sec: 342</span>
        <span className="text-warning-500 text-sm">CPU: 23%</span>
      </div>
    </header>
  );
}
