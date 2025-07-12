"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-[60vh] bg-gradient-to-b from-amber-50 to-orange-50 py-12 px-4 pt-24 gap-8">
      {/* Contact Form Card */}
      <Card className="w-full max-w-lg shadow-xl border-amber-200 order-2 md:order-1">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-amber-700 text-center">Contact Us</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} autoComplete="off">
          <CardContent className="space-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Type your message here..."
                className="mt-1"
              />
            </div>
            {status === 'success' && (
              <div className="text-green-600 text-center font-medium">Thank you! Your message has been sent.</div>
            )}
            {status === 'error' && (
              <div className="text-red-600 text-center font-medium">Something went wrong. Please try again.</div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              type="submit"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-2 rounded-full shadow-lg"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      {/* Contact Info Card */}
      <div className="w-full max-w-md bg-amber-100 text-amber-900 rounded-2xl shadow-xl p-8 mb-8 md:mb-0 md:ml-4 flex flex-col justify-between order-1 md:order-2">
        <div>
          <div className="text-2xl italic mb-2">Contact us</div>
          <div className="text-3xl font-bold mb-2">Jee Ri Haveli</div>
          <div className="mb-2">Near Rajmahal Sr. Hr. Sec. School,<br/>Gulab Sagar,<br/>Jodhpur (Rajasthan) India</div>
          <div className="mb-2">Ph. <a href="tel:+912912540007" className="underline hover:text-orange-600">+91-291-2540007</a></div>
          <div className="mb-2">(M) <a href="tel:+919351722007" className="underline hover:text-orange-600">+91-93517-22007</a>, <a href="tel:+919351733007" className="underline hover:text-orange-600">+91 9351733007</a></div>
          <div className="mb-2">(M) <a href="tel:+916375144341" className="underline hover:text-orange-600">+91-6375144341</a></div>
          <div className="mb-2">Email: <a href="mailto:info@jeerihaveli.com" className="underline hover:text-orange-600">info@jeerihaveli.com</a></div>
          <div className="mb-4">Website: <a href="http://www.jeerihaveli.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-600">http://www.jeerihaveli.com</a></div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Image src="/images/credit-card-logos.png" alt="Payment Methods" width={220} height={40} className="object-contain" />
        </div>
      </div>
    </div>
  );
} 