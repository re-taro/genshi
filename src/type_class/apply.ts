import type { Kind, KindDict } from "../kind";

/**
 * ## Apply
 *
 * All instances must satisfy following conditions.
 * - Composition: `A.ap(A.ap(A.ap(A.pure(a), A.pure(x => y => z => x(y(z)))), A.pure(x => y => z => x(y)(z))), A.pure(x => y => z => x(y)(z))) === A.ap(A.pure(a), A.pure(x => y => z => x(y)(z)))` for all `a` in `T`. (where `A` is the instance of `Apply` and `T` is the type of `a`)
 */
export interface Apply<A extends Kind> {
  ap: <T, U>(fn: KindDict<(t: T) => U>[A]) => (t: KindDict<T>[A]) => KindDict<U>[A];
}
