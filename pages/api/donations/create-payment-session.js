import Stripe from "stripe";

let stripe = Stripe(process.env.STRIPE_SECRET)

export default async function handler(req, res) {
  let { value } = req.query
  value = value.replace('.', '')
  if (!RegExp('^[0-9]+$').test(value)) {
    res.status(400).json({ error: 'Invalid donation value' })
  }

  let valueCheck = Number.parseFloat(value)
  if (!(valueCheck > 0)) {
    res.redirect(303, '/donate')
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
    success_url: process.env.STRIPE_SUCCESS_REDIRECT,
    cancel_url: process.env.STRIPE_CANCEL_REDIRECT,
  });

  res.redirect(303, session.url);
}
