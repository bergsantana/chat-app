import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserInterface } from "./user.schema";


@Injectable()
export class UserService {
    constructor(@InjectModel("user") private userModel: Model<UserInterface> ){}

    async create(data: { email: string, password: string }){
        const newUser = new this.userModel(data)
        console.log("NOVO USUARIO", newUser);

        await newUser.save()
        return newUser

    }

    async findOne(email: string) {
        return await this.userModel.findOne({email})
    }
}