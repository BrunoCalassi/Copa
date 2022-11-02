import Fastify from "fastify"; //ligação entre back e front npm i fastify
import { PrismaClient } from "@prisma/client"; //prisma conexão com banco de dados npm i @prisma/client
// npx prisma migrate dev
// npx prisma studio  tipo django admin ve o bd
import  cors  from "@fastify/cors";
import {z} from 'zod' // confere se o post está certo antes de mandar pro bd
import ShortUniqueId from 'short-unique-id' // id aleatorio
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


  fastify.get("/users/count", async () => {
    const count = await prisma.user.count()

    return { count };
  });

  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count()

    return { count };
  });

  fastify.post("/pools", async (request,reply) => {
    const createPoolBody = z.object({
      title:z.string(),
    })
    const {title} = createPoolBody.parse(request.body)

    const generate = new ShortUniqueId({length:6})
    const code = String(generate()).toUpperCase()
    await prisma.pool.create({
      data:{
        title,
        code:code
      }
    })
    return reply.status(201).send({ code }); //reposta mais completa usa o reply
  });
  await fastify.listen({ port: 3333,host:'0.0.0.0' });
}
bootstrap();
