import { build } from 'vite'
import { resolve, basename } from 'node:path'
import fs from 'node:fs/promises'

start()

async function start() {
  await build({
    build: {
      lib: {
        entry: './src/index.ts',
        formats: ['es', 'cjs'],
        fileName: 'index',
      },
    }
  })
  await copySCSSFiles()
}

async function copySCSSFiles() {
  const sources = [
    resolve('src', 'config.scss'),
    resolve('src', 'utils.scss'),
    resolve('src', 'ns.scss'),
  ]

  for (const p of sources) {
    const name = basename(p)

    try {
      await fs.copyFile(p, resolve('./dist', name))
      console.log(name, '->', 'dist')
    } catch (err) {
      console.error(err)
    }
  }
}
