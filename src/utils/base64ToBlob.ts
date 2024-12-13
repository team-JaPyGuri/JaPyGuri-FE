export const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteString = atob(base64.split(",")[1]);
  const arrayBuffer = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    arrayBuffer[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mimeType });
};
