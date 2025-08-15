# Google OAuth Setup for Workhub

This guide will help you set up Google OAuth for the Workhub application.

## Required Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

```
# NextAuth Secret - Used to encrypt the NextAuth.js JWT
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth URL - Used for callbacks
NEXTAUTH_URL=http://localhost:3000
```

## How to Get Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add a name for your OAuth client
7. Add authorized JavaScript origins:
   - For development: `http://localhost:3000`
   - For production: Your production URL
8. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-production-url.com/api/auth/callback/google`
9. Click "Create"
10. Copy the Client ID and Client Secret to your `.env` file

## Generate NextAuth Secret

You can generate a secure random string for your NextAuth secret using:

```bash
openssl rand -base64 32
```

Or use a secure online generator.

## Testing the Setup

1. Start your development server
2. Try logging in with Google
3. Check the console for any errors
4. Verify that the user is created in your database

## Troubleshooting

- Make sure all environment variables are correctly set
- Check that the redirect URIs match exactly what's configured in Google Cloud Console
- Ensure your Google Cloud project has the "Google+ API" enabled
- If using a custom domain for development, make sure it's added to the authorized origins
