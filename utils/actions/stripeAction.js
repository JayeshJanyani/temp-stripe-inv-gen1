import Stripe from 'stripe';


export async function getCharges(email, businessData) {
    console.log(email, businessData);

    if (!businessData.api_key || businessData.api_key.trim() === '') {
        throw new Error('Stripe API key is missing or invalid');
    }

    const stripe = new Stripe(businessData.api_key); // Add API version

    try {
        const charges = await stripe.checkout.sessions.list({
            limit: 100,
            customer_details: {
                email: email
            },
            expand: ["data.line_items"]
        });

        console.log(charges.data);

        // Return only serializable data
        return charges.data.map(charge => ({
            id: charge.id,
            amount_total: charge.amount_total,
            currency: charge.currency,
            status: charge.status,
            // customer: charge.customer_details,
            line_items: charge.line_items,
            total_details: charge.total_details,
            amount_subtotal: charge.amount_subtotal,
            customer_details: charge.customer_details,
            created_date: charge.created,

            // Add other necessary fields
        }));
    } catch (error) {
        console.error('Error fetching charges:', error);
        throw error; // Re-throw the error for handling in the calling function
    }
}