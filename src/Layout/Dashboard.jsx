import { NavLink, Outlet } from "react-router-dom";
import { FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { IoWalletSharp, IoCalendarSharp, IoMenu } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { MdHomeFilled } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();

    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard sidebar */}
            <div className="w-72 pl-6 pt-12 min-h-screen bg-[#D1A054]">
                <div className="flex flex-col uppercase font-bold mb-16">
                    <h4 className="text-xl">Bistro Boss</h4>
                    <h4 className="text-sm">Restaurant</h4>
                </div>

                <ul className="menu uppercase pr-14">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to="/dashboard/adminHome"><span><MdHomeFilled /></span> Admin Home</NavLink></li>

                                <li><NavLink to="/dashboard/addItems"><span><FaUtensils /></span> Add Items</NavLink></li>

                                <li><NavLink to="/dashboard/manageItems"><span><IoMenuSharp /></span> manage items</NavLink></li>

                                <li><NavLink to="/dashboard/manageBookings"><span><FaBook /></span>Manage bookings</NavLink></li>

                                <li><NavLink to="/dashboard/allUsers"><span><FaUsers /></span> all users</NavLink></li>

                                <li><NavLink to="/dashboard/cart"><span><FaShoppingCart /></span> My Cart <span className="badge badge-success text-white">({cart.length})</span></NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink to="/dashboard/userHome"><span><MdHomeFilled /></span> User Home</NavLink></li>

                                <li><NavLink to="/dashboard/reservation"><span><FaCalendarAlt /></span> reservation</NavLink></li>

                                <li><NavLink to="/dashboard/paymentHistory"><span><IoWalletSharp /></span> payment history</NavLink></li>

                                <li><NavLink to="/dashboard/cart"><span><FaShoppingCart /></span> My Cart <span className="badge badge-success text-white">({cart.length})</span></NavLink></li>

                                <li><NavLink to="/dashboard/addReview"><span><BsFillChatSquareTextFill /></span> add review</NavLink></li>

                                <li><NavLink to="/dashboard/myBooking"><span><IoCalendarSharp /></span> my booking</NavLink></li>
                            </>
                    }

                    {/* divider */}

                    <div className="divider before:bg-white after:bg-white"></div>

                    {/* main route links */}

                    <li><NavLink to="/"><span><MdHomeFilled /></span> Home</NavLink></li>

                    <li><NavLink to="/menu"><span><IoMenu /></span> Menu</NavLink></li>

                    <li><NavLink to="/shop/salads"><span><FaBagShopping /></span> Shop</NavLink></li>

                    <li><NavLink to="/contact"><span><IoMdMail /></span> Contact</NavLink></li>
                </ul>



            </div>

            {/* dashboard content */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;