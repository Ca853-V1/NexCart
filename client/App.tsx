import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Appbar from './Components/Appbar';
import Home from './Components/Home';
import CreateProduct from './Components/CreateProduct';
import SellerProducts from './Components/SellerProducts';
import UpdateProduct from './Components/UpdateProduct';
import ViewProduct from './Components/ViewProduct';
import CustomerCart from './Components/CustomerCart';

function App()
{
  const [search, setSearch] = useState("");
  return (
    <div>
      <Router>
        <Appbar search={search} setSearch={setSearch}/>
          <Routes>
            <Route path="/" element={<Home search={search}/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/seller/viewproduct/:id" element={<ViewProduct/>}/>
            <Route path="/seller/product/:id" element={<UpdateProduct/>}/>
            <Route path="/seller/addproduct" element={<CreateProduct/>}/>
            <Route path="/seller/products" element={<SellerProducts/>}/>
            <Route path="/customer/cart" element={<CustomerCart/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
