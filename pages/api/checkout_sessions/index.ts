import { NextApiRequest, NextApiResponse } from 'next'
import stripe, { formatAmountForStripe } from '../../../libs/stripe/api'
import Stripe from 'stripe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const amount: number = req.body.amount
        try {
            // Validate the amount that was passed from the client.
            if (!(amount >= 0.1 && amount <= 5000)) {
                throw new Error('Invalid amount.')
            }
            // Create Checkout Sessions from body params.
            const params: Stripe.Checkout.SessionCreateParams = {
                submit_type: 'donate',
                payment_method_types: ['card'],
                line_items: [{ price: 'price_1MAhhhE4wXrKy4QJ1yw8HJdT', quantity: 2 }],
                mode: 'payment',
                success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/donate-with-checkout`,
            }
            const checkoutSession: Stripe.Checkout.Session =
                await stripe.checkout.sessions.create(params)

            res.status(200).json(checkoutSession)
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'Internal server error'
            res.status(500).json({ statusCode: 500, message: errorMessage })
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}