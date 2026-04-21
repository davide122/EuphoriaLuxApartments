import { cookies } from "next/headers";

export const ADMIN_COOKIE = "noir_admin";

export function getAdminToken() {
  const token = process.env.NOIR_ADMIN_TOKEN?.trim();
  return token && token.length >= 12 ? token : null;
}

export function getAdminPassword() {
  const password = process.env.NOIR_ADMIN_PASSWORD?.trim();
  return password && password.length >= 6 ? password : null;
}

export async function isAdmin() {
  const token = getAdminToken();
  if (!token) return false;
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === token;
}

