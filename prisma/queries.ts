import { PrismaClient } from '@prisma/client';

/* npm run queries */

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: {
      interviews: true,
    },
  });

  console.log(users);

  users.forEach((user) => {
    console.log(`User: ${user.email || user.id}`);

    if (!user.interviews || user.interviews.length === 0) {
      console.log('No interviews found');
    } else {
      console.log(`Interviews number: ${user.interviews.length}`);
      user.interviews.forEach((interview, index) => {
        console.log(`Interview ${index + 1}:`);
        console.log(`Position: ${interview.position}`);
        console.log(`Difficulty: ${interview.difficulty}`);
        console.log(`Type: ${interview.interviewType}`);
        console.log(`Number of Questions: ${interview.numberOfQuestions}`);
        console.log(`Stack: ${interview.stack.join(', ')}`);
      });
    }
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
