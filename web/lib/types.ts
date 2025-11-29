export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};


export type Cookies = {
    set: (
        key: string,
        value: string,
        options?: {
            secure?: boolean;
            httpOnly?: boolean;
            sameSite?: "lax" | "strict" | "none";
            expires?: number;
        }
    ) => void;
    get: (key: string) => { value: string, name: string } | undefined;
    delete: (key: string) => void;
}