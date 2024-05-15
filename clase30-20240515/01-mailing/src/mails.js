import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        service: "gmail", 
        port: 587,
        auth: {
            user: "diegopolverelli@gmail.com",
            pass: "wxlfiedpvzpenlvt"
        }
    }
)

export const enviarMail=(to, subject, message, attachments)=>{
    return transporter.sendMail(
        {
            from: "Diego Polverelli diegopolverelli@gmail.com",
            to,
            subject,
            // text: "prueba de mail con texto plano",
            html: message,
            attachments
        }
    )
}


