import { Parallax } from 'react-parallax';
import PropTypes from 'prop-types';

const Cover = ({ img, title, subTitle }) => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={500}
        >
            <div className="hero h-[500px]">
                <div className="bg-[#15151599] bg-opacity-60 w-3/4 h-1/2"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 uppercase text-5xl font-bold">{title}</h1>
                        <p className="mb-5">{subTitle}</p>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

Cover.propTypes = {
    img: PropTypes.any,
    title: PropTypes.string,
    subTitle: PropTypes.string
}

export default Cover;