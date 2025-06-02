import React from 'react';
import './globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
  title: 'HelpMeOut',
  description: 'Aplicația HelpMeOut',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})

{
  const CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID!;
  console.log(CLIENT_ID);
  return (
    <html lang="ro">
      <GoogleOAuthProvider clientId={CLIENT_ID}>

        <body>{children}</body>
      </GoogleOAuthProvider>

    </html>
  );
}
