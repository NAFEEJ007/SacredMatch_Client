import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ biodataId, type }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    const isPremiumRequest = type === 'premium';
    const price = isPremiumRequest ? 100 : 5;

    useEffect(() => {
        axios.post('http://localhost:5000/create-payment-intent', { price }, { withCredentials: true })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(err => {
                console.error("Error creating payment intent:", err);
            });
    }, []);

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

        const { error } = await stripe.createPaymentMethod({
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

        console.log('payment intent', paymentIntent);

        if (paymentIntent.status === 'succeeded') {
            try {
                if (isPremiumRequest) {
                    const res = await axios.post('http://localhost:5000/premium-requests', { 
                        biodataId: parseInt(biodataId),
                        transactionId: paymentIntent.id,
                        amount: price
                    }, { withCredentials: true });

                    if (res.data.modifiedCount > 0 || res.data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Premium Request Submitted!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard/view-biodata');
                    }
                } else {
                    const biodataRes = await axios.get(`http://localhost:5000/biodatas/${biodataId}`, { withCredentials: true });
                    const biodata = biodataRes.data;

                    const paymentInfo = {
                        biodataId: parseInt(biodataId),
                        name: biodata.name,
                        biodataEmail: biodata.contactEmail,
                        mobileNumber: biodata.mobileNumber,
                        selfEmail: user.email,
                        transactionId: paymentIntent.id,
                        price,
                        date: new Date(),
                        status: 'pending'
                    }

                    const res = await axios.post('http://localhost:5000/contact-requests', paymentInfo, { withCredentials: true });
                    console.log('payment saved', res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Payment Successful',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard/my-contact-request');
                    }
                }
            } catch (error) {
                console.error("Error saving payment info:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Payment succeeded but failed to save request. Please contact support.',
                });
            }
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Biodata Id</label>
                <input type="text" value={biodataId} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Self Email</label>
                <input type="email" value={user?.email} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
            </div>
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
            <button type="submit" disabled={!stripe || !clientSecret || processing} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                {processing ? 'Processing...' : `Pay $${price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
