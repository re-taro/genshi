import type { Kind, KindDict } from "../kind";

/**
 * ## Pure
 *
 * The `Pure` type class is for types that support the `pure` operation.
 */
export interface Pure<A extends Kind> {
	pure: <T>(a: T) => KindDict<T>[A];
}
