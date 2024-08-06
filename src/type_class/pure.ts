import type { Kind1, Kind2, KindDict1, KindDict2 } from "../kind";

/**
 * ## Pure
 *
 * The `Pure` type class is for types that support the `pure` operation.
 */
export interface Pure1<A extends Kind1> {
	pure: <T>(a: T) => KindDict1<T>[A];
}
export interface Pure2<A extends Kind2> {
	pure: <T1, T2>(a: T1) => KindDict2<T1, T2>[A];
}
