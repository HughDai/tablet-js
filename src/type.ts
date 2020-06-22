export interface GetSet<Type, This> {
  (): Type
  (v: Type): This
}
