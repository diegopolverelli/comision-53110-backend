import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

import bcrypt from "bcrypt"
import passport from "passport"
export const SECRET="CoderCoder123"


export const generaHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validaPassword=(password, passwordHash)=>bcrypt.compareSync(password, passwordHash)

export const passportCall=(estrategia, permisos=[])=>{
    return function(req, res, next) {

      if(permisos.includes("public") || permisos.includes("PUBLIC")) return next()

        passport.authenticate(estrategia, function(err, user, info, status) {
          if (err) { return next(err) }
          if (!user) {
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({
                error: info.message?info.message:info.toString()
            })
          }
        //   res.redirect('/account');
        req.user=user
        return next()
        })(req, res, next);
      }
}



// app.get('/protected', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info, status) {
//     if (err) { return next(err) }
//     if (!user) { return res.redirect('/signin') }
//     res.redirect('/account');
//   })(req, res, next);
// });