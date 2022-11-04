import Fastify from "fastify"; //ligação entre back e front npm i fastify
// npx prisma migrate dev
// npx prisma studio  tipo django admin ve o bd
import cors from "@fastify/cors";
// import {z} from 'zod' // confere se o post está certo antes de mandar pro bd
// import ShortUniqueId from 'short-unique-id' // id aleatorio
import jwt from "@fastify/jwt";
import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { gameRoutes } from "./routes/game";
import { authRoutes } from "./routes/auth";


// singleton reaproveitar etre os arquivos

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  //mudar pra variavel
  await fastify.register(jwt,{
    secret:'nlwcopa',

  })

  await fastify.register(poolRoutes);
  await fastify.register(authRoutes);
  await fastify.register(userRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(gameRoutes);

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}
bootstrap();
