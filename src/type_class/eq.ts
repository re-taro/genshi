import type { Monoid } from "./monoid";
import type { Contravariant } from "./variance";

/**
 * ## PartialEq
 *
 * All instances must satisfy following conditions.
 * - Symmetry: `P.eq(l, r) === P.eq(r, l)` for all `l` in `L` and `r` in `R`. (where `P` is the instance of `PartialEq` and `L`, `R` are the types of `l`, `r`)
 * - Transitivity: if `P.eq(l, m) === true` and `P.eq(m, r) === true`, then `P.eq(l, r) === true` for all `l`, `m`, `r` in `L` and `R`. (where `P` is the instance of `PartialEq` and `L`, `R` are the types of `l`, `m`, `r`)
 */
export interface PartialEq<L, R> {
	eq: (l: L, r: R) => boolean;
}

declare const partialEqNominal: unique symbol;
export type PartialEqKindKey = typeof partialEqNominal;
declare module "../kind" {
	interface KindDict<A> {
		[partialEqNominal]: PartialEq<A, A>;
	}
}

export const contravariant: Contravariant<PartialEqKindKey> = {
	contramap: <T1, T2>(f: (arg: T1) => T2) => (p: PartialEq<T2, T2>): PartialEq<T1, T1> => ({ eq: (l, r) => p.eq(f(l), f(r)) }),
};

export const fromCmp = <L, R>(cmp: (l: L, r: R) => boolean): PartialEq<L, R> => ({ eq: cmp });

export const strict = <T>(): PartialEq<T, T> => fromCmp<T, T>((l, r) => l === r);

export const identity: PartialEq<unknown, unknown> = fromCmp(() => true);

export const monoid = <L, R>(): Monoid<PartialEq<L, R>> => ({
	conbine: (x, y) => ({ eq: (l, r) => x.eq(l, r) && y.eq(l, r) }),
	empty: identity,
});

export const structual = <S>(cmp: { readonly [K in keyof S]: PartialEq<S[K], S[K]> }): PartialEq<Readonly<S>, Readonly<S>> => fromCmp((l, r) => {
	for (const key in cmp) {
		if (!cmp[key].eq(l[key], r[key]))
			return false;
	}
	return true;
});

export const tuple = <S extends unknown[]>(cmp: { readonly [K in keyof S]: PartialEq<S[K], S[K]> }): PartialEq<Readonly<S>, Readonly<S>> => fromCmp((l, r) => {
	const len = Math.min(l.length, r.length);
	for (let i = 0; i < len; i++) {
		if (!(cmp[i] as PartialEq<unknown, unknown>).eq(l[i], r[i]))
			return false;
	}
	return true;
});

export const eqSymbol: unique symbol = Symbol("eq");

/**
 * ## Eq
 *
 * All instances must satisfy following conditions.
 * - Symmetry: `E.eq(l, r) === E.eq(r, l)` for all `l` in `L` and `r` in `R`. (where `E` is the instance of `Eq` and `L`, `R` are the types of `l`, `r`)
 * - Transitivity: if `E.eq(l, m) === true` and `E.eq(m, r) === true`, then `E.eq(l, r) === true` for all `l`, `m`, `r` in `L` and `R`. (where `E` is the instance of `Eq` and `L`, `R` are the types of `l`, `m`, `r`)
 * - Reflexivity: `E.eq(l, l) === true` for all `l` in `L`. (where `E` is the instance of `Eq` and `L` is the type of `l`)
 *
 * For example, the comparator below cannot implement `Eq` because that does not satisfy reflexive due to `NaN === NaN` always be false.
 *
 * ```ts
 * const comparator: PartialEq<number, number> = (x, y) => x === y;
 * ```
 */
export interface Eq<L, R> extends PartialEq<L, R> {
	[eqSymbol]: true;
}
