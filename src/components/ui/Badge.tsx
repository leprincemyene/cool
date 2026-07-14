import type { ReactNode } from 'react';

type BadgeProps = {
  cls: string;
  dot?: string;
  children: ReactNode;
};

export default function Badge({ cls, dot, children }: BadgeProps) {
  return (
    <span className={`badge ${cls}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />}
      {children}
    </span>
  );
}
