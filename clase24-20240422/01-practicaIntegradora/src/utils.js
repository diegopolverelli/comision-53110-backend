import bcrypt from "bcrypt"
import passport from "passport"
export const SECRET="CoderCoder123"


export const generaHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))


export const passportCall=(estrategia)=>{
    return function(req, res, next) {
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