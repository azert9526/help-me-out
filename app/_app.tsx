// app/_app.tsx
import React from 'react';
import '../styles/globals.css'; // Importăm fișierul CSS global

function MyApp({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) {
  return <Component {...pageProps} />;
}

export default MyApp;
