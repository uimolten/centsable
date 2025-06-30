export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl font-bold font-headline">Terms of Service</h1>
      <div className="mt-8 prose prose-invert max-w-none text-muted-foreground">
        <p>This is a placeholder for your Terms of Service.</p>
        <p>Your Terms of Service (ToS) is a legal agreement between you and the user. It outlines the rules and guidelines for using your app.</p>
        <h2>Key Sections to Include:</h2>
        <ul>
          <li><strong>Acceptance of Terms:</strong> A statement that using the app constitutes acceptance of the terms.</li>
          <li><strong>User Accounts:</strong> Rules regarding account creation, responsibilities, and termination.</li>
          <li><strong>User Conduct:</strong> Prohibited activities and content.</li>
          <li><strong>Intellectual Property:</strong> Clarification on who owns the content on the app (both yours and user-generated).</li>
          <li><strong>Disclaimers and Limitation of Liability:</strong> Legal disclaimers to limit your liability.</li>
          <li><strong>Governing Law:</strong> The jurisdiction that governs the agreement.</li>
        </ul>
        <p>Please replace this placeholder with a complete and legally sound Terms of Service agreement before launching your application.</p>
      </div>
    </div>
  );
}
