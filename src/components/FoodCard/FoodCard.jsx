import PropTypes from 'prop-types';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';


const FoodCard = ({ item }) => {
    const { _id, image, price, recipe, name } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            //send cart item to the DB
            const cartItem = {
                menuId: _id,
                email: user.email,
                name, image, price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.insertedId)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} has been added to the cart`,
                            showConfirmButton: false,
                            timer: 1000
                        });
                        //refetch the cart to update the cart items count
                        refetch();
                })
        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please log in before adding items to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Go to Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    //send the user the login page
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    }

    return (
        <div>
            <div className="card h-[484px] relative rounded-none bg-[#F3F3F3]">
                <figure><img className='w-full' src={image} alt={name} /></figure>
                <p className='bg-black text-white h-12 w-20 flex items-center justify-center absolute top-5 right-5'>${price}</p>
                <div className="card-body">
                    <h2 className="font-semibold text-2xl text-center">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-center">
                        <button onClick={handleAddToCart} className="btn bg-[#E8E8E8]  uppercase border-t-0 border-[#BB8506] border-x-0 text-[#BB8506] hover:bg-[#111827]">add to cart</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

FoodCard.propTypes = {
    item: PropTypes.object
}

export default FoodCard;