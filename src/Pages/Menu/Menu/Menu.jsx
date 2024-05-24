import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import coffeeImg from "../../../assets/menu/Cold-coffe.png";


const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    const drink = menu.filter(item => item.category === 'drinks');

    return (
        <div>
            <Helmet>
                <title>BBR | Menu</title>
            </Helmet>

            {/* menu banner */}
            <Cover img={menuImg} title={"our menu"} subTitle={'Would you like to try a dish?'}></Cover>


            {/* todays offer */}
            <div className='pt-28 pb-14'>
                <SectionTitle heading={"TODAY'S OFFER"} subHeading={"---Don't miss---"}></SectionTitle>

                <MenuCategory items={offered}></MenuCategory>

                <div className='text-center pt-6'>
                    <button className="btn bg-transparent uppercase border-black border-t-0 border-x-0">ORDER YOUR FAVOURITE FOOD</button>
                </div>
            </div>

            {/* desserts section */}
            <div>
                <MenuCategory items={dessert}
                    title={"desserts"}
                    subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                    coverImg={dessertImg}
                ></MenuCategory>
            </div>

            {/* pizza section */}
            <div>
                <MenuCategory items={pizza}
                    title={"pizza"}
                    subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                    coverImg={pizzaImg}
                ></MenuCategory>
            </div>

            {/* salad section */}
            <div>
                <MenuCategory items={salad}
                    title={"salads"}
                    subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                    coverImg={saladImg}
                ></MenuCategory>
            </div>

            {/* soup section */}
            <div>
                <MenuCategory items={soup}
                    title={"soups"}
                    subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                    coverImg={soupImg}
                ></MenuCategory>
            </div>


            {/* drinks section */}
            {/* soup section */}
            <div>
                <MenuCategory items={drink}
                    title={"drinks"}
                    subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                    coverImg={coffeeImg}
                ></MenuCategory>
            </div>
        </div>
    );
};

export default Menu;