// domain/.netlify/functions/create-payment-intent
require('dotenv').config(); //this line added as this is the server(node) function and here to access the .env file we need the package 'dotenv'

const stripe = require('stripe').Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
    if (event.body) {
        const { cart, shipping_fee, total_amount } = JSON.parse(event.body)
        // console.log(cart)

        const calculateOrderAmount = () => {
            return shipping_fee + total_amount;
        };
        // here in the pamentIntents, the currency is 'inr' as for individuals in India international payments is not allowed in stripe
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: "inr",
            });
            return {
                statusCode: 200,
                body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ msg: error.message })
            }
        }
    }

    return {
        statusCode: 200,
        body: 'Create payment intent',
    }

}