import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Error from "../views/Error";
import Index from "../views/Index";
import Product from "../views/Product";
import CartView from "../components/carts/CartView";
import Fashion from "../views/Fashion";
import Digital from "../views/Digital";
import Accessories from "../views/Accessories";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Index />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/cart" element={<CartView />} />
      <Route path="/fashion" element={<Fashion />} />
      <Route path="/digital" element={<Digital />} />
      <Route path="/accessories" element={<Accessories />} />
      {/* 라우팅 추가 해보세요. */}
    </Routes>
  );
};

export default memo(Router);
