/**
 * Factory function that creates a BEM (Block Element Modifier) utility.
 *
 * @param {string} [prefix='_'] - The prefix for BEM modifiers.
 * @returns {BemFunction} A BEM utility function.
 */
export declare function Bem(prefix?: string): unBemFunction;

export declare type NameSpaceOptions = (string | string[] | Record<string, boolean>)[];

export declare interface NameSpaceResult {
  (...args: NameSpaceOptions): string[];
  is: (...args: NameSpaceOptions) => string[];
  child: (child: string, ...args: NameSpaceOptions) => string[];
}

/**
 * Default BEM utility with an underscore (_) prefix.
 */
export declare const unBem: unBemFunction;

export declare type unBemFunction = (block: string, ...args: NameSpaceOptions) => string[];

/**
 * Hook for creating a BEM namespace.
 *
 * @param {string} name - The name of the BEM block.
 * @param {string} [prefix='x'] - The prefix for the BEM block.
 * @returns {NameSpaceResult} A BEM namespace utility function.
 */
export declare function useNameSpace(name: string, prefix?: string): NameSpaceResult;

/**
 * Hook for toggling between dark and light themes.
 *
 * @returns A function to toggle the theme.
 */
export declare function useTheme(): () => void;

export {}
