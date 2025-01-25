import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export const createPaymentIntent = async (amount) => {
    const stripe = await stripePromise;

    const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await response.json();
    return clientSecret;
};
