# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: "fuar-crm" (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

## 3. Create Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your region)
5. Click "Done"

## 4. Enable Storage

1. In Firebase Console, go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode" (for development)
4. Select same location as Firestore
5. Click "Done"

## 5. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" and choose Web (</>) icon
4. Enter app nickname: "fuar-crm-web"
5. Click "Register app"
6. Copy the configuration object

## 6. Update Your App Configuration

Replace the configuration in `lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 7. Configure Emulators (Optional for Development)

Your emulator configuration is already set up in `firebase.json`. To start emulators:

```bash
firebase emulators:start
```

This will start:
- Auth emulator on port 9099
- Firestore emulator on port 8080
- Storage emulator on port 9199
- Functions emulator on port 5001
- UI on port 3001

## 8. Security Rules

The security rules are already configured in:
- `firestore.rules` - Secure rules for Firestore
- `storage.rules` - Secure rules for Storage

## 9. Testing

1. Start your app: `npm start`
2. Try registering a new account
3. Check Firebase Console to see if data is being created
4. Test login/logout functionality

## Next Steps

1. Set up OCR service integration
2. Implement camera functionality
3. Add email service integration
4. Deploy to production Firebase project