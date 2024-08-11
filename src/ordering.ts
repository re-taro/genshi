import type { Monoid } from "./type_class/monoid";

export const less = -1;
export const equal = 0;
export const greater = 1;
export type Ordering = typeof equal | typeof greater | typeof less;

export const isLt = (ord: Ordering): boolean => ord === less;
export const isGt = (ord: Ordering): boolean => ord === greater;
export const isLe = (ord: Ordering): boolean => ord !== greater;
export const isGe = (ord: Ordering): boolean => ord !== less;
// eslint-disable-next-line eqeqeq
export const isEq = (ord: Ordering): boolean => ord == equal;
// eslint-disable-next-line eqeqeq
export const isNe = (ord: Ordering): boolean => ord != equal;

export const reverse = (order: Ordering): Ordering => -order as Ordering;

export const then = (first: Ordering, second: Ordering): Ordering => (first === equal ? second : first);
export const thenWith = (first: Ordering, secondFn: () => Ordering): Ordering => first === equal ? secondFn() : first;

export const monoid: Monoid<Ordering> = {
	combine: then,
	empty: equal,
};
