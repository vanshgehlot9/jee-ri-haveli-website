# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `jeerihaveli`
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Add Web App

1. Click the web icon (</>) to add a web app
2. Enter app nickname: `Jee Ri Haveli Website`
3. Click "Register app"
4. Copy the Firebase config object

## Step 3: Update Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jeerihaveli.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jeerihaveli
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jeerihaveli.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 4: Set up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

## Step 5: Security Rules (Optional)

Update Firestore security rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For development only
    }
  }
}
```

## Step 6: Test the Connection

1. Start your development server: `npm run dev`
2. Try making a booking or table reservation
3. Check the Firebase Console to see if data is being saved

## Free Tier Limits

Firebase free tier includes:
- 1GB storage
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day

This is more than enough for a hotel website!

## Deployment

When deploying to Vercel:
1. Add the same environment variables in Vercel dashboard
2. Your Firebase connection will work automatically 