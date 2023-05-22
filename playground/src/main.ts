import './style.css'

interface ModuleType {
  name: string
}
const list = import.meta.globNext<ModuleType>('./fixtures/*.ts')
await Promise.all(Object.values(list).map(i => i())).then((modules) => {
  document.querySelector<HTMLDivElement>('#app')!.textContent = JSON.stringify(modules)
})
