import { BookOpen, Gamepad2, Trophy } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: BookOpen,
      title: 'Learn',
      description: 'Complete bite-sized, engaging lessons on key financial topics.',
    },
    {
      icon: Gamepad2,
      title: 'Play',
      description: 'Apply your knowledge in fun mini-games that reinforce concepts.',
    },
    {
      icon: Trophy,
      title: 'Master',
      description: 'Track your progress, earn achievements, and grow your confidence.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black font-headline">A Simple Path to Mastery</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Learn, play, and master your finances in three easy steps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-card border border-border/10 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary">
                  <step.icon className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold font-headline">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
