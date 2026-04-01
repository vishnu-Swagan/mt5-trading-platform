"use client";
import { useState, useEffect } from "react";

const kpiData = [
  { label: "Total Accounts", value: "12,847", change: "+124", up: true, icon: "👥" },
  { label: "Active Traders", value: "3,421", change: "+67", up: true, icon: "📈" },
  { label: "Open Positions", value: "18,293", change: "-231", up: false, icon: "💹" },
  { label: "Total Volume (24h)", value: "$847.2M", change: "+12.4%", up: true, icon: "💰" },
  { label: "Total Deposits", value: "$2.34M", change: "+$234K", up: true, icon: "🏦" },
  { label: "Net P&L (Platform)", value: "$1.23M", change: "+8.7%", up: true, icon: "📊" },
];

const recentTrades = [
  { id: "T-847291", symbol: "EURUSD", type: "BUY", volume: "2.50", price: "1.08432", profit: "+$342.50", time: "2s ago" },
  { id: "T-847290", symbol: "GBPUSD", type: "SELL", volume: "1.00", price: "1.26891", profit: "-$127.30", time: "5s ago" },
  { id: "T-847289", symbol: "XAUUSD", type: "BUY", volume: "0.50", price: "2,341.50", profit: "+$89.00", time: "8s ago" },
  { id: "T-847288", symbol: "USDJPY", type: "SELL", volume: "3.00", price: "149.234", profit: "+$567.20", time: "12s ago" },
  { id: "T-847287", symbol: "BTCUSD", type: "BUY", volume: "0.10", price: "67,432.00", profit: "-$234.10", time: "15s ago" },
];

const topSymbols = [
  { symbol: "EURUSD", bid: "1.08432", ask: "1.08435", spread: "0.3", volume: "$234M", change: "+0.12%" },
  { symbol: "GBPUSD", bid: "1.26891", ask: "1.26895", spread: "0.4", volume: "$187M", change: "-0.08%" },
  { symbol: "USDJPY", bid: "149.234", ask: "149.237", spread: "0.3", volume: "$312M", change: "+0.34%" },
  { symbol: "XAUUSD", bid: "2341.50", ask: "2341.80", spread: "3.0", volume: "$89M", change: "+1.23%" },
  { symbol: "BTCUSD", bid: "67432.0", ask: "67435.0", spread: "30", volume: "$56M", change: "+2.45%" },
];

const riskAlerts = [
  { level: "HIGH", message: "Account #45892 margin level at 112%", time: "1m ago" },
  { level: "MEDIUM", message: "Volume spike on XAUUSD - 340% above avg", time: "5m ago" },
  { level: "LOW", message: "LP latency increased to 45ms", time: "12m ago" },
  { level: "HIGH", message: "B-Book exposure on EURUSD exceeds $2.1M", time: "18m ago" },
];

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Trading Platform Dashboard</h1><p className="text-dark-400 text-sm mt-1">Real-time overview of your MT5 server</p></div>
        <div className="text-right"><p className="text-lg font-mono text-primary-400">{time.toLocaleTimeString()}</p><p className="text-xs text-dark-500">{time.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi) => (
          <div key={kpi.label} className="card">
            <div className="flex items-center justify-between mb-2"><span className="text-2xl">{kpi.icon}</span><span className={kpi.up ? "stat-up text-xs font-medium" : "stat-down text-xs font-medium"}>{kpi.change}</span></div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <p className="text-xs text-dark-400 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-white">Recent Trades (Live)</h2><span className="flex items-center gap-1 text-success-500 text-xs"><span className="w-1.5 h-1.5 bg-success-500 rounded-full animate-pulse" />Streaming</span></div>
          <table className="w-full text-sm"><thead><tr className="text-dark-400 text-xs uppercase border-b border-dark-700"><th className="text-left py-3 px-2">ID</th><th className="text-left py-3 px-2">Symbol</th><th className="text-left py-3 px-2">Type</th><th className="text-right py-3 px-2">Volume</th><th className="text-right py-3 px-2">Price</th><th className="text-right py-3 px-2">Profit</th><th className="text-right py-3 px-2">Time</th></tr></thead>
          <tbody>{recentTrades.map((t) => (<tr key={t.id} className="table-row"><td className="py-2.5 px-2 font-mono text-dark-300">{t.id}</td><td className="py-2.5 px-2 font-medium text-white">{t.symbol}</td><td className="py-2.5 px-2"><span className={t.type==="BUY"?"badge-success":"badge-danger"}>{t.type}</span></td><td className="py-2.5 px-2 text-right font-mono">{t.volume}</td><td className="py-2.5 px-2 text-right font-mono">{t.price}</td><td className={"py-2.5 px-2 text-right font-mono "+(t.profit.startsWith("+")?  "stat-up":"stat-down")}>{t.profit}</td><td className="py-2.5 px-2 text-right text-dark-400">{t.time}</td></tr>))}</tbody></table>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Risk Alerts</h2>
          <div className="space-y-3">{riskAlerts.map((a, i) => (<div key={i} className={"p-3 rounded-lg border "+(a.level==="HIGH"?"border-danger-500/30 bg-danger-500/5":a.level==="MEDIUM"?"border-warning-500/30 bg-warning-500/5":"border-dark-600 bg-dark-800")}><div className="flex items-center justify-between mb-1"><span className={"text-xs font-bold "+(a.level==="HIGH"?"text-danger-500":a.level==="MEDIUM"?"text-warning-500":"text-dark-400")}>{a.level}</span><span className="text-xs text-dark-500">{a.time}</span></div><p className="text-xs text-dark-300">{a.message}</p></div>))}</div>
        </div>
      </div>
      <div className="card">
        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-white">Market Watch</h2><span className="text-xs text-dark-400">LP aggregated pricing</span></div>
        <table className="w-full text-sm"><thead><tr className="text-dark-400 text-xs uppercase border-b border-dark-700"><th className="text-left py-3 px-4">Symbol</th><th className="text-right py-3 px-4">Bid</th><th className="text-right py-3 px-4">Ask</th><th className="text-right py-3 px-4">Spread</th><th className="text-right py-3 px-4">Volume</th><th className="text-right py-3 px-4">Change</th></tr></thead>
        <tbody>{topSymbols.map((s) => (<tr key={s.symbol} className="table-row"><td className="py-3 px-4 font-bold text-white">{s.symbol}</td><td className="py-3 px-4 text-right font-mono text-success-500">{s.bid}</td><td className="py-3 px-4 text-right font-mono text-danger-500">{s.ask}</td><td className="py-3 px-4 text-right font-mono text-dark-300">{s.spread}</td><td className="py-3 px-4 text-right text-dark-300">{s.volume}</td><td className={"py-3 px-4 text-right font-medium "+(s.change.startsWith("+")?  "stat-up":"stat-down")}>{s.change}</td></tr>))}</tbody></table>
      </div>
    </div>
  );
}
