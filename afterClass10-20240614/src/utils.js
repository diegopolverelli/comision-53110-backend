import { fileURLToPath } from 'url';
import nodemailer from "nodemailer"
import { dirname } from 'path';
import bcrypt from "bcrypt"
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const generaHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validaPass = (pass, hash) => bcrypt.compareSync(pass, hash)

export const passportCall = (estrategia) => function (req, res, next) {
    passport.authenticate(estrategia, function (err, user, info, status) {
        if (err) { return next(err) }
        if (!user) {
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:info.message?info.message:info.toString()})
        }
        // res.redirect('/account');
        req.user=user
        return next()
    })(req, res, next);
}

const transporter=nodemailer.createTransport(
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
    return await transporter.sendMail(
        {
            from: "Empresas Cuchuflito diegopolverelli@gmail.com",
            to, 
            subject, 
            html: message
        }
    )
}