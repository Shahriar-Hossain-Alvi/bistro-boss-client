import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { IoWalletSharp } from "react-icons/io5";
import { FaTruck, FaUsers } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import PropTypes from 'prop-types';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    });

    //custom shape for the var chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    //custom shape for the pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })

    return (
        <div className="py-12 px-6 bg-[#background: #F6F6F6;]">
            <h2 className="text-4xl italic">Hi, {user?.displayName ? user.displayName : 'Boss'}! Welcome back</h2>

            {/* stats cards */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">

                {/* total revenue card */}
                <div className="flex justify-center items-center bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] text-white p-4 rounded-xl">
                    <div>
                        <IoWalletSharp className="w-12 h-12" />
                    </div>
                    <div className="stat">
                        <div className="stat-value">{stats.revenue && (stats.revenue).toFixed(2)}</div>
                        <div className="stat-title text-white">Revenue</div>
                    </div>
                </div>

                {/* total customer card */}
                <div className="flex justify-center items-center bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] text-white p-4 rounded-xl">
                    <div>
                        <FaUsers className="w-12 h-12" />
                    </div>
                    <div className="stat">
                        <div className="stat-value">{stats.totalUsers}</div>
                        <div className="stat-title text-white">Customers</div>
                    </div>
                </div>


                {/* total products card */}
                <div className="flex justify-center items-center bg-gradient-to-r from-[#FE4880] to-[#FECDE9] text-white p-4 rounded-xl">
                    <div>
                        <GiCook className="w-12 h-12" />
                    </div>
                    <div className="stat">
                        <div className="stat-value">{stats.totalMenuItems}</div>
                        <div className="stat-title text-white">Products</div>
                    </div>
                </div>


                {/* total orders card */}
                <div className="flex justify-center items-center bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] text-white p-4 rounded-xl">
                    <div>
                        <FaTruck className="w-12 h-12" />
                    </div>
                    <div className="stat">
                        <div className="stat-value">{stats.totalOrders}</div>
                        <div className="stat-title text-white">Orders</div>
                    </div>
                </div>
            </div>


            {/* chats */}
            <div className="grid md:grid-cols-2 gap-5 mt-6">
                {/* bar chart */}
                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>



                {/* pie chart */}
                <div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                        <Legend width="100%" iconType="diamond" verticalAlign="top"></Legend>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};


AdminHome.propTypes = {
    height: PropTypes.any,
    width: PropTypes.any,
    fill: PropTypes.any,
    x: PropTypes.any,
    y: PropTypes.any,
}

export default AdminHome;