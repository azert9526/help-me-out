// app/layout.tsx
import React from 'react';

export const metadata = {
  title: 'HelpMeOut',
  description: 'Aplicația HelpMeOut',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
