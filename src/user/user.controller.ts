import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { MailService } from '../mail/mail.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rabbitMQService: RabbitMQService,
    private readonly mailService: MailService,
  ) {}

  @Post('/api/users')
  create(@Body() createUserDto: CreateUserDto) {
    // emit create user to rabbit
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    this.rabbitMQService.emitMessage('create_user', createUserDto);
    return this.userService
      .create(createUserDto)
      .then((newUser) => {
        if (newUser.email) {
          this.mailService.sendUserConfirmation(newUser, token);
        }
        return newUser;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  @Get('/api/user/:id')
  findOne(@Param('id') id: string) {
    // emit get user to rabbit
    this.rabbitMQService.emitMessage('get_user', id);
    return this.userService.findOne(id);
  }
}
