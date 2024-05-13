export class HeroesDTO{
    constructor(heroe){
        this.nombre=heroe.name.toUpperCase()
        this.identidad=heroe.alias.toUpperCase()
        this.enemigos=heroe.enemies.map(e=>e.name.toUpperCase())
    }
}