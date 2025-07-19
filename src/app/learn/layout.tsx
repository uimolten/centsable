// This layout applies to all pages within the /learn directory
// It's a simple passthrough to prevent the main site Header and Footer from rendering on these pages.
export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
