import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./pages/Profile"
import AdminLayout from "./components/AdminLayout"
import AdminRoute from "./components/AdminRoute"
import AdminDashboard from "./pages/AdminDashboard"
import AdminProducts from "./pages/AdminProducts"
import AddProduct from "./pages/AddProduct"
import EditProduct from "./pages/EditProduct"
import AdminOrders from "./pages/AdminOrders"
import ProductDetails from "./pages/ProductDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        
        {/* Protected Customer Routes */}
        <Route path="/cart" element={<ProtectedRoute><Layout><Cart /></Layout></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Layout><Orders /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminLayout><AdminProducts /></AdminLayout></AdminRoute>} />
        <Route path="/admin/add-product" element={<AdminRoute><AdminLayout><AddProduct /></AdminLayout></AdminRoute>} />
        <Route path="/admin/edit-product/:id" element={<AdminRoute><AdminLayout><EditProduct /></AdminLayout></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminLayout><AdminOrders /></AdminLayout></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App