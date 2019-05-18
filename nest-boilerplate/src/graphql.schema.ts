
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CatInput {
    nickname?: string;
    species?: string;
}

export class Cat {
    id?: number;
    nickname?: string;
    species?: string;
}

export class CatResponse {
    code?: number;
    message?: string;
    data?: Cat;
}

export class CatsResponse {
    code?: number;
    message?: string;
    data?: Cat[];
}

export class CommonResponse {
    code?: number;
    message?: string;
}

export abstract class IMutation {
    abstract createCat(cat: CatInput): CommonResponse | Promise<CommonResponse>;

    abstract deleteCat(id: number): CommonResponse | Promise<CommonResponse>;

    abstract updateCat(id: number, cat?: CatInput): CommonResponse | Promise<CommonResponse>;

    abstract pubMessage(msg: string): string | Promise<string>;
}

export abstract class IQuery {
    abstract findOneCat(id: number): CatResponse | Promise<CatResponse>;

    abstract findCats(): CatsResponse | Promise<CatsResponse>;

    abstract sayHello(name: string): string | Promise<string>;
}

export abstract class ISubscription {
    abstract subMessage(): string | Promise<string>;
}
