
import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div className='pt-12 px-20'>
            <SectionTitle heading={'Payment'} subHeading={'---Select Your payment method---'}></SectionTitle>

            <div className='pt-10'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;