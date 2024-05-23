import chefService from "../../../assets/home/chef-service.jpg";

const BistroBoss = () => {
    return (
        <div className="hero mb-24" style={{ backgroundImage: `url(${chefService})` }}>
            <div className="hero-overlay"></div>
            <div className="hero-content text-center py-28">
                <div className="max-w-4xl bg-white text-black py-20 px-24">
                    <h1 className="mb-5 text-5xl">Bistro Boss</h1>
                    <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                </div>
            </div>
        </div>
    );
};

export default BistroBoss;