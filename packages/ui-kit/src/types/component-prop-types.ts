import { type PropsWithChildren } from 'react';

// P = component props, E = element type,
export type BaseComponentPropsType<E> = React.HTMLAttributes<E> & {
  ref?: React.RefObject<E>;
};

export type ComponentPropsWithChildren<P, E> = PropsWithChildren<P> & BaseComponentPropsType<E>;

export type ComponentPropsWithoutChildren<P, E> = P & BaseComponentPropsType<E>;
