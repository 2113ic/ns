export type CommandArgs = (string | string[] | Record<string, boolean>)[]
export type NamespaceValue = string | string[] | Record<string, string>

export type NamespaceResultItem = {
  (...args: CommandArgs): string[]
  is: (...args: CommandArgs) => string[]
  child: (child: string, ...args: CommandArgs) => string[]
}

export type NamespaceResult<T> = T extends string ? NamespaceResultItem : T extends Array<string> ? NamespaceResultItem[] : Record<keyof T, NamespaceResultItem>

export interface NamespaceOptions {
  namespace?: string
  eSeparator?: string
  mSeparator?: string
  statePrefix?: string
}

export const nsDefaultConfig = {
  namespace: 'x',
  eSeparator: '__',
  mSeparator: '_',
  statePrefix: 'is-',
} as Required<NamespaceOptions>

const isString = (v: any): boolean => v && typeof v === 'string'

export function Bem(prefix: string = nsDefaultConfig.mSeparator) {
  return (block: string, ...args: CommandArgs): string[] => {
    const classNames = [block]

    for (const arg of args) {
      if (isString(arg)) {
        if (arg === 'default') continue
        classNames.push(`${prefix}${arg}`)
      }
      else if (Array.isArray(arg)) {
        for (const modifier of arg) {
          if (modifier === 'default') continue
          classNames.push(`${prefix}${modifier}`)
        }
      }
      else if (typeof arg === 'object') {
        for (const key in arg) {
          if (key !== 'default' && arg[key]) {
            classNames.push(`${prefix}${key}`)
          }
        }
      }
    }
    return classNames
  }
}

export function useNamespace<T extends NamespaceValue, R = NamespaceResult<T>>
(values: T, options: NamespaceOptions = nsDefaultConfig): R {
  const { namespace: prefix, eSeparator, mSeparator, statePrefix } = {
    ...nsDefaultConfig,
    ...(options ?? {})
  }

  function genNamespace(name: NamespaceValue) {
    const block = `${prefix.concat('-')}${name}`
    const namespace = (...args: CommandArgs): string[] => Bem(mSeparator)(block, ...args)

    namespace.is = (...args: CommandArgs): string[] => Bem(statePrefix)('', ...args).slice(1)
    namespace.child = (child: string, ...args: CommandArgs): string[] => {
      const childBlock = `${block}${eSeparator}${child}`
      return Bem(mSeparator)(childBlock, ...args)
    }

    return namespace
  }

  if (isString(values)) {
    return genNamespace(values) as R
  }

  if (Array.isArray(values)) {
    return values.map(genNamespace) as R
  } else {
    if (typeof values !== 'object') throw new TypeError('Invalid parameter type. Expected an object.')
    const resultMap: Record<string, NamespaceResultItem> = {};

    for (const [key, value] of Object.entries(values)) {
      resultMap[key] = genNamespace(value)
    }

    return resultMap as R
  }
}
