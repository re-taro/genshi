import type { Kind, KindDict } from "../kind";

/**
 * ## FlatMap
 *
 * All instances must satisfy following conditions.
 * - Associativity: `F.flatMap(F.flatMap(a, f), g) === F.flatMap(a, x => F.flatMap(f(x), g))` for all `a` in `T`, `f` in `T -> U`, and `g` in `U -> V`. (where `F` is the instance of `FlatMap` and `T`, `U`, `V` are the types of `a`, `f`, `g`)
 */
export interface FlatMap<A extends Kind> {
	flatMap: <T, U>(a: (t: T) => KindDict<U>[A]) => (t: KindDict<T>[A]) => KindDict<U>[A];
}
