/**
 * ## Semigroup
 *
 * All instances must satisfy following conditions.
 * - Associativity: `S.combine(S.combine(a, b), c) === S.combine(a, S.combine(b, c))` for all `a`, `b`, `c` in `T`. (where `S` is the instance of `Semigroup` and `T` is the type of `a`, `b`, `c`)
 */
export interface Semigroup<T> {
	conbine: (l: T, r: T) => T;
}
