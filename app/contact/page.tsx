"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-b from-amber-50 to-orange-50 py-12 px-4 pt-24">
      <Card className="w-full max-w-lg shadow-xl border-amber-200">
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
    </div>
  );
} 