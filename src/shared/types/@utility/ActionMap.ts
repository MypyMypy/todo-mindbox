// Custom Utility Type, that can not be made without 'any'. (if u check root ts types, you will find something like this)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionMap<M extends Record<string, any>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
