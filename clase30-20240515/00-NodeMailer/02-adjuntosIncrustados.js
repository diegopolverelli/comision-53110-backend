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
let nroTicket="9999000022"
const enviarMail=()=>{
    return transporter.sendMail(
        {
            from: "Diego Polverelli diegopolverelli@gmail.com",
            to: "diegopolverelli@hotmail.com",
            subject: "Prueba envio mail simple c/adjuntos incrustados",
            // text: "prueba de mail con texto plano",
            html: `<h2>Prueba de envío de mails</h2>
<img src="cid:imagen02" width="150">
<p><strong style="color: red;">Hola...!!! su pedido es el ${nroTicket}</strong></p> Contacto:
<img src="cid:imagen01" width="150">
<img src="cid:imagen03" width="150">
`

,
            attachments: [
                {
                    path: "./images/diego10.jpg",
                    filename: "elDiego.jpg",
                    cid: "imagen01"
                },
                {
                    path: "./images/lio.jpg",
                    filename: "lio.jpg",
                    cid: "imagen02"
                },
                {
                    path: "./images/lio2.jpg",
                    filename: "otraDeLio.jpg",
                    cid: "imagen03"
                },
            ]
        }
    )
}

enviarMail()
    .then(res=>console.log(res))
    .catch(error=>console.log(error))
