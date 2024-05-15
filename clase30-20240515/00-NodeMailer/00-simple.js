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

const enviarMail=()=>{
    return transporter.sendMail(
        {
            from: "Diego Polverelli diegopolverelli@gmail.com",
            to: "diegopolverelli@hotmail.com",
            subject: "Prueba envio mail simple",
            // text: "prueba de mail con texto plano",
            html: `<h2>Prueba de envío de mails</h2>
<p><strong style="color: red;">Hola...!!!</strong></p>`
        }
    )
}

enviarMail()
    .then(res=>console.log(res))
    .catch(error=>console.log(error))
