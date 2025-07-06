# Email Notification Setup Guide

This guide will help you set up email notifications for new bookings in the Jee Ri Haveli website.

## Prerequisites

1. A Gmail account
2. Gmail App Password (not your regular password)

## Step 1: Enable 2-Factor Authentication

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled

## Step 2: Generate App Password

1. Go to your Google Account settings
2. Navigate to Security
3. Under "2-Step Verification", click on "App passwords"
4. Select "Mail" as the app and "Other" as the device
5. Click "Generate"
6. Copy the 16-character password (it will look like: xxxx xxxx xxxx xxxx)

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-16-character-app-password
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Replace:
- `your-gmail-address@gmail.com` with your actual Gmail address
- `your-16-character-app-password` with the app password you generated

## Step 4: Test the Setup

1. Start your development server: `npm run dev`
2. Make a test booking on your website
3. Check your email for the notification
4. Check the admin panel for the notification sound

## Email Templates

The system sends two types of emails:

### 1. Admin Notification
- Sent to: info@jeerihaveli.com (configurable)
- Subject: 🎉 New Booking Received - [Booking ID]
- Contains: Complete booking details, guest information, and action items

### 2. Guest Confirmation
- Sent to: Guest's email address
- Subject: ✅ Booking Confirmed - [Booking ID]
- Contains: Booking confirmation, hotel information, and important details

## Troubleshooting

### Email Not Sending
1. Check that your `.env.local` file is in the project root
2. Verify your Gmail credentials are correct
3. Ensure 2-factor authentication is enabled
4. Check that you're using an App Password, not your regular password

### Notification Sound Not Playing
1. Check browser console for errors
2. Ensure the notification.mp3 file exists in the public folder
3. Check browser autoplay settings

### Admin Panel Not Updating
1. Check that the admin page is logged in
2. Verify the API endpoints are working
3. Check browser console for errors

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your app password secure
- Consider using environment-specific email addresses for testing

## Production Deployment

For production deployment:

1. Set up environment variables on your hosting platform
2. Update `NEXT_PUBLIC_BASE_URL` to your production domain
3. Consider using a dedicated email service like SendGrid for better deliverability
4. Test the email functionality in production

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Test with a simple email first
4. Check Gmail's security settings 