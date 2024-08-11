import type { Kind, Kind1, Kind2 } from "../kind";
import type { Apply, Apply1, Apply2 } from "./apply";
import { makeSemigroup } from "./apply";
import type { Monoid } from "./monoid";
import type { Pure, Pure1, Pure2 } from "./pure";

/**
 * ## Applicative
 *
 * All instances must satisfy following conditions.
 * - Identity: `A.ap(A.pure(a), A.pure(x => x)) === A.pure(a)` for all `a` in `T`. (where `A` is the instance of `Applicative` and `T` is the type of `a`)
 * - Homomorphism: `A.ap(A.pure(a), A.pure(f)) === A.pure(f(a))` for all `a` in `T` and `f` in `T -> U`. (where `A` is the instance of `Applicative` and `T`, `U` are the types of `a`, `f`)
 * - Interchange: `A.ap(A.pure(a), u) === A.ap(u, A.pure(f => f(a)))` for all `a` in `T` and `u` in `U`. (where `A` is the instance of `Applicative` and `T`, `U` are the types of `a`, `u`)
 */
export interface Applicative<Symbol extends symbol> extends Apply<Symbol>, Pure<Symbol> { }
export interface Applicative1<A extends Kind1> extends Apply1<A>, Pure1<A> { }
export interface Applicative2<A extends Kind2> extends Apply2<A>, Pure2<A> { }

export const makeMonoid = <Symbol extends symbol>(app: Applicative<Symbol>) => {
	const semi = makeSemigroup(app);

	return <T>(m: Monoid<T>): Monoid<Kind<Symbol, T>> => ({
		combine: semi(m).combine,
		empty: app.pure(m.empty),
	});
};
