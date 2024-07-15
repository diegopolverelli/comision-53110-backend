import express from 'express';
// This is your test secret API key.
// const stripe = require("stripe")('api secret stripe');
import Stripe from "stripe"
// 3) conectar backend con Stripe, via API Secret
const stripe = Stripe("api secret stripe")

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

app.post("/api/create-payment-intent", async (req, res) => {

    let {importe} = req.body
    // validar importe o info del front...

    // 4) solicitar payment-intent a stripe
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: importe,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });

})

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
