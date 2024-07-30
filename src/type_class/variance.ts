import type { Kind, KindDict } from "../kind";

/**
 * ## Contravariant
 *
 * The `Contravariant` type class is for types that support the `contramap` operation.
 */
export interface Contravariant<A extends Kind> {
	contramap: <T, U>(f: (arg: Readonly<T>) => U) => (u: KindDict<U>[A]) => KindDict<T>[A];
}
