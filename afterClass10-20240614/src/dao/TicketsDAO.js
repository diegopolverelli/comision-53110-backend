import { ticketModelo } from "./models/ticketModelo.js";

export class TicketsDAO{
    async create(ticket){
        let nuevoTicket=await ticketModelo.create(ticket)
        return nuevoTicket.toJSON()
    }
}