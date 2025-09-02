import React from "react";
import { siteConfig } from "../lib/site";

export default function Footer() {
  const s = siteConfig;

  return (
    <>
      <div className="w-full flex justify-center py-6 bg-transparent">
        {/* Elfsight Google Reviews Widget */}
        <div className={`elfsight-app-${s.elfsightAppId}`} data-elfsight-app-lazy></div>
      </div>
      <footer className="bg-gray-900 text-white py-10 mt-12 border-t border-amber-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand/Info */}
          <div className="flex-1 flex flex-col items-start mb-8 md:mb-0">
            <span className="text-lg font-bold tracking-wide mb-1">{s.name}</span>
            <span className="text-sm text-gray-400 mb-2">{s.tagline}</span>
            <span className="text-xs text-gray-500">© {new Date().getFullYear()} {s.name}. All rights reserved.</span>
          </div>
          {/* Quick Links */}
          <div className="flex-1 flex flex-col mb-8 md:mb-0">
            <span className="font-semibold text-base mb-3">Quick Links</span>
            <ul className="space-y-1 text-sm">
              {s.quickLinks.map((l: { href: string; label: string }) => (
                <li key={l.href}><a href={l.href} className="hover:text-amber-400 transition">{l.label}</a></li>
              ))}
            </ul>
          </div>
          {/* Policy Links */}
          <div className="flex-1 flex flex-col mb-8 md:mb-0">
            <span className="font-semibold text-base mb-3">Policy</span>
            <ul className="space-y-1 text-sm">
              {s.policyLinks.map((l: { href: string; label: string }) => (
                <li key={l.href}><a href={l.href} className="hover:text-amber-400 transition">{l.label}</a></li>
              ))}
            </ul>
          </div>
          {/* Contact/Payment */}
          <div className="flex-1 flex flex-col items-start md:items-end gap-2">
            <span className="font-semibold text-base mb-3">Contact</span>
            <span className="text-sm">Phone: <a href={`tel:${s.phone}`} className="text-amber-400 hover:underline ml-1">{s.phoneDisplay || s.phone}</a></span>
            <span className="text-sm">Email: <a href={`mailto:${s.email}`} className="text-amber-400 hover:underline ml-1">{s.email}</a></span>
            <div className="flex gap-3 mt-2">
              <a href={`https://wa.me/${s.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-400 transition"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 2.01.594 3.885 1.617 5.462L2 22l4.685-1.23A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.062-1.12l-.29-.17-2.782.73.74-2.71-.18-.28A7.952 7.952 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.07-6.75c-.22-.11-1.04-.51-1.2-.57-.16-.06-.28-.09-.4.09-.12.18-.46.57-.56.69-.1.12-.2.14-.37.05-.17-.09-.73-.27-1.39-.85-.51-.45-.86-1-1-1.17-.14-.17-.02-.26.08-.34.09-.09.2-.22.3-.36.1-.14.13-.24.2-.4.07-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.44-.38-.38-.52-.39l-.44-.01c-.14 0-.37.05-.56.22-.19.17-.72.67-.72 1.63 0 .96.74 1.89.84 2.02.1.13 1.45 2.21 3.51 3.02.49.17.87.27 1.17.34.49.12.94.1 1.3.06.4-.05 1.34-.54 1.53-1.06.19-.52.19-.97.13-1.06-.06-.09-.2-.15-.44-.26z"/></svg></a>
              <a href={`mailto:${s.email}`} aria-label="Email" className="hover:text-amber-400 transition"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z"/></svg></a>
            </div>
          </div>
        </div>
  </footer>
    </>
  );
}