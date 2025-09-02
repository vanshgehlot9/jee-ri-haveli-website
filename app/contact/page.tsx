"use client"

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
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
    <motion.div className="flex flex-col md:flex-row justify-center items-center min-h-[60vh] bg-gradient-to-b from-amber-50 to-orange-50 py-12 px-2 sm:px-4 pt-24 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      {/* Contact Form Card */}
      <motion.div className="w-full max-w-lg order-2 md:order-1 mx-auto" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
        <Card>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="p-6 space-y-4 sm:space-y-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Your Name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} required placeholder="Subject" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Type your message here..." className="mt-1" />
              </div>
              {status === 'success' && (
                <div className="text-green-600 text-center font-medium">Thank you! Your message has been sent.</div>
              )}
              {status === 'error' && (
                <div className="text-red-600 text-center font-medium">Something went wrong. Please try again.</div>
              )}
            </div>
            <div className="flex justify-center pb-6">
              <Button type="submit" className="px-8 py-2" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
      {/* Contact Info Card */}
      <motion.div className="w-full max-w-md bg-amber-100 text-amber-900 rounded-2xl shadow-xl p-4 sm:p-8 mb-8 md:mb-0 md:ml-4 flex flex-col justify-between order-1 md:order-2 mx-auto" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
        <div>
          <div className="text-xl sm:text-2xl italic mb-2">Contact us</div>
          <div className="text-2xl sm:text-3xl font-bold mb-2">Jee Ri Haveli</div>
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
      </motion.div>
    </motion.div>
  );
} 