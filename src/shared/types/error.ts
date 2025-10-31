// src/types/shared.d.ts
declare module 'shared/types/errors' {
  // Put just the types used by src/api-types.ts
  export type MyErrorType = {
    message: string;
    code?: string;
  };

  // add any other types you import from this module:
  // export type AnotherType = { ... };
}

// src/shared/types/errors.ts  (ONLY if you truly need runtime values)
export class RateLimitExceededError extends Error {}
export class SecurityError extends Error {}
export type SecurityErrorType = 'forbidden' | 'unauthorized' | 'rate_limit';
