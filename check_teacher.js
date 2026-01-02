const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const targetName = "Miss Ayesha";
    const teacher = await prisma.teacher.findFirst({
        where: { name: targetName }
    });

    if (!teacher) {
        console.log(`Teacher ${targetName} not found.`);
    } else {
        console.log(`Found ${teacher.name}, current email: ${teacher.email}`);
        console.log("Attempting update via Prisma...");
        const updated = await prisma.teacher.update({
            where: { id: teacher.id },
            data: { email: "updated_via_script@test.com" }
        });
        console.log(`Update result: ${updated.email}`);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
