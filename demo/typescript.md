# typescript

实现 Omit和Pick
```js
interface User {
  name?: string
}

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P] 
}

type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

type PickUser = MyPick<User, 'name'>
```

## infer
类型推断 infer R ? R : never