import {Link} from 'react-router-dom';
const Landing=()=>{
return <main className="landing_page">
<h3>E-Commerce Admin Dashboard</h3>
<button><Link to="/admin/dashboard">Visit Dashboard</Link></button>
</main>
}
export default Landing;