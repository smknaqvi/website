declare module '@graphcms/utils' {
  interface VerifyWebhookSignatureProps {
    rawPayload?: Request;
    body?: unknown;
    signature: string;
    secret: string;
  }

  export function verifyWebhookSignature({
    rawPayload,
    body,
    signature,
    secret,
  }: VerifyWebhookSignatureProps): boolean;
}
