import React from 'react';
import Header from './components/Header';
import s from './index.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={s.root}>
      <Header />
      <section className={s.content}>{children}</section>
    </div>
  );
}

export default Layout;
