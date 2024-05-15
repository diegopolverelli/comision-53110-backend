const accountSid = 'de twilio';
const authToken = 'de twilio';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Prueba de mensaje...!!!',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491154200776'
    })
    .then(message => console.log(message.sid))
