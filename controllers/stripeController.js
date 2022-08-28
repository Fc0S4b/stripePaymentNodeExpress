const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {
  // console.log(req.body);
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    // el proceso aquí es: iteras sobre una lista de items (productos), te comunicas con la database para obtener los valores correctos de precio porque debes verificar que el frontend te entrega los valores correctos. En este ejemplo se reduce a hacer una demo simple
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  });
  console.log(paymentIntent);
  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
