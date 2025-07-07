import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/server/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;
    await sendEmail({
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
} 