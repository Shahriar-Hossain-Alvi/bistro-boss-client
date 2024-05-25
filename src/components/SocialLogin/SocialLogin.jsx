import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialLogin = () => {
    const { user, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = () => {
        if (user)
            toast.error('Already Logged in');
        else {
            googleSignIn()
                .then((result) => {
                    const userInfo = {
                        email: result.user?.email,
                        name: result.user?.displayName,
                    }
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            console.log(res.data);
                            toast.success('Login successful');
                            setTimeout(() => {
                                navigate(from, { replace: true });
                            }, 1500);
                        })
                })
                .catch(error => {
                    console.error(error);
                    toast.error(error);
                })
        }

    }

    return (
        <button onClick={handleGoogleSignIn} className="btn hover:bg-[#111827] hover:border-[#BB8506] h-12 w-12 flex items-center justify-center border rounded-full border-[#444]">
            <FcGoogle />
        </button>
    );
};

export default SocialLogin;