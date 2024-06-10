import express from 'express';
import { router as sessionsRouter } from './routes/sessionsRouter.js';
import mongoose from 'mongoose';
import { config } from './config/config.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('./src/public'))

app.use('/api/sessions', sessionsRouter)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

try {
    await mongoose.connect(config.MONGO_URL, {dbName: config.DB_NAME})
    console.log('DB online...!!!')
} catch (error) {
    console.log(`Error de conexión a BD: ${error.message}`)
}
