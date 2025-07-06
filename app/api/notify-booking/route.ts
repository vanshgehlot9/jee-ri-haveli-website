import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com", // Your Gmail address
    pass: process.env.EMAIL_PASS || "your-app-password"  // Your Gmail app password
  }
})

export async function POST(req: NextRequest) {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || 
        process.env.EMAIL_USER === "your-email@gmail.com" || 
        process.env.EMAIL_PASS === "your-app-password") {
      console.log('Email credentials not configured, skipping email notification')
      return NextResponse.json({ 
        success: true, 
        message: 'Email notification skipped - credentials not configured' 
      })
    }

    const bookingData = await req.json()
    const { name, email, phone, roomType, checkIn, checkOut, guests, bookingId } = bookingData

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "info@jeerihaveli.com", // Replace with your email
      subject: `🎉 New Booking Received - ${bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🎉 New Booking Alert!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">A new booking has been received</p>
          </div>
          
          <div style="background: white; padding: 20px; margin-top: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #f59e0b; margin-top: 0;">Booking Details</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
              <div>
                <strong style="color: #374151;">Booking ID:</strong><br>
                <span style="color: #6b7280; font-family: monospace;">${bookingId}</span>
              </div>
              <div>
                <strong style="color: #374151;">Room Type:</strong><br>
                <span style="color: #6b7280;">${roomType}</span>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
              <div>
                <strong style="color: #374151;">Check-in:</strong><br>
                <span style="color: #6b7280;">${new Date(checkIn).toLocaleDateString()}</span>
              </div>
              <div>
                <strong style="color: #374151;">Check-out:</strong><br>
                <span style="color: #6b7280;">${new Date(checkOut).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
              <div>
                <strong style="color: #374151;">Number of Guests:</strong><br>
                <span style="color: #6b7280;">${guests}</span>
              </div>
              <div>
                <strong style="color: #374151;">Booking Time:</strong><br>
                <span style="color: #6b7280;">${new Date().toLocaleString()}</span>
              </div>
            </div>
            
            <h3 style="color: #f59e0b; margin-top: 25px;">Guest Information</h3>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">
              <p style="margin: 0; color: #065f46;">
                <strong>Action Required:</strong> Please review this booking in your admin panel and confirm the reservation.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
            <p>This is an automated notification from Jee Ri Haveli Booking System</p>
          </div>
        </div>
      `
    }

    // Email to guest
    const guestMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `✅ Booking Confirmed - ${bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">✅ Booking Confirmed!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Thank you for choosing Jee Ri Haveli</p>
          </div>
          
          <div style="background: white; padding: 20px; margin-top: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #10b981; margin-top: 0;">Booking Confirmation</h2>
            
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #0369a1;">
                Booking ID: <span style="font-family: monospace;">${bookingId}</span>
              </p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
              <div>
                <strong style="color: #374151;">Room Type:</strong><br>
                <span style="color: #6b7280;">${roomType}</span>
              </div>
              <div>
                <strong style="color: #374151;">Number of Guests:</strong><br>
                <span style="color: #6b7280;">${guests}</span>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
              <div>
                <strong style="color: #374151;">Check-in Date:</strong><br>
                <span style="color: #6b7280;">${new Date(checkIn).toLocaleDateString()}</span>
              </div>
              <div>
                <strong style="color: #374151;">Check-out Date:</strong><br>
                <span style="color: #6b7280;">${new Date(checkOut).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">Important Information</h3>
              <ul style="color: #92400e; margin: 10px 0; padding-left: 20px;">
                <li>Please arrive at the hotel between 2:00 PM and 6:00 PM for check-in</li>
                <li>Check-out time is 11:00 AM</li>
                <li>Please carry a valid ID proof for verification</li>
                <li>For any queries, contact us at +91-291-2540007</li>
              </ul>
            </div>
            
            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px;">
              <h3 style="color: #065f46; margin-top: 0;">Contact Information</h3>
              <p style="margin: 5px 0; color: #065f46;"><strong>Address:</strong> Near Rajmahal Sr. Hr. Sec. School, Gulab Sagar, Jodhpur, Rajasthan</p>
              <p style="margin: 5px 0; color: #065f46;"><strong>Phone:</strong> +91-291-2540007, +91-9351722007</p>
              <p style="margin: 5px 0; color: #065f46;"><strong>Email:</strong> info@jeerihaveli.com</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
            <p>Thank you for choosing Jee Ri Haveli. We look forward to welcoming you!</p>
          </div>
        </div>
      `
    }

    // Send emails
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(guestMailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'Notification emails sent successfully' 
    })
  } catch (error) {
    console.error('Email notification error:', error)
    return NextResponse.json({ 
      error: 'Failed to send notification emails' 
    }, { status: 500 })
  }
} 