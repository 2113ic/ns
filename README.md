# ns

This is a library for generating partially BEM-style class names.

## Installation

```bash
pnpm add -D @icxy/ns
```

## Usage

Here is an example using a Vue application.

In your vite.config.ts:

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@icxy/ns/dist/ns';`
      },
    },
  },
})
```

In your component:

```vue
<script setup lang="ts">
import { useNameSpace } from '@icxy/ns'

const [login, btn] = useNameSpace(['login', 'btn'])
</script>

<template>
  <div :class="login()">
    <h2>Login</h2>
    <form>
      <div :class="login.child('item')">
        <label for="account">Account: </label>
        <input id="account" placeholder="account">
      </div>
      <div :class="login.child('item')">
        <label for="password">Password: </label>
        <input id="password" type="password" placeholder="password">
      </div>
      <div :class="login.child('item')">
        <button :class="btn()">submit</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@include ns.b('login') {
  width: 300px;
  margin: 125px auto 0;
  padding: 24px;
  border: 2px solid #eee;
  border-radius: 12px;
  box-sizing: border-box;

  h2 { margin-top: 0; }

  @include ns.e('item') {
    margin: 12px 0;

    &:last-child { text-align: right; }
    label { line-height: 28px; }
    input {
      display: block;
      width: 100%;
      line-height: 32px;
      font-size: inherit;
      padding: 0 8px;
      box-sizing: border-box;
    }
  }

  @include ns.b('btn') {
    padding: 4px 8px;
  }
}
</style>
```

For more detailed examples, please refer to or run the [test file](./src/__test__/index.test.ts).
