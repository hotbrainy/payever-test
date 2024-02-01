import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('rabbitmq')
export class RabbitmqController {
  @MessagePattern('hello')
  hello(data: string): string {
    console.log(data);
    return `Hello ${data}!`;
  }
}
