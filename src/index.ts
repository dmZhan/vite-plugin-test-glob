import { dirname } from 'node:path'
import type { Plugin } from 'vite'
import fg from 'fast-glob'

export interface Options {

}
const importGlobRe = /\bimport\.meta\.globNext\((.*)\)/g
export default function (_options: Options = {}): Plugin {
  return {
    name: 'vite-plugin-test-glob',
    async transform(code, id) {
      const matchs = Array.from(code.matchAll(importGlobRe))
      if (!matchs.length)
        return
      for (const match of matchs) {
        const glob = match[1].slice(1, -1)
        const files = await fg(glob, { dot: true, cwd: dirname(id) })
        const start = match.index!
        const end = start + match[0].length
        const replacement = `{${files.map(i => `'${i}': () => import('${i}')`).join(', ')}}`
        code = code.slice(0, start) + replacement + code.slice(end)
        // console.log({ code })
        // console.log({ glob, id, files })
      }
      return code
    },
  }
}
