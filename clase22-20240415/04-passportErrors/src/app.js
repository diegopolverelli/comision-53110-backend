import express from 'express';
import cookieParser from "cookie-parser"
import passport from 'passport';
import { initPassport } from './config/passport.config.js';
import { router as sessionsRouter} from './routes/sessions.router.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
initPassport()
app.use(passport.initialize())
// app.use(passport.session())  // no va, porque no uso Sessions...!!!
app.use(cookieParser("CoderCoder123"))
app.use(express.static("./src/public"))

app.use("/api/sessions", sessionsRouter)

// app.get('/',(req,res)=>{
//     res.setHeader('Content-Type','text/plain');
//     res.status(200).send('OK');
// })



const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
