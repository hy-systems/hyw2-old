export const aud = (v: number): string =>
  "$" + Math.round(v).toLocaleString("en-AU");

export const num = (v: number): string =>
  Math.round(v).toLocaleString("en-AU");
