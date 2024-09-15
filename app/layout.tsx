"use client"; // Add this line to make the component a client component

import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { createOrGetUser } from '@/utils/user';
import { metadata } from './metadata'; // Import metadata from the new file

// Dynamically import the Header component with SSR disabled
const Header = dynamic(() => import('@/components/ui/headers'), { ssr: false });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

//

function UserHandler({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      createOrGetUser(user.id)
        .then(profile => {
          console.log('User profile:', profile);
          // You can store the profile in a global state here if needed
        })
        .catch(error => {
          console.error('Error handling user:', error);
        });
    }
  }, [isLoaded, user]);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          {/* Add other metadata fields as needed */}
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <UserHandler>{children}</UserHandler>
        </body>
      </html>
    </ClerkProvider>
  );
}
