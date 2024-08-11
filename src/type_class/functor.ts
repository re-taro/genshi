import type {
	Kind,
	Kind1,
	Kind2,
	KindDict1,
	KindDict2,
} from "../kind";

/**
 * ## Functor
 *
 * All instances must satisfy following conditions.
 * - Identity: `f.map((x) => x)` equals to `(x) => x`, for all `f`. (where `f` is the instance of `Functor`)
 * - Composition: For all `a` and `b`; `f.map((x) => b(a(x)))` equals to `(x) => f.map(b)(f.map(a)(x))`. (where `f` is the instance of `Functor`)
 */
export interface Functor<F extends symbol> {
	map: <T, U>(fn: (t: T) => U) => (t: Kind<F, T>) => Kind<F, U>;
}
export interface Functor1<A extends Kind1> {
	map: <T1, U1>(fn: (t: T1) => U1) => (t: KindDict1<T1>[A]) => KindDict1<U1>[A];
}
export interface Functor2<A extends Kind2> {
	map: <T1, T2, U1>(fn: (t: T1) => U1) => (t: KindDict2<T1, T2>[A]) => KindDict2<U1, T2>[A];
}

export const map = <SymbolA extends symbol, SymbolB extends symbol>(funcA: Functor<SymbolA>, funcB: Functor<SymbolB>) => <T, U>(f: (t: T) => U) => (funcT: Kind<SymbolA, Kind<SymbolB, T>>): Kind<SymbolA, Kind<SymbolB, U>> => funcA.map(funcB.map(f))(funcT);

export const flap = <Symbol extends symbol>(func: Functor<Symbol>) => <T, U>(t: T): (t: Kind<Symbol, (t: T) => U>) => Kind<Symbol, U> => func.map((f: (t: T) => U) => f(t));

export const bindTo = <Symbol extends symbol>(func: Functor<Symbol>) => <N extends keyof any>(name: N): <T>(t: Kind<Symbol, T>) => Kind<Symbol, Record<N, T>> => func.map(<T>(a: T) => ({ [name]: a } as Record<N, T>));
