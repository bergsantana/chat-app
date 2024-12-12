import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ContactModule } from './contacts/contact.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ChatModule,
    MongooseModule.forRoot("mongodb://localhost:27017/chat-v1"),
    UserModule,
    ContactModule,
    ChatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
