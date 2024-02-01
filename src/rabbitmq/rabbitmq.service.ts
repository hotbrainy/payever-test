import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(@Inject('RABBITMQ_SERVICE') private client: ClientProxy) {}

  emitMessage(pattern: string, message: any) {
    return this.client.emit(pattern, message);
  }
}
