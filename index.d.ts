export type CommandArgs = (string | string[] | Record<string, boolean>)[];
export type NamespaceValue = string | string[] | Record<string, string>;
export type NamespaceResultItem = {
    (...args: CommandArgs): string[];
    is: (...args: CommandArgs) => string[];
    child: (child: string, ...args: CommandArgs) => string[];
};
export type NamespaceResult<T> = T extends string ? NamespaceResultItem : T extends Array<string> ? NamespaceResultItem[] : Record<keyof T, NamespaceResultItem>;
export interface NamespaceOptions {
    namespace?: string;
    eSeparator?: string;
    mSeparator?: string;
    statePrefix?: string;
}
export declare const nsDefaultConfig: Required<NamespaceOptions>;
export declare function Bem(prefix?: string): (block: string, ...args: CommandArgs) => string[];
export declare function useNamespace<T extends NamespaceValue, R = NamespaceResult<T>>(values: T, options?: NamespaceOptions): R;
