export function GridBackground({ children }: { children: React.ReactNode }) {
    return (
      <div className="w-full bg-background text-foreground relative flex flex-col items-center justify-center">
        {/* Topography SVG background pattern */}
        <div 
            className="absolute inset-0 w-full h-full bg-primary"
            style={{
              maskImage: 'url(/images/topography.svg)',
              maskRepeat: 'repeat',
              maskSize: 'auto',
              WebkitMaskImage: 'url(/images/topography.svg)',
              WebkitMaskRepeat: 'repeat',
              WebkitMaskSize: 'auto',
            }}
        />
        {/* Radial gradient to fade out the pattern towards the center */}
        <div className="absolute inset-0 bg-background" style={{
            maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 30%, black 80%)',
        }}></div>

        {/* Glowing aura elements */}
        <div className="absolute top-0 left-1/4 h-96 w-96 bg-primary/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-1/4 h-80 w-80 bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 w-full">
            {children}
        </div>
      </div>
    );
  }
  