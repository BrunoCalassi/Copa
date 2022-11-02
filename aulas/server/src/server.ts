import Fastify from "fastify"; //ligação entre back e front npm i fastify
import { PrismaClient } from "@prisma/client"; //prisma conexão com banco de dados npm i @prisma/client
// npx prisma migrate dev
// npx prisma studio  tipo django admin ve o bd
import  cors  from "@fastify/cors";
const prisma = new PrismaClient({
  log: ["query"],
});
async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors,{
    origin: true,
  })

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count()

    return { count };
  });
  await fastify.listen({ port: 3333,host:'0.0.0.0' });
}
bootstrap();
