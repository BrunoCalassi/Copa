import Fastify from "fastify"; //ligação entre back e front
import { PrismaClient } from "@prisma/client"; //prisma conexão com banco de dados

const prisma = new PrismaClient({
  log: ["query"],
});
async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.get("/pools/count", async () => {
    const pools = await prisma.pool.findMany({
      where: {
        code: {
          startsWith: "D",
        },
      },
    });

    return { pools };
  });
  await fastify.listen({ port: 3333 });
}
bootstrap();
