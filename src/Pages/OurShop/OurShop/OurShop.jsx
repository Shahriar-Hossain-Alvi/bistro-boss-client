import { Helmet } from "react-helmet-async";
import ourShopImg from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../../Hooks/useMenu";
import OurShopTab from "../OurShopTab/OurShopTab";
import { useParams } from "react-router-dom";

const OurShop = () => {
    const categories = ['salads', 'pizza', 'soups', 'desserts', 'drinks']
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();

    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (
        <div>
            <Helmet>
                <title>BBR | Our Shop</title>
            </Helmet>
            <Cover
                img={ourShopImg}
                title={"Our Shop"}
                subTitle={"Would you like to try a dish?"}
            ></Cover>

            <div className="mt-20">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soups</Tab>
                        <Tab>Desserts</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>
                    <TabPanel>
                        <OurShopTab items={salad}></OurShopTab>
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={pizza}></OurShopTab>
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={soup}></OurShopTab>
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={dessert}></OurShopTab>
                    </TabPanel>
                    <TabPanel>
                        <OurShopTab items={drinks}></OurShopTab>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default OurShop;