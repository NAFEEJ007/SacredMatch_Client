import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const PremiumCheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const price = 100;

    useEffect(() => {
        if (price > 0) {
            axios.post('http://localhost:5000/create-payment-intent', { price }, { withCredentials: true })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error("Error creating payment intent:", err);
                });
        }
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setProcessing(false);
            Swal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: error.message,
            });
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
            setProcessing(false);
            Swal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: confirmError.message,
            });
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            try {
                // Send request to backend to make user premium pending
                const res = await axios.patch(`http://localhost:5000/users/premium-request/${user.email}`, {}, { withCredentials: true });
                
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Premium Request Sent Successfully!',
                        text: 'Admin will review your request.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                     Swal.fire({
                        icon: 'info',
                        title: 'Request Already Sent',
                        text: 'You have already requested for premium membership.',
                    });
                }
            } catch (error) {
                console.error("Error sending premium request:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Payment succeeded but failed to send request. Please contact support.',
                });
            }
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-center">Pay $100 for Premium</h3>
            <div className="mb-6 border p-4 rounded">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            <button type="submit" disabled={!stripe || !clientSecret || processing} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-lg transform hover:-translate-y-1">
                {processing ? 'Processing...' : 'Pay $100'}
            </button>
        </form>
    );
};

export default PremiumCheckoutForm;