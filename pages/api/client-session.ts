import type { NextApiRequest, NextApiResponse } from 'next';

const PRIMER_API_URL = {
  DEV: 'https://api.dev.primer.io',
  SANDBOX: 'https://api.sandbox.primer.io',
  PRODUCTION: 'https://api.primer.io',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const url = `${PRIMER_API_URL.DEV}/client-session`;

    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Version': '2.1',
        'X-Api-Key': process.env.API_KEY,
      },
      body: JSON.stringify({
        // Create an orderId for this client session
        // Make sure to keep track of it: you will later receive updates through Webhooks.
        orderId: 'order-' + Math.random(),

        // 3-character Currency Code used for all the amount of this session
        currencyCode: 'EUR',

        order: {
          // Line items for this session
          // If your checkout does not have line items:
          //  > Pass a single line item with the total amount!
          lineItems: [
            {
              itemId: 'shoes-123',
              description: 'Some nice shoes!',
              amount: 2500, // Amount should be in minor units!
              quantity: 1,
            },
          ],
        },

        // Check all the other options at https://apiref.primer.io/v2/reference/create_client_side_token_client_session_post
      }),
    }).then((data) => data.json());

    res.status(200).send(response);
  } else {
    // Handle any other HTTP method
  }
}
