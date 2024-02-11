import Sidebar from "../components/Sidebar";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import {BiMaleFemale} from 'react-icons/bi';
import USER_FALLBACK_IMAGE from "../assets/userpic.png";
import data from '../assets/data.json';
import {BarChart, DoughnutChart} from "../components/Charts";
import DashboardTable from "../components/DashboardTable";
interface WidgetItem {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({ heading, value, percent, color, amount=false }: WidgetItem) => (
  <article className="widget">
    <div className="widget_info">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{percent}%
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%
        </span>
      )}
    </div>
    <div className="widget_circle" style={{background:`conic-gradient(${color} ${Math.abs(percent)/100*360}deg, rgb(255,255,255) 0)`}}>
        <span style={{color:color}}>{percent}</span>
    </div>
  </article>
);

interface CategoryItem{
   color:string;
   value:number;
   heading:string; 
}

const CategoryItem = ({ color, value, heading }: CategoryItem) => (
    <div className="category_item">
      <h5>{heading}</h5>
      <div>
        <div
          style={{
            backgroundColor: color,
            width: `${value}%`,
          }}
        ></div>
      </div>
      <span>{value}%</span>
    </div>
  );

const Dashboard = () => {
  return (
    <div className="admin_container">
      <Sidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search..." />
          <FaRegBell />
          <img src={USER_FALLBACK_IMAGE} alt="User" />
        </div>
        <section className="widget_container">
          <WidgetItem
            percent={40}
            amount={true}
            value={43298}
            heading="Revenue"
            color="rgb(0,115,255)"
          />
          <WidgetItem
            percent={-14}
            value={432}
            heading="Users"
            color="rgb(0,198,202)"
          />
          <WidgetItem
            percent={80}
            value={34930}
            heading="Transactions"
            color="rgb(255,196,0)"
          />
           <WidgetItem
            percent={30}
            value={1120}
            heading="Products"
            color="rgb(76,0,255)"
          />
        </section>
        <section className="graph_container">
             <div className="revenue_chart">
             <h2>Revenue & Transactions</h2>
             <BarChart
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
             </div>
             <div className="dashboard_categories">
              <h2>Inventory</h2>
              <div>
                {
                    data.categories.map((category)=><CategoryItem key={category.heading} heading={category.heading} value={category.value} color={`hsl(${category.value*4},100%,50%)`} />)
                }
              </div>
             </div>
        </section>
        <section className="transaction_container">
            <div className="gender_chart">
                <h2>Gender Ratio</h2>
                <DoughnutChart
              labels={["Female", "Male"]}
              data={[12, 19]}
              backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
              cutout={90}
            />
                <p><BiMaleFemale/></p>
            </div>
            <DashboardTable data={data.transaction} />
        </section>
      </main>
    </div>
  );
};
export default Dashboard;
