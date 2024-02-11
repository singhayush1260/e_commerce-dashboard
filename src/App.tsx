import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Customer = lazy(() => import("./pages/Customer"));
const Transaction = lazy(() => import("./pages/Transaction"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="admin/dashboard" element={<Dashboard />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/customer" element={<Customer />} />
        <Route path="admin/transaction" element={<Transaction />} />
      </Routes>
    </Suspense>
  );
};
export default App;
