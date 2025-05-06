import { PrismaClient } from '@prisma/client';

/*npm run queries*/

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: {
      data: {
        include: {
          interview: true,
        },
      },
    },
  });

  console.log(users);

  users.forEach((user) => {
    console.log('---');
    console.log(`User: ${user.email || user.id}`);
    if (!user.data) {
      console.log('No Data linked');
    } else {
      console.log(`Data ID: ${user.data.id}`);
      console.log(`Interviews number: ${user.data.interview.length}`);
      user.data.interview.forEach((interview, index) => {
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
