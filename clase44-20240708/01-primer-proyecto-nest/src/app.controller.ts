import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Logger, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Request as expressRequest } from 'express';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("holamundo")
  getHello(): string|number {
    return this.appService.getHello();
  }

  @Get("saludo")
  saludar(@Query("nombre") nombre:string, @Query("edad", ParseIntPipe) edad:number):string{
    // edad=false

    // edad=Number(edad)
    // if(isNaN(edad)){
    //   throw new HttpException("edad debe ser numérico", HttpStatus.BAD_REQUEST)
    // }

    if(!nombre){
      // throw new HttpException("Complete query param nombre", 400)
      throw new HttpException("Complete query param nombre", HttpStatus.BAD_REQUEST)
    }

    if(!edad){
      throw new BadRequestException("Complete la edad...!!!")
    }
    // edad=false

    Logger.debug(nombre)
    Logger.debug(typeof edad)
    Logger.debug({edad})
    return `Hola, ${nombre}...!!!`
  }

  @Get("prueba")
  prueba(@Request() req:expressRequest){
    console.log(req.query)
    console.log(req.url)
    return "Ruta prueba...!!!"
  }

  @Get("suma/:num1/:num2")
  sumar(@Param("num1", ParseIntPipe) num1:number, @Param("num2", ParseIntPipe) num2:number, @Query("duplica", new ParseBoolPipe({optional:true})) duplica:boolean):number{

    return duplica?(num1+num2)*2:(num1+num2)
  }

  @Post("users")
  creauser(@Body() body){
    Logger.debug(body)
    let user=this.appService.grabaUser(body)
    return {
      user
    }
  }

} // fin modulo

// @UseGuards(JwtAuthGuard)
// 	@Get('/get-template/:template/location/:location/:platform')
// 	public async getTemplate(@Req() payload, @Param() params: ParamGetTemplateDto, @Query(new ValidationPipe(QueryGetTemplateJoi)) query: QueryGetTemplateDto): Promise<ITemplate | IFile[]> {
// 		return await this.getTemplateService.getTemplate(payload.user, params, query);
// 	}

// y este seria el joi donde pueden ir agregando mas propiedades : import * as Joi from 'joi';

// export const QueryGetTemplateJoi = Joi.object({
// 	active: Joi.boolean().optional(),
// });