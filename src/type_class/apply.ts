import type { Kind, Kind1, Kind2, KindDict1, KindDict2 } from "../kind";
import type { Functor, Functor1, Functor2 } from "./functor";
import type { Semigroup } from "./semigroup";

/**
 * ## Apply
 *
 * All instances must satisfy following conditions.
 * - Composition: `A.ap(A.ap(A.ap(A.pure(a), A.pure(x => y => z => x(y(z)))), A.pure(x => y => z => x(y)(z))), A.pure(x => y => z => x(y)(z))) === A.ap(A.pure(a), A.pure(x => y => z => x(y)(z)))` for all `a` in `T`. (where `A` is the instance of `Apply` and `T` is the type of `a`)
 */
export interface Apply<Symbol extends symbol> extends Functor<Symbol> {
	ap: <T, U>(fn: Kind<Symbol, (t: T) => U>) => (t: Kind<Symbol, T>) => Kind<Symbol, U>;
}
export interface Apply1<A extends Kind1> extends Functor1<A> {
	ap: <T, U>(fn: KindDict1<(t: T) => U>[A]) => (t: KindDict1<T>[A]) => KindDict1<U>[A];
}
export interface Apply2<A extends Kind2> extends Functor2<A> {
	ap: <T1, T2, U1>(fn: KindDict2<(t: T1) => U1, T2>[A]) => (t: KindDict2<T1, T2>[A]) => KindDict2<U1, T2>[A];
}

export const ap = <SymbolA extends symbol, SymbolB extends symbol>(applyA: Apply<SymbolA>, applyB: Apply<SymbolB>) => <T>(funcT: Kind<SymbolA, Kind<SymbolB, T>>) => <U>(funcM: Kind<SymbolA, Kind<SymbolB, (t: T) => U>>): Kind<SymbolA, Kind<SymbolB, U>> => applyA.ap(applyA.map(applyB.ap)(funcM))(funcT);

export const apFirst = <Symbol extends symbol>(apply: Apply<Symbol>) => <T>(first: Kind<Symbol, T>) => <U>(second: Kind<Symbol, U>): Kind<Symbol, T> => apply.ap(apply.map((t: T) => () => t)(first))(second);

export const apSecond = <Symbol extends symbol>(apply: Apply<Symbol>) =>
	<T>(first: Kind<Symbol, T>) =>
		<U>(second: Kind<Symbol, U>): Kind<Symbol, U> =>
			apply.ap(apply.map(() => (u: U) => u)(first))(second);

export const apSelective = <Symbol extends symbol>(apply: Apply<Symbol>) => <N extends keyof any, T>(name: Exclude<N, keyof T>) => (funcT: Kind<Symbol, T>) => <U>(funcU: Kind<Symbol, U>): Kind<Symbol, { [K in N | keyof T]: K extends keyof T ? T[K] : U }> =>
	apply.ap(
		apply.map(
			(t: T) => (u: U) =>
				({ ...t, [name]: u } as { [K in N | keyof T]: K extends keyof T ? T[K] : U }),
		)(funcT),
	)(funcU);

export const makeSemigroup = <Symbol extends symbol>(apply: Apply<Symbol>) => <T>(semi: Semigroup<T>): Semigroup<Kind<Symbol, T>> => ({
	combine: (l, r) => apply.ap(apply.map((l: T) => (r: T) => semi.combine(l, r))(l))(r),
});
