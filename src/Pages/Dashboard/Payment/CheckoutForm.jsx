import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const [clientSecret, setClientSecret] = useState('');
    const [tnxId, setTnxId] = useState('');
    const [tnxAmount, setTnxAmount] = useState(0);
    const navigate = useNavigate();





    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('Payment error', error);
            setError(error.message);
        }
        else {
            console.log('Payment method', paymentMethod);
            setError('');
        }


        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('Confirm error', confirmError);
            toast.error(confirmError);
        }
        else {
            // console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('Transaction Id:', paymentIntent.id);
                // console.log('Amount:', paymentIntent.amount);
                setTnxId(paymentIntent.id);
                setTnxAmount(paymentIntent.amount);
                toast.success('Payment successful');


                //now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    date: new Date(), //convert utc date use moment js
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    transactionId: paymentIntent.id,
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                if (res.data?.insertedId) {
                    toast.success('Thank you for purchasing')
                }
                refetch();
                setTimeout(() => {

                    navigate('/dashboard/paymentHistory');
                }, 2500)
            }
        }
    }



    return (
        <form className="text-center space-y-4" onSubmit={handleSubmit}>
            <ToastContainer></ToastContainer>
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
            <button type="submit" className="bg-[#570DF8] text-white btn-wide btn" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500 font-medium text-lg">{error}</p>
            {
                tnxId && <div>
                    <p className="text-lg font-semibold text-green-600"><span className="italic font-bold text-black">Transaction ID:</span> {tnxId}</p>
                    <p className="text-lg font-medium text-red-600"><span className="text-black italic">Paid Amount:</span> {tnxAmount / 100}$</p>
                </div>
            }
        </form>
    );
};

export default CheckoutForm;