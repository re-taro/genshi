import type { Option } from "./option";
import { isSome, none, toArray as optionToArray, some } from "./option";
import type { Monad2 } from "./type_class/monad";
import type { Monoid } from "./type_class/monoid";

const okSymbol: unique symbol = Symbol("ResultOk");
const errSymbol: unique symbol = Symbol("ResultErr");

export type Ok<T> = readonly [typeof okSymbol, T];
export type Err<E> = readonly [typeof errSymbol, E];

declare const resultNominal: unique symbol;
export type ResultHktKey = typeof resultNominal;
declare module "./kind" {
	interface KindDict2<A1, A2> {
		[resultNominal]: Result<A1, A2>;
	}
}

export type Result<T, E> = Err<E> | Ok<T>;

export const ok = <T, E>(v: T): Result<T, E> => [okSymbol, v];
export const err = <T, E>(e: E): Result<T, E> => [errSymbol, e];

export const isOk = <T, E>(res: Result<T, E>): res is Ok<T> => res[0] === okSymbol;
export const isErr = <T, E>(res: Result<T, E>): res is Err<E> => res[0] === errSymbol;

export const flatten = <T, E>(resRes: Result<Result<T, E>, E>): Result<T, E> => isOk(resRes) ? resRes[1] : err(resRes[1]);
export const mergeOkErr = <T>(res: Result<T, T>): T => res[1];

export const and = <T, E>(resA: Result<T, E>) => <U>(resB: Result<U, E>): Result<U, E> => isOk(resA) ? resB : resA;
export const andThen = <T, E>(resA: Result<T, E>) => <U>(fn: (t: T) => Result<U, E>): Result<U, E> => isOk(resA) ? fn(resA[1]) : resA;
export const or = <T, E>(resA: Result<T, E>) => (resB: Result<T, E>): Result<T, E> => isErr(resA) ? resB : resA;
export const orElse = <T, E>(resA: Result<T, E>) => <F>(fn: (err: E) => Result<T, F>): Result<T, F> => isErr(resA) ? fn(resA[1]) : resA;

export const optionOk = <T, E>(res: Result<T, E>): Option<T> => (isOk(res) ? some(res[1]) : none());
export const optionErr = <T, E>(res: Result<T, E>): Option<E> => isErr(res) ? some(res[1]) : none();

export const toString = <T, E>(res: Result<T, E>): string => isOk(res) ? `ok(${res[1]})` : `err(${res[1]})`;
export const toArray = <T, E>(res: Result<T, E>): T[] => optionToArray(optionOk(res));

export const map = <T, E>(res: Result<T, E>) => <U>(fn: (t: T) => U): Result<U, E> => isOk(res) ? ok(fn(res[1])) : res;
export const mapOr = <U>(init: U) => <T, E>(res: Result<T, E>) => (fn: (t: T) => U): U => isOk(res) ? fn(res[1]) : init;
export const mapOrElse = <U>(init: () => U) => <T, E>(res: Result<T, E>) => (fn: (t: T) => U): U => isOk(res) ? fn(res[1]) : init();

export const mapErr = <T, E>(res: Result<T, E>) => <F>(fn: (t: E) => F): Result<T, F> => isErr(res) ? err(fn(res[1])) : res;

export const unwrapOr = <T>(init: T) => <E>(res: Result<T, E>): T => isOk(res) ? res[1] : init;
export const unwrapOrElse = <T>(fn: () => T) => <E>(res: Result<T, E>): T => isOk(res) ? res[1] : fn();

export const resOptToOptRes = <T, E>(resOpt: Result<Option<T>, E>): Option<Result<T, E>> => isOk(resOpt) ? (isSome(resOpt[1]) ? some(ok(resOpt[1][1])) : none()) : some(resOpt);

export const monoid = <T, E>(error: E): Monoid<Result<T, E>> => ({
	combine: (l, r) => or(l)(r),
	empty: err(error),
});

export const monad: Monad2<ResultHktKey> = {
	ap: fnRes => tRes => andThen(fnRes)(fn => map(tRes)(t => fn(t))),
	flatMap: f => res => flatten(map(res)(f)),
	map: f => res => map(res)(f),
	pure: ok,
};
