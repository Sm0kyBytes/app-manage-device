'use client';
import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import CustomAppBar from '@/layouts/appBar';
import CustomDrawer from '@/layouts/drawer';
import * as context from '@/context';
import { usePathname } from 'next/navigation';
import { DrawerHeader, Main } from './styles';

interface LayoutProps {
  children: React.ReactNode;
  pathname?: string;
}

const index: React.FC<LayoutProps> = ({ children }) => {
  const { navRoute } = context.useContexts();
  const pathname = usePathname();  // Get current path
  const [open, setOpen] = useState(navRoute);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const hideNavBarPaths = ['/login', '/register'];

  if (hideNavBarPaths.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default index;
