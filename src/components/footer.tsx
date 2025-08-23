import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Logo from './logo';

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Youtube, href: '#' },
];

const footerLinks = [
  { href: '#', label: 'Audio Description' },
  { href: '#', label: 'Help Center' },
  { href: '#', label: 'Gift Cards' },
  { href: '#', label: 'Media Center' },
  { href: '#', label: 'Investor Relations' },
  { href: '#', label: 'Jobs' },
  { href: '#', label: 'Terms of Use' },
  { href: '#', label: 'Privacy' },
  { href: '#', label: 'Legal Notices' },
  { href: '#', label: 'Cookie Preferences' },
  { href: '#', 'label': 'Corporate Information' },
  { href: '#', 'label': 'Contact Us' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-neutral-400 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex items-center space-x-4 mb-6">
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.href} className="hover:text-white transition-colors">
              <link.icon className="w-6 h-6" />
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm mb-6">
          {footerLinks.map((link, index) => (
            <Link key={index} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} StreamVerse, Inc.
        </p>
      </div>
    </footer>
  );
}
