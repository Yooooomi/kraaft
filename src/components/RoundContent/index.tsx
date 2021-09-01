import React from 'react';
import cl from 'classnames';
import s from './index.module.css';

interface RoundContentProps {
  children: React.ReactNode;
  className?: string;
  topleft?: boolean;
  topright?: boolean;
  bottomleft?: boolean;
  bottomright?: boolean;
}

function RoundContent({
  children,
  className,
  topleft,
  topright,
  bottomleft,
  bottomright,
}: RoundContentProps) {
  return (
    <div
      className={cl(
        s.root,
        topleft && s.topleft,
        topright && s.topright,
        bottomleft && s.botleft,
        bottomright && s.botright,
        className,
      )}>
      {children}
    </div>
  );
}

export default RoundContent;
