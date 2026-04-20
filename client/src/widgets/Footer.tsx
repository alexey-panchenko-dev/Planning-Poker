export const Footer = () => {
  return (
    <footer className="w-full py-10 mt-auto border-t border-white/5 bg-main-bg relative overflow-hidden">
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <img src="/Logo.svg" alt="IHP Logo" className="h-5" />
          <span className="text-font-main font-bold tracking-wider">IHP</span>
        </div>

        <p className="text-font-muted text-sm text-center max-w-md leading-relaxed">
          Инструмент для эффективного планирования спринтов в атмосфере
          спокойствия и фокуса. Ваш план — наша технология.
        </p>

        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-font-muted">
              System Operational
            </span>
          </div>
          <span className="text-[11px] text-font-muted/50 uppercase tracking-tighter">
            © 2026 I Have a Plan. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
