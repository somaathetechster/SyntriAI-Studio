export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {children}
    </div>
  );
}
