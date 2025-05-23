// app/_app.tsx
import React from 'react';
import '../styles/globals.css'; 

function MyApp({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) {
  return <Component {...pageProps} />;
}

export default MyApp;
