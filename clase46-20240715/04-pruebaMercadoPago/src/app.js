import express from 'express';
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'api Secret PRODUCCION de mercado pago... usar para pruebas, la de la integracion creada en la cuenta Test Vendedor... ver aclaraciones txt MercadoPagoDevelopers' });

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))

app.post('/pagar', async (req, res) => {

    let {importe}=req.body
    importe=parseFloat(importe)
    if(importe<1 || isNaN(importe)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Importe inválido`})
    }

    const preference = new Preference(client);

    let resultado=await preference.create({
        body: {
            items: [
                {
                    id: 'CODIGO_PRUEBA',
                    title: 'PRODUCTO_PRUEBA',
                    quantity: 1,
                    unit_price: importe
                }
            ],
            back_urls: {
                "success": "http://localhost:3000/feedback",
                "failure": "http://localhost:3000/feedback",
                "pending": "http://localhost:3000/feedback"
            },
            auto_return: "approved",
        }
    });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({id:resultado.id});
})

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
