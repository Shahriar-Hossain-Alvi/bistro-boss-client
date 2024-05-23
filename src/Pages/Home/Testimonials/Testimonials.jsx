import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaQuoteLeft } from "react-icons/fa";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const Testimonials = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            })
    }, [])

    return (
        <section className="my-28">
            <SectionTitle
                heading={'TESTIMONIALS'}
                subHeading={'---What Our Clients Say---'}>
            </SectionTitle>

            <div>
                <Swiper navigation={true} loop={true} autoplay={
                    { delay: 2500 }
                } modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map(review => <SwiperSlide key={review._id} >
                            <div className="text-center px-12">
                                <div className="flex justify-center">
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={review.rating}
                                        readOnly
                                    />
                                </div>
                                <FaQuoteLeft className="w-24 h-24 mx-auto my-7 text-[#151515]" />
                                <p className="text-xl text-[#444444] mb-3">{review.details}</p>
                                <h2 className="text-3xl uppercase text-[#CD9003]">{review.name}</h2>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>

            </div>
        </section >
    );
};

export default Testimonials;