import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './contacts.schema';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'contact',
        schema: ContactSchema,
      },
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
