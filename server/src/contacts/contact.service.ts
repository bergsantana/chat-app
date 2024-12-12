import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContactInterface } from "./contacts.schema";
import { UserInterface } from "src/user/user.schema";

@Injectable()
export class ContactService {
    constructor(
        @InjectModel("contact") private contactModel: Model<ContactInterface>,
        @InjectModel("user") private userModel: Model<UserInterface> 

    ){}

    async create(data: ContactInterface){
        const newContact = new this.contactModel(data)
        console.log(data)
        const findOwner = await this.userModel.find({email: data.ownerEmail})
        const findContact = await this.userModel.find( {email: data.contactEmail})
        console.log("findOwner findContact ", findOwner, findContact)
        if(findContact.length && findOwner.length) await newContact.save()
       // await newContact.save()
        return newContact

    }

    async findAllByUser(email: string) {
        return await this.contactModel.find({ ownerEmail: email})
    }
}