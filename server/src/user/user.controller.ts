import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";


@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService){}

    @Post('register')
    async create(@Body() data: { email: string, password: string }){
        return await this.userService.create(data)
    }

    @Get('login/:email')
    async login(@Param('email') email: string ) {
        return await this.userService.findOne(email)
    }
}