import type { Kind1, Kind2, KindDict1, KindDict2 } from "../kind";
import type { Functor1, Functor2 } from "./functor";

/**
 * ## Apply
 *
 * All instances must satisfy following conditions.
 * - Composition: `A.ap(A.ap(A.ap(A.pure(a), A.pure(x => y => z => x(y(z)))), A.pure(x => y => z => x(y)(z))), A.pure(x => y => z => x(y)(z))) === A.ap(A.pure(a), A.pure(x => y => z => x(y)(z)))` for all `a` in `T`. (where `A` is the instance of `Apply` and `T` is the type of `a`)
 */
export interface Apply1<A extends Kind1> extends Functor1<A> {
	ap: <T, U>(fn: KindDict1<(t: T) => U>[A]) => (t: KindDict1<T>[A]) => KindDict1<U>[A];
}
export interface Apply2<A extends Kind2> extends Functor2<A> {
	ap: <T1, T2, U1>(fn: KindDict2<(t: T1) => U1, T2>[A]) => (t: KindDict2<T1, T2>[A]) => KindDict2<U1, T2>[A];
}
