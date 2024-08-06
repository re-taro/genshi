/* eslint-disable unused-imports/no-unused-vars */

export interface KindDict1<A> { }
export interface KindDict2<A1, A2> extends KindDict1<A1> { }

export type Kind1 = keyof KindDict1<any>;
export type Kind2 = keyof KindDict2<any, any>;
