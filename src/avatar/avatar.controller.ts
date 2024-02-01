import { Controller, Get, Param, Delete } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Controller('')
export class AvatarController {
  constructor(
    private readonly avatarService: AvatarService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Get('/api/user/:id/avatar')
  findOne(@Param('id') id: string) {
    this.rabbitMQService.emitMessage('get_avatar', id);
    return this.avatarService.findOne(id);
  }

  @Delete('/api/user/:id/avatar')
  remove(@Param('id') id: string) {
    this.rabbitMQService.emitMessage('delete_avatar', id);
    return this.avatarService.deleteOne(id);
  }
}
