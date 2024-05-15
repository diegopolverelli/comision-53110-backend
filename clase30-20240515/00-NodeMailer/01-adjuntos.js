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
            subject: "Prueba envio mail simple c/adjuntos",
            // text: "prueba de mail con texto plano",
            html: `<h2>Prueba de envío de mails</h2>
<p><strong style="color: red;">Hola...!!!</strong></p>`,
            attachments: [
                {
                    path: "./images/diego10.jpg",
                    filename: "elDiego.jpg"
                },
                {
                    path: "./images/lio.jpg",
                    filename: "lio.jpg"
                },
                {
                    path: "./images/lio2.jpg",
                    filename: "otraDeLio.jpg"
                },
            ]
        }
    )
}

enviarMail()
    .then(res=>console.log(res))
    .catch(error=>console.log(error))
