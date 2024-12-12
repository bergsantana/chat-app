import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { ChatInterface } from "./chat.schema"


@Injectable()
export class ChatsService {
    constructor(
        @InjectModel('chats') private chatModel: Model<ChatInterface>,
    ){}

    async create(chatDTO: ChatInterface){
        const newChat = new this.chatModel({
            parcipantsEmails: chatDTO.parcipantsEmails 
        })
        console.log("recebido", chatDTO)
        console.log("model", newChat)
        newChat.parcipantsEmails = (chatDTO.parcipantsEmails)
          
        console.log("after", newChat)
       return await newChat.save()


    }

    async getChatsByEmail(email: string){
        const found = await this.chatModel.find({
            parcipantsEmails: email
        })

        return found
    }
}
 