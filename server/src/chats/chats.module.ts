import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatSchema } from "./chat.schema";
import { ChatsController } from "./chats.controller";
import { ChatsService } from "./chats.service";

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: 'chats',
          schema: ChatSchema,
        },
    
      ]),
    ],
    controllers: [ChatsController],
    providers: [ChatsService],
  })
  export class ChatsModule {}