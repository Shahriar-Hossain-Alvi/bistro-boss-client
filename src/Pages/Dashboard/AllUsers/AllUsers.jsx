import { RiDeleteBinLine } from "react-icons/ri";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure you want to delete this user?",
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
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure you want to make this user admin?",
            icon: "warning",
            background: "#D1A054",
            showCancelButton: true,
            confirmButtonColor: "#111827",
            color: "#111827",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Done!",
                                text: "The user is now an admin.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="bg-[#F6F6F6] pt-12 px-20">
            <SectionTitle heading={'MANAGE ALL USERS'} subHeading={'---How many??---'}></SectionTitle>

            <div className="bg-white p-12">
                <div>
                    <h2>Total users: {users.length}</h2>
                </div>

                <div className="overflow-x-auto mt-9 rounded-t-xl">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white">
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Roll</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>

                        {/* table body */}
                        <tbody>
                            {
                                users.map((user, idx) => <tr key={user._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        <button onClick={() => handleMakeAdmin(user)} className="btn bg-[#D1A054] text-white">
                                            {
                                                user.role === 'admin' ?
                                                    <RiAdminFill />
                                                    :
                                                    <FaUsers />
                                            }
                                        </button>
                                    </td>
                                    <th>
                                        <button onClick={() => handleDeleteUser(user)} className="btn bg-[#B91C1C] text-white"><RiDeleteBinLine className="w-6 h-6" />
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

export default AllUsers;