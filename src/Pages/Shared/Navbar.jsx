import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import useCart from "../../Hooks/useCart";
import { GiShoppingCart } from "react-icons/gi";
import useAdmin from "../../Hooks/useAdmin";


const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    const navOptions = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/contact'>CONTACT US</NavLink></li>
        <li><NavLink to='/menu'>OUR MENU</NavLink></li>
        <li><NavLink to='/shop/salads'>OUR SHOP</NavLink></li>
        {
            user && isAdmin &&
            <li><NavLink to='/dashboard/adminHome'>DASHBOARD</NavLink></li>
        }
        {
            user && !isAdmin &&
            <li><NavLink to='/dashboard/userHome'>DASHBOARD</NavLink></li>
        }
        <li>
            <Link to='/dashboard/cart'>
                <div className="relative">
                    <div className="p-1 bg-[#006837] rounded-full">
                        <GiShoppingCart className="w-7 h-7" />
                    </div>
                    <div className="badge badge-sm badge-secondary absolute -right-2 bottom-0">{cart.length}</div>
                </div>
            </Link>
        </li>
    </>

    const handleLogOut = () => {
        logOutUser();
    }

    return (
        <>
            <div className="navbar fixed z-30 bg-[#15151580] max-w-screen-xl text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-[#BB8506] bg-[#1F2937] rounded-box w-52 uppercase">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to='/'>
                        <div className="flex flex-col uppercase">
                            <h4 className="text-xl">Bistro Boss</h4>
                            <h4 className="text-sm">Restaurant</h4>
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 uppercase">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end gap-1">
                    {
                        user ?
                            <div className="flex items-center gap-1">
                                <button onClick={handleLogOut} className="btn btn-sm">
                                    Sign Out
                                </button>

                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={user.photoURL ? user.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 menu menu-sm text-[#BB8506] bg-[#1F2937] dropdown-content rounded-box w-52">
                                        <li className="text-center font-medium">{user.email}</li>
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            :
                            <div className="flex gap-2">
                                <Link to='/login'>
                                    <button className="btn">Login</button>
                                </Link>
                                <Link to='/signup'>
                                    <button className="btn">SignUp</button>
                                </Link>
                            </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;