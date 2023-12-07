"use server"

import { UserRole } from "@prisma/client";
import { getCurrentUserSession } from "./authActions";
import prisma from "@/lib/db";

export async function getResources(username: string = '', roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && (session.user.role in roles))) return null

  return await prisma.resource.findMany({where: {authorUsername: username}})
}