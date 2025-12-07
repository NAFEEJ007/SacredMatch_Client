import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams, useLocation } from "react-router-dom";

// TODO: Add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Checkout = () => {
    const { biodataId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm biodataId={biodataId} type={type} />
            </Elements>
        </div>
    );
};

export default Checkout;
