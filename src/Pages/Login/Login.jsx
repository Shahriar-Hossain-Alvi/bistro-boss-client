
import { useContext, useEffect, useState } from "react";
import loginImg from "../../assets/others/authentication2.png";
import loginBg from "../../assets/reservation/wood-grain-pattern-gray1x.png";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../Hooks/useAxiosPublic";



const Login = () => {
    const axiosPublic = useAxiosPublic();
    const [disabled, setDisabled] = useState(true);
    const { signInUser, user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                // console.log(user);
                if (user)
                    toast.error('Already Logged in');
                else {
                    const userInfo = {
                        name: result.user.displayName,
                        email: result.user.email
                    }

                    //create user entry in the database
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                toast.success('Login successful');
                            }
                        })
                }
                form.reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                toast.error(error);
            })
    }

    const handleValidateCaptcha = e => {
        const captchaValue = e.target.value;
        // console.log(captchaValue);

        if (validateCaptcha(captchaValue) == true) {
            toast.success("Captcha Matched, You can Login Now!");
            setDisabled(false);
        }
        else {
            toast.error('Captcha Does Not Matched');
        }
    }

    return (
        <>
            <Helmet>
                <title>Login || Bistro Boss</title>
            </Helmet>

            <div className="hero py-28" style={{ backgroundImage: `url(${loginBg})` }}>
                <div className="hero-content flex shadow-2xl">
                    <div className="text-center md:text-left">
                        <img src={loginImg} alt="" />
                    </div>
                    <ToastContainer />

                    <div className="card shrink-0 w-full max-w-md bg-transparent">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold">Login</h1>
                        </div>

                        <form onSubmit={handleLogin} className="card-body -mt-8">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <div className="">
                                    <input onBlur={handleValidateCaptcha} name="captcha" type="text" placeholder="type the above captcha" className="input input-bordered flex-1" required />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn bg-[#D1A054B2] text-white" type="submit" value="Sign In" />
                            </div>
                        </form>

                        <p className="text-center text-[#D1A054]">New here? <Link className="font-bold" to="/signup">Create a New Account</Link></p>

                        <div className="flex flex-col justify-center items-center mt-5 mb-3">
                            <p className="mb-2 font-medium text-xl text-[#444444]">Or sign in with</p>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;