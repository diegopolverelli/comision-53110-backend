// 1) conectar front a Stripe via API
const stripe = Stripe("api publica stripe");
let elements

const cargarMedios = async () => {

    let importe = document.getElementById("importe").value
    importe = parseFloat(importe)
    if (importe < 1 || isNaN(importe)) {
        alert("Monto erroneo")
        return
    }
    importe = importe * 100

    // 12.5
    // 1250

    // 21
    // 2100

    // 2) realizo petición al back, pidiendo un payment-intent
    const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ importe }),
    });
    const { clientSecret } = await response.json();
    console.log(clientSecret)

    // 5) generar elementos de pago y asociar div de nuestro html al llamar a .mount
    const appearance = {
        theme: 'stripe',
    };
    elements = stripe.elements({ appearance, clientSecret });

    const paymentElementOptions = {
        layout: "tabs",
    };

    const paymentElement = elements.create("payment", paymentElementOptions);
    paymentElement.mount("#metodospago");
}


const pagar = async () => {

    // 6) confirmar pago a Stripe
    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:3000/index.html",
        },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    console.log(error.message)
    document.getElementById("resultado").textContent = error.message
    // if (error.type === "card_error" || error.type === "validation_error") {
    //     showMessage(error.message);
    // } else {
    //     showMessage("An unexpected error occurred.");
    // }

}


const verResultado=async(clientSecret)=>{
    // 7) recupero info del pago concretado con data de query params
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    document.getElementById("resultado").textContent=paymentIntent.status
}

// se ejecuta siempre...
const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
);

if (clientSecret) {
    verResultado(clientSecret)
}