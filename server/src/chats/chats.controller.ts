import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatInterface } from './chat.schema';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('create-chat')
  async create(@Body() data: ChatInterface) {
    return await this.chatsService.create(data);
  }

  @Get('/parctipant/:email')
  async findAllByUser(@Param('email') email: string) {
    return await this.chatsService.getChatsByEmail(email);
  }
}
