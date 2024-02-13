import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common"
import { ZodError } from "zod"

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = 400

    response.status(status).json({
      error: "ValidationError",
      error_message: exception.message
    })
  }
}
