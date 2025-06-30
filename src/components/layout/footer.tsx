import { Logo } from '@/components/logo';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const platformLinks = [
    { href: '/learn', label: 'Learn' },
    { href: '/minigames', label: 'Minigames' },
    { href: '/shop', label: 'Shop' },
  ];

  const resourceLinks = [
    { href: '/support', label: 'Support' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ];

  return (
    <footer className="border-t border-border/10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Making financial literacy intuitive, engaging, and fun for the next generation.
            </p>
          </div>
          <div className="md:col-start-2">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <ul className="mt-4 space-y-2">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              {socialLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/10 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Centsable. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
