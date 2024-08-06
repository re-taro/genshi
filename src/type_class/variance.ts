import type { Kind1, KindDict1 } from "../kind";

/**
 * ## Contravariant
 *
 * The `Contravariant` type class is for types that support the `contramap` operation.
 */
export interface Contravariant<A extends Kind1> {
	contramap: <T, U>(f: (arg: Readonly<T>) => U) => (u: KindDict1<U>[A]) => KindDict1<T>[A];
}
