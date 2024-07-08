import { Injectable } from '@nestjs/common';

export class AppService {

  users:any[]
  constructor(){
    this.users=[]
  }

  getHello(): string|number {
    // return 'Hello World!';
    return "Hola mundo...!!!"
  }

  grabaUser(user){
    let id=1
    if(this.users.length>0){
      id=Math.max(...this.users.map(d=>d.id))+1
    }
    let nuevoUsuario={id, ...user}
    this.users.push(nuevoUsuario)
    return nuevoUsuario

  }

}
