import type { Semigroup } from "./semigroup";

/**
 * ## Monoid
 *
 * All instances must satisfy following conditions.
 * - Associativity: `M.combine(M.combine(a, b), c) === M.combine(a, M.combine(b, c))` for all `a`, `b`, `c` in `T`. (where `M` is the instance of `Monoid` and `T` is the type of `a`, `b`, `c`)
 * - Right identity: `M.combine(a, M.empty) === a` for all `a` in `T`. (where `M` is the instance of `Monoid` and `T` is the type of `a`)
 * - Left identity: `M.combine(M.empty, a) === a` for all `a` in `T`. (where `M` is the instance of `Monoid` and `T` is the type of `a`)
 */
export interface Monoid<T> extends Semigroup<T> {
  readonly empty: T;
}
