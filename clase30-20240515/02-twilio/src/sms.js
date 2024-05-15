import twilio from 'twilio'

const accountSid = 'de twilio';
const authToken = 'de twilio';
const client = twilio(accountSid, authToken);

client.messages
    .create({
        body: 'Prueba de mensaje...!!!',
        from: '+16813396273',
        to: '+541154200776'
    })
    .then(message => console.log(message.sid))
    .catch(error=>console.log("Error...!!! Detalle: "+error.message))
