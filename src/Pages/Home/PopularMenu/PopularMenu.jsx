import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItemCard from '../../Shared/MenuItemCard/MenuItemCard';
import useMenu from '../../../Hooks/useMenu';

const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');




    return (
        <section className='my-28'>
            <SectionTitle heading={'FROM OUR MENU'} subHeading={'---Check it out---'}></SectionTitle>

            <div className='grid md:grid-cols-2 gap-6'>
                {
                    popular.map(item => <MenuItemCard key={item._id} item={item}></MenuItemCard>)
                }
            </div>

            <div className='text-center mt-4'>
                <button className="btn bg-transparent uppercase border-black border-t-0 border-x-0">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;