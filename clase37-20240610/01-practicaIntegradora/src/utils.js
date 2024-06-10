import nodemailer from "nodemailer"

const trasnporter=nodemailer.createTransport(
    {
        service:"gmail", 
        port:"587",
        auth:{
            user:"diegopolverelli@gmail.com",
            pass: "silefxswlaeostti"
        }
    }
)

export const enviarMail=async(to, subject, message)=>{
    return await trasnporter.sendMail(
        {
            from:"Sistemas Pirulito diegopolverelli@gmail.com",
            to, subject, 
            html: message
        }
    )
}
