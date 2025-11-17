import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationError, ErrorType } from '../../../application/exceptions/application-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    
    this.logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      'GlobalExceptionFilter'
    );

    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let error = 'Internal Server Error';

    
    if (exception instanceof ApplicationError) {
      message = exception.message;
      
      switch (exception.type) {
        case ErrorType.VALIDATION:
          status = HttpStatus.BAD_REQUEST;
          error = 'Validation Error';
          break;
          
        case ErrorType.DUPLICATE:
          status = HttpStatus.CONFLICT;
          error = 'Duplicate Entry';
          break;
          
        case ErrorType.NOT_FOUND:
          status = HttpStatus.NOT_FOUND;
          error = 'Resource Not Found';
          break;
          
        case ErrorType.BUSINESS:
          status = HttpStatus.BAD_REQUEST;
          error = 'Business Rule Violation';
          break;
          
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          error = 'Application Error';
      }
    }
    
    
    else if (exception.name === 'MongoError' || exception.name === 'MongoServerError') {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      error = 'Database Error';
      message = 'An error occurred while processing your request';
    }

    
    const errorResponse = {
      statusCode: status,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}
