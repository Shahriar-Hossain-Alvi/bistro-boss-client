import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        // console.log(data);

        //image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        //after successful image upload go here
        if (res.data.success) {
            //now set menu items with the image url
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price)
            }

            //now send menu item data using axiosSecure
            const menuRes = await axiosSecure.post('/menu', menuItem);
            // console.log(menuRes);

            //after successful data upload to the server
            if (menuRes.data.insertedId) {
                //show success popup
                toast.success('Menu item added successfully!');
                reset();
            }
        }
    }

    return (
        <div className="bg-white px-20 pt-12">
            <SectionTitle heading={"ADD AN ITEM"} subHeading={"---What's new?---"}></SectionTitle>
            <ToastContainer></ToastContainer>

            {/* form */}
            <div className="bg-[#F6F6F6] p-12">
                <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3">

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe name*</span>
                        </div>
                        <input {...register("name", { required: true })} type="text" placeholder="Recipe name" className="input input-bordered w-full" />
                    </label>


                    {/* category and price field */}
                    <div className="flex gap-5">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select defaultValue="drinks" {...register("category", { required: true })} className="select select-bordered w-full">
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                                <option value="popular">Popular</option>
                            </select>
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input {...register("price", { required: true })} type="number" placeholder="Recipe name" className="input input-bordered w-full" />
                        </label>
                    </div>


                    {/* recipe details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>
                        </div>
                        <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    </label>

                    <input {...register("image", { required: true })} type="file" className="file-input w-full" />

                    <button type="submit" className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">
                        Add item
                        <FaUtensils />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;