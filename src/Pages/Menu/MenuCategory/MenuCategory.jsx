import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItemCard from "../../Shared/MenuItemCard/MenuItemCard";
import PropTypes from 'prop-types';


const MenuCategory = ({ items, title, subTitle, coverImg }) => {
    return (
        <div>
            {title &&
                <Cover img={coverImg} title={title} subTitle={subTitle}></Cover>
            }
            <div className='grid md:grid-cols-2 gap-6 pt-24'>
                {
                    items.map(item => <MenuItemCard key={item._id} item={item}></MenuItemCard>)
                }
            </div>

            <div className='text-center mt-4 mb-24'>
                <Link to={`/shop/${title}`}>
                    <button className="btn bg-transparent uppercase border-black border-t-0 border-x-0">View Full Menu</button>
                </Link>
            </div>
        </div>
    );
};

MenuCategory.propTypes = {
    items: PropTypes.array,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    coverImg: PropTypes.any,
}

export default MenuCategory;