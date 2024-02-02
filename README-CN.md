# ns

这是一个生成不完全 BEM 风格类名的库。

## 安装

```bash
pnpm add -D @icxy/ns
```

## 用法

下面以 vue 应用程序为例。

在你的 vite.config.ts：

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

在你的组件中：

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

更详细的用例，请查看或运行[测试文件](./src/__test__/index.test.ts)
