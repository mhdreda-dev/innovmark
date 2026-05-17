import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

function adminEmails() {
  const rawEmails = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "admin@innovmark.com";
  return rawEmails
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

async function main() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD is required to seed an admin user.");
  }

  const [email] = adminEmails();
  if (!email) {
    throw new Error("ADMIN_EMAILS or ADMIN_EMAIL must contain at least one email.");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({
      where: { email },
      data: {
        role: "ADMIN",
        isActive: true,
        name: existing.name ?? "Innovmark Admin",
      },
    });
    console.log(`Admin user already exists and is active: ${email}`);
    return;
  }

  const passwordHash = await hash(password, 12);
  await prisma.user.create({
    data: {
      email,
      name: "Innovmark Admin",
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });
  console.log(`Created admin user: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
