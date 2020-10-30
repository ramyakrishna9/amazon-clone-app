const functions = require('firebase-functions');
const express =require("express");
const cors = require("cors");
const stripe = require("stripe")
("sk_test_51HPwinGuubKgT8QlxIfbwF9Cprt2rz8ksV3tXsLhkJsrAY6ofgmcQT8QVloplu8ekjUruOBhyF2KMoWJw6FbD8X6002Lvz2yqC");


//API


//--App config
const app = express();

//--middlewears
app.use(cors({ origin: true }));
app.use(express.json());

//--Api routes
app.get('/' ,(request, response) => response.status(200).send("hello everyone"))

app.post("/payments/create", async (request, response) =>{
    const total= request.query.total;

    console.log('payment request received >>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //submits of currency
        currency: "usd",
    });

    //ok created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

//-listen command

exports.api = functions.https.onRequest(app);
//my Api
//http://localhost:5001/clone-f09f0/us-central1/api.
