
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    console.log(user.email);
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            console.log(res.data);
            return res.data;
        }
    })

    return (
        <div className='bg-[#F6F6F6] px-20 py-12 min-h-screen'>

            <SectionTitle heading={'PAYMENT HISTORY'} subHeading={'---At a Glance!---'}></SectionTitle>

            <div className="bg-white p-12">
                <div>
                    <h2>Total payments: {payments.length}</h2>
                </div>

                <div className="overflow-x-auto mt-9 rounded-t-xl">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white">
                            <tr>
                                <th>No</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>TnxID</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        {/* table body */}
                        <tbody>
                            {
                                payments.map((payment, idx) => <tr key={payment._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        {payment.email}
                                    </td>
                                    <td>
                                        ${(payment.price).toFixed(2)}
                                    </td>
                                    <td>
                                        {payment.transactionId}
                                    </td>
                                    <td>
                                        {payment.status}
                                    </td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;