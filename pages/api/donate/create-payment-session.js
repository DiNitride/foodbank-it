import Stripe from "stripe";

let stripe = Stripe(process.env.STRIPE_SECRET)

export default async function handler(req, res) {
  console.log('Donational')
  let { value } = req.query
  value = value.replace('.', '')
  if (!RegExp('^[0-9]+$').test(value)) {
    res.status(400).json({ error: 'Invalid donation value' })
  }
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Donation',
          },
          unit_amount: value,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/donate/success',
    cancel_url: 'http://localhost:3000/',
  });

  res.redirect(303, session.url);
}