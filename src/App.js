import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import kid_banner from "./Components/Assets/headerkids.jpg";
import men_banner from "./Components/Assets/mensbanner7.png";
import new_banner from "./Components/Assets/newcollection9.png";
import women_banner from "./Components/Assets/wonmenbanner5.png";
import CheckoutList from "./Components/Checkout/CheckoutList";
import Footer from "./Components/Footer/Footer";
import Account from "./Components/MenuList/Account";
import AddNewAddress from "./Components/MenuList/AddNewAddress";
import Address from "./Components/MenuList/Address";
import MenuLists from "./Components/MenuList/MenuLists";
import OrderList from "./Components/MenuList/OrderList";
import OrderListsDetails from "./Components/MenuList/OrderListsDetails";
import Profile from "./Components/MenuList/Profile";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Navbar/Sidebar";
import ContactUs from "./Components/NeedHelp/ContactUs";
import PrivacyPolicy from "./Components/NeedHelp/PrivacyPolicy";
import ReturnExchanges from "./Components/NeedHelp/ReturnExchanges";
import ShippingPolicy from "./Components/NeedHelp/ShippingPolicy";
import UploadImage from "./Components/upload/UploadImage";
import Website from "./Components/Website/Website";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Product from "./Pages/Product";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const loginId = localStorage.getItem("auth-token");

  // Preload images function
  const preloadImages = (imageUrls) => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  useEffect(() => {
    preloadImages([men_banner, women_banner, kid_banner, new_banner]);
  }, []);

  return (
    <div>
      <Router>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kid_banner} category="kid" />}
          />
          <Route
            path="/NewCollections"
            element={
              <ShopCategory banner={new_banner} category="NewCollections" />
            }
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/checkoutList" element={<CheckoutList />} />
          <Route path="/menulist" element={<MenuLists />} />
          <Route path="/account" element={<Account />} />
          <Route path="/order" element={<OrderList />} />
          <Route
            path="/orderlistdetails/:orderId"
            element={<OrderListsDetails />}
          />
          <Route path="/address" element={<Address />} />
          <Route path="/profile" element={<Profile loginId={loginId} />} />
          <Route path="/newaddaddress" element={<AddNewAddress />} />
          <Route path="/website" element={<Website />} />
          <Route path="/returnexchange" element={<ReturnExchanges />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/shippingpolicy" element={<ShippingPolicy />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/uploadimage" element={<UploadImage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
