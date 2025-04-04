'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

/**
 * Provides authentication session context to the application.
 * This component wraps the application with `SessionProvider` from NextAuth,
 * ensuring that authentication session data is accessible throughout the app
 * @component
 * @param {Object} props - The properties for the SessionContext component.
 * @param {React.ReactNode} props.children - The components that will have access to the session context.
 * @returns {JSX.Element} A wrapper component that provides session management.
 */
const SessionContext = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionContext;
