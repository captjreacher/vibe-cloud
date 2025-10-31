// src/types/worker.d.ts
declare module 'worker/types/image-attachment' {
  // Define only what the client code uses as *types*
  export type ImageAttachment = {
    id: string;
    url: string;
    mimeType?: string;
    width?: number;
    height?: number;
  };
}
