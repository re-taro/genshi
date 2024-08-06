import type { Kind1, Kind2, KindDict1, KindDict2 } from "../kind";

/**
 * ## FlatMap
 *
 * All instances must satisfy following conditions.
 * - Associativity: `F.flatMap(F.flatMap(a, f), g) === F.flatMap(a, x => F.flatMap(f(x), g))` for all `a` in `T`, `f` in `T -> U`, and `g` in `U -> V`. (where `F` is the instance of `FlatMap` and `T`, `U`, `V` are the types of `a`, `f`, `g`)
 */
export interface FlatMap1<A extends Kind1> {
	flatMap: <T, U>(a: (t: T) => KindDict1<U>[A]) => (t: KindDict1<T>[A]) => KindDict1<U>[A];
}
export interface FlatMap2<A extends Kind2> {
	flatMap: <T1, T2, U1>(a: (t: T1) => KindDict2<U1, T2>[A]) => (t: KindDict2<T1, T2>[A]) => KindDict2<U1, T2>[A];
}
