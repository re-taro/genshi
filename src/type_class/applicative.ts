import type { Kind } from "../kind";
import type { Apply } from "./apply";
import type { Pure } from "./pure";

/**
 * ## Applicative
 *
 * All instances must satisfy following conditions.
 * - Identity: `A.ap(A.pure(a), A.pure(x => x)) === A.pure(a)` for all `a` in `T`. (where `A` is the instance of `Applicative` and `T` is the type of `a`)
 * - Homomorphism: `A.ap(A.pure(a), A.pure(f)) === A.pure(f(a))` for all `a` in `T` and `f` in `T -> U`. (where `A` is the instance of `Applicative` and `T`, `U` are the types of `a`, `f`)
 * - Interchange: `A.ap(A.pure(a), u) === A.ap(u, A.pure(f => f(a)))` for all `a` in `T` and `u` in `U`. (where `A` is the instance of `Applicative` and `T`, `U` are the types of `a`, `u`)
 */
export interface Applicative<A extends Kind> extends Apply<A>, Pure<A> { }
