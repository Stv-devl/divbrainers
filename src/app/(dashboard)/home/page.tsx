'use client';

import React from 'react';
import HomePageLayout from '@/components/home/HomePageLayout';
import Loading from '@/components/loading/Loading';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import { useUserStats } from '@/hooks/useUserStats';

/**
 * Home page component displaying user statistics and activities
 * @returns {JSX.Element} The Home page component
 */
const Home = () => {
  const { t, isClient } = useClientTranslation();
  const { stats, loading } = useUserStats();

  if (!isClient) return null;

  if (loading || !stats) {
    return (
      <Loading
        value={t('overview.loading', 'Loading your data...')}
        isLoggedIn={true}
      />
    );
  }

  return <HomePageLayout stats={stats} t={t} />;
};

export default Home;
