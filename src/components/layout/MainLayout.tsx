import { ReactNode } from 'react';
import ServerHeader from './ServerHeader';
import ServerFooter from './ServerFooter';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ServerHeader />
      <main className="flex-grow">{children}</main>
      <ServerFooter />
    </div>
  );
} 