// src/types/shared.d.ts
declare module 'shared/types/errors' {
  // Put only what src/api-types.ts actually imports/uses as *types*
  export type MyErrorType = { message: string; code?: string };
}
