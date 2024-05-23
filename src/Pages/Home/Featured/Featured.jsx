import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import './Featured.css'

const Featured = () => {
    return (
        <section className="featured-item bg-fixed text-white">
            <div className="bg-[#151515B2] py-28">
                <SectionTitle
                    heading={'FROM OUR MENU'}
                    subHeading={'---Check it out---'}>
                </SectionTitle>

                <div className="flex justify-center items-center gap-16">
                    <div>
                        <img src={featuredImg} alt="" />
                    </div>
                    <div className="space-y-3">
                        <p>March 20, 2023</p>

                        <h3>WHERE CAN I GET SOME?</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                        </p>
                        <button className="btn bg-transparent uppercase border-t-0 border-x-0 text-white">Read More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;