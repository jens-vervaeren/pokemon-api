import { NestFactory } from "@nestjs/core"
import { VersioningType } from "@nestjs/common"
import { AppModule } from "./modules/app/app.module"
import { HttpErrorFilter } from "./filters/http-error.filter"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Api versioning
  app.setGlobalPrefix("api")
  app.enableVersioning({
    type: VersioningType.URI
  })
  // Global filters
  app.useGlobalFilters(new HttpErrorFilter())
  // Start application
  console.log("Application listening on port: 3000")
  await app.listen(3000)
}
bootstrap()
