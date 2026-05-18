import { getPrisma } from "@/lib/cms/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrisma();

  if (!prisma) {
    return Response.json({
      userCount: 0,
      adminExists: false,
    });
  }

  const adminUser = await prisma.user.findUnique({
    where: {
      email: "admin@innovmark.com",
    },
  });

  return Response.json({
    userCount: await prisma.user.count(),
    adminExists: !!adminUser,
  });
}
