import { RiDeleteBinLine } from "react-icons/ri";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item) => {
        // console.log(item);
        Swal.fire({
            title: "Are you sure you want to delete this item?",
            text: "You won't be able to revert this!",
            icon: "warning",
            background: "#D1A054",
            showCancelButton: true,
            confirmButtonColor: "#111827",
            color: "#111827",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        });
    }

    const handleUpdateItem = item => {
        console.log(item);
    }

    return (
        <div className="bg-[#F6F6F6] px-20 pt-12">
            <SectionTitle heading={'MANAGE ALL ITEMS'} subHeading={'---Hurry Up!---'}>
            </SectionTitle>

            <div className="bg-white p-12">
                <h2 className="font-semibold text-2xl mb-5">Total Items: {menu.length}</h2>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    Sl no.
                                </th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, idx) => <tr key={item._id}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>${item.price}</td>

                                    <td>
                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button className="btn bg-[#D1A054] text-white"><FaRegEdit className="w-6 h-6" />
                                            </button>
                                        </Link>
                                    </td>

                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="btn bg-[#B91C1C] text-white"><RiDeleteBinLine className="w-6 h-6" />
                                        </button>
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

export default ManageItems;