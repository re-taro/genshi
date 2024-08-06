import type { Option } from "../option";
import { flatMap, isNone, map, mapOr, none, some } from "../option";
import type { Ordering } from "../ordering";
import { equal, isEq, then } from "../ordering";
import type { PartialEq } from "./eq";
import { tuple as tupleEq } from "./eq";
import type { Monoid } from "./monoid";
import type { Contravariant } from "./variance";

/**
 * ## PartialOrd
 *
 * All instances must satisfy following conditions.
 * - Transitivity: If `f` is `PartialOrd`, for all `a`, `b` and `c`; `f(a, b) == f(b, c) == f(a, c)`.
 * - Duality: If `f` is `PartialOrd`, for all `a` and `b`; `f(a, b) == -f(b, a)`.
 */
export interface PartialOrd<L, R> extends PartialEq<L, R> {
	partialCmp: (l: L, r: R) => Option<Ordering>;
}

declare const partialOrdNominal: unique symbol;
export type PartialOrdKindKey = typeof partialOrdNominal;
declare module "../kind" {
	interface KindDict1<A> {
		[partialOrdNominal]: PartialOrd<A, A>;
	}
}

export const fromPartialCmp = <L, R>(
	partialCmp: (l: L, r: R) => Option<Ordering>,
): PartialOrd<L, R> => ({
	eq: (l, r) => mapOr(false)(partialCmp(l, r))((order: Ordering) => isEq(order)),
	partialCmp,
});

export const tuple = <T extends unknown[]>(ord: { readonly [K in keyof T]: PartialOrd<T[K], T[K]> }): PartialOrd<T, T> => ({
	eq: tupleEq(ord).eq,
	partialCmp: (l, r) => {
		const len = Math.min(l.length, r.length);
		let result: Ordering = equal;
		for (let i = 0; i < len; i++) {
			const order = (ord[i] as PartialOrd<unknown, unknown>).partialCmp(l[i], r[i]);
			if (isNone(order))
				return none();
			result = then(result, order[1]);
		}
		return some(result);
	},
});

export const contravariant: Contravariant<PartialOrdKindKey> = {
	contramap: f => ord => fromPartialCmp((l, r) => ord.partialCmp(f(l), f(r))),
};

export const identity: PartialOrd<unknown, unknown> = fromPartialCmp(() => some(equal));

export const monoid = <L, R>(): Monoid<PartialOrd<L, R>> => ({
	conbine: (x, y) => ({
		eq: (l, r) => x.eq(l, r) && y.eq(l, r),
		partialCmp: (l, r) =>
			flatMap(x.partialCmp(l, r))(first =>
				map(y.partialCmp(l, r))(second => then(first, second))),
	}),
	empty: identity,
});

/**
 * ## Ord
 *
 * All instances must satisfy following conditions.
 * - Transitivity: If `f` is `PartialOrd`, for all `a`, `b` and `c`; `f(a, b) == f(b, c) == f(a, c)`.
 * - Duality: If `f` is `PartialOrd`, for all `a` and `b`; `f(a, b) == -f(b, a)`.
 * - Strict: Ordering for all values is well-defined (so the return value is not an `Option`).
 */
export interface Ord<L, R> extends PartialOrd<L, R> {
	cmp: (l: L, r: R) => Ordering;
}

export const reversed = <L, R>(ord: Ord<L, R>): Ord<L, R> => ({
	...ord,
	cmp: (l, r) => {
		return -ord.cmp(l, r) as Ordering;
	},
	partialCmp: (l, r) => {
		return some(-ord.cmp(l, r) as Ordering);
	},
});
