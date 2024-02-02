import { useNamespace } from "../index.ts"

const btn = useNamespace('btn')
// or
// const [btn, login] = useNamespace(['btn', 'login'])

// or
// const [btn, login] = useNamespace({ 
//   btn: 'button', login: 'sign-in' 
//          ⬆ alias          ⬆ alias
// })

// block
console.log(btn())
// -> ['x-btn']

// modifier
console.log(btn('success', 'warning'))
// -> ['x-btn', '_success', '_warning']
console.log(btn(['success', 'warning', 'danger']))
// -> ['x-btn', '_success', '_warning', '_danger']
console.log(btn({ success: true, warning: false }))
// -> ['x-btn', '_success']

// element
console.log(btn.child('inner'))
// ['x-btn__inner']

console.log(btn.child('inner', 'success'))
// ['x-btn__inner', '_success']
console.log(btn.child('inner', ['warning', 'danger']))
// ['x-btn__inner', '_warning', '_danger']
console.log(btn.child('inner', { warning: true, danger: false }))
// ['x-btn__inner', '_warning']

// state
console.log(btn.is('loadding'))
// ['is-loadding']
