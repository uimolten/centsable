export function GridBackground({ children }: { children: React.ReactNode }) {
    return (
      <div className="w-full bg-background text-foreground bg-grid-white/[0.05] relative flex flex-col items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_top,transparent_20%,black)]"></div>
        {/* Glowing aura */}
        <div className="absolute top-0 left-1/4 h-96 w-96 bg-primary/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-1/4 h-80 w-80 bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 w-full">
            {children}
        </div>
      </div>
    );
  }
  