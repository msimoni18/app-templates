import { Outlet } from 'react-router-dom';

import { cn } from '../lib/utils';
import { Titlebar } from '../components/titlebar';
import { useTheme } from '../theme/theme-provider';

export const Root = () => {
  const { theme } = useTheme();

  return (
    <div className="h-screen">
      <Titlebar />
      <div
        className={cn(
          'w-full min-h-[calc(100vh-32px)]', // h-8 = 32px = height of Navbar
          theme === 'dark' ? 'bg-background-2' : '',
        )}
      >
        <Outlet />
      </div>
    </div>
  );
};
