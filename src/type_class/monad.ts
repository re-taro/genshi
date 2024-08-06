import type { Kind1, Kind2 } from "../kind";
import type { Applicative1, Applicative2 } from "./applicative";
import type { FlatMap1, FlatMap2 } from "./flat_map";

/**
 * ## Monad
 *
 * All instances must satisfy following conditions.
 * - Left identity: `M.flatMap(M.pure(a), f) === f(a)` for all `a` in `T` and `f` in `T -> U`. (where `M` is the instance of `Monad` and `T`, `U` are the types of `a`, `f`)
 * - Right identity: `M.flatMap(a, M.pure) === a` for all `a` in `T`. (where `M` is the instance of `Monad` and `T` is the type of `a`)
 * - Associativity: `M.flatMap(M.flatMap(a, f), g) === M.flatMap(a, x => M.flatMap(f(x), g))` for all `a` in `T`, `f` in `T -> U`, and `g` in `U -> V`. (where `M` is the instance of `Monad` and `T`, `U`, `V` are the types of `a`, `f`, `g`)
 */
export interface Monad1<A extends Kind1> extends Applicative1<A>, FlatMap1<A> { }
export interface Monad2<A extends Kind2> extends Applicative2<A>, FlatMap2<A> { }
