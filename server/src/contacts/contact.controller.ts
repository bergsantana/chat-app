import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { ContactInterface } from "./contacts.schema";
 


@Controller('contact')
export class ContactController {
    constructor( private readonly contactService: ContactService){}

    @Post('create-contact')
    async create(@Body() data:  ContactInterface){
        return await this.contactService.create( data)
    }

    @Get('/owner/:email')
    async findAllByUser(@Param('email') email: string){
        return await this.contactService.findAllByUser( email)
    }

 
}