import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  fluid?: boolean;
}

export default function Container({
  children,
  className = '',
  as: Component = 'div',
  fluid = false,
}: ContainerProps) {
  return (
    <Component
      className={twMerge(
        'mx-auto w-full',
        !fluid && 'max-w-[1440px] px-4 md:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </Component>
  );
} 