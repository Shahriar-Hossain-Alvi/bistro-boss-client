import PropTypes from 'prop-types';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='text-center mb-12 w-96 mx-auto'>
            <p className='text-[#D99904] mb-4 italic text-xl'>{subHeading}</p>

            <h3 className='border-y py-5 text-4xl border-[#E8E8E8] '>{heading}</h3>
        </div>
    );
}; 

SectionTitle.propTypes ={
    heading: PropTypes.string,
    subHeading: PropTypes.string
}

export default SectionTitle;