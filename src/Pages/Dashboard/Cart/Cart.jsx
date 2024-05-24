import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { RiDeleteBinLine } from "react-icons/ri";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure you want to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            background: "#D1A054",
            showCancelButton: true,
            confirmButtonColor: "#111827",
            color: "#111827",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="pt-12 px-20 bg-[#F6F6F6]">
            <SectionTitle heading={'WANNA ADD MORE?'} subHeading={'---My Cart---'}></SectionTitle>


            <div className="bg-white p-10">
                <div className="flex justify-between">
                    <h2 className='text-4xl font-semibold'>Total orders: {cart.length}</h2>

                    <h2 className="text-4xl font-semibold">total price: ${totalPrice.toFixed(2)}</h2>

                    <button className="btn bg-[#D1A054] text-xl font-bold text-white uppercase">Pay</button>
                </div>


                <div className="overflow-x-auto mt-9">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>

                        {/* table body */}
                        <tbody>
                            {
                                cart.map((item, idx) => <tr key={item._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <img src={item.image} className="w-20 h-20" alt={`image of ${item.name}`} />
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        ${item.price}
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn bg-[#B91C1C] text-white"><RiDeleteBinLine className="w-6 h-6" />
                                        </button>
                                    </th>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;