const secret = 12345;

export function generateUniqueToken(input: string): string {
  const token: string = (input.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) * secret).toString(16);
  return token;
}
