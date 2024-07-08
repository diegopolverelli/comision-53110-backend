import { IsOptional, IsString } from "class-validator"

export class CreateHeroDto {

    @IsString({message:"La propiedad name es requerida, y tiene que ser de tipo string"})
    name:string
    
    @IsString({message:"La propiedad alias tiene que ser de tipo string"})
    @IsOptional()
    alias?:string
}

// let heroe1=new CreateHeroDto()