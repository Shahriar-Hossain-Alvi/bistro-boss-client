import { useContext } from "react";
import loginImg from "../../assets/others/authentication2.png";
import loginBg from "../../assets/reservation/wood-grain-pattern-gray1x.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        toast.success('User name and photo updated!')
                    })
                    .catch(error => {
                        console.error(error);
                        toast.error(error);
                    })

                const userInfo = {
                    name: data.name,
                    email: data.email
                }


                //create user entry in the database
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast.success('Sign Up successful');
                            reset();
                            setTimeout(() => {
                                navigate('/');
                            }, 2500)
                        }
                    })
            })
    }


    return (
        <>
            <Helmet>
                <title>Sign Up || Bistro boss</title>
            </Helmet>

            <div className="hero py-28" style={{ backgroundImage: `url(${loginBg})` }}>
                <div className="hero-content flex flex-row-reverse shadow-2xl">
                    <div className="text-center md:text-left">
                        <img src={loginImg} alt="" />
                    </div>
                    <ToastContainer />


                    <div className="card shrink-0 w-full max-w-md bg-transparent">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold">Sign Up</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register('name', { required: true })} name="name" type="text" placeholder="Enter your name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">required name</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input {...register('photo', { required: true })} name="photo" type="text" placeholder="Enter your photo url" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">required name</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register('email', { required: true })} name="email" type="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500">required email</span>}
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                <input {...register('password', { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{6,20}/ })} name="password" type="password" placeholder="password" className="input input-bordered" />


                                {errors.password && <span className="text-red-500 text-center">password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-center text-red-500">password must have at least 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-500 text-center">password must be less than 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className="text-center text-red-500">password must have at least one uppercase, one lowercase, one digit and one special character</span>}


                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn bg-[#D1A054B2] text-white" type="submit" value="Sign Up" />
                            </div>
                        </form>

                        <p className="text-center text-[#D1A054]">Already registered? <Link className="font-bold" to="/login">Go to log in</Link></p>

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

export default SignUp;