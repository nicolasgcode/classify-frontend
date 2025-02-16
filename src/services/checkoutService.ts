import axios from '../libs/axios';

interface CheckoutResponse {
  url: string;
}

export const createCheckout = async (
  data: { id: number; name: string; price: number }[],
  userId: number
): Promise<CheckoutResponse> => {
  try {
    const response = await axios.post<CheckoutResponse>('/api/checkout', {
      data,
      userId,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error(
      'Error creating checkout session: ' + (err as Error).message
    );
  }
};
