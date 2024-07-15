import express from 'express';
import Stripe from "stripe"
import cors from "cors"
const stripe = Stripe("api secret stripe")

const PORT=8080;

const app=express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

// http://localhost:8080/api/payments/payment-intents?id=3

app.post("/api/payments/payment-intents", async (req, res) => {

    let {id}=req.query
    // validar importe o info del front...
    console.log("llego")
    const mockCart = [
        { id: 1, name: "papas", price: 1000 },
        { id: 2, name: "queso", price: 500 },
        { id: 3, name: "hamburguesa", price: 1500 },
        { id: 4, name: "soda", price: 1000 },
        { id: 5, name: "golosinas", price: 800 }
    ]
    let producto=mockCart.find(p=>p.id===+id)

    // 4) solicitar payment-intent a stripe
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: producto.price,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    // payload.client_secret
    res.send({
        // clientSecret: paymentIntent.client_secret,
        payload:{
            client_secret: paymentIntent.client_secret
        }
    });

})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
