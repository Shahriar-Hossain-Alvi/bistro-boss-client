import PropTypes from 'prop-types';

const MenuItemCard = ({item}) => {
    const {image, price, recipe, name} = item;

    return (
        <div className="flex space-x-6">
            <img className="w-28 h-28 rounded-b-full rounded-tr-full" src={image} alt="" />
            <div>
                <h2 className="uppercase text-xl">{name} ------------------</h2>
                <p className="text-[#737373]">{recipe}</p>
            </div>
            <div>
                <h3 className="text-xl text-[#BB8506]">${price}</h3>
            </div>
        </div>
    );
};

MenuItemCard.propTypes ={
    item: PropTypes.object
}

export default MenuItemCard;