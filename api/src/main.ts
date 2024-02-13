import { NestFactory } from "@nestjs/core"
import { VersioningType } from "@nestjs/common"
import { AppModule } from "./modules/app/app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api")
  app.enableVersioning({
    type: VersioningType.URI
  })
  console.log("Application listening on port: 3000")
  await app.listen(3000)
}
bootstrap()
