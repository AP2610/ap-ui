import { PropsWithChildren } from 'react';
import { type VariantProps } from 'tailwind-variants';

// P = component props, E = element type, V = variant type
export type VariantPropType<V extends (...args: unknown[]) => unknown> = VariantProps<V>;

export type BaseComponentPropsType<E, V extends (...args: unknown[]) => unknown = never> = VariantPropType<V> &
  React.HTMLAttributes<E> & {
    ref?: React.RefObject<E>;
  };

export type ComponentPropsWithChildren<P, E, V extends (...args: unknown[]) => unknown = never> = PropsWithChildren<P> &
  BaseComponentPropsType<E, V>;

export type ComponentPropsWithoutChildren<E, V extends (...args: unknown[]) => unknown = never> = BaseComponentPropsType<E, V>;
