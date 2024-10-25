import { compare, hash } from 'bcryptjs';

export async function compareHash(
  data: string,
  hashToCompare: string,
): Promise<boolean> {
  return await compare(data, hashToCompare);
}

export async function createHash(data: string): Promise<string> {
  return await hash(data, 10);
}
