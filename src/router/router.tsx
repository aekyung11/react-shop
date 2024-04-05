import { Routes, Route } from "react-router-dom";
import { Suspense, memo } from "react";
import Error from "../views/Error";
import Index from "../views/Index";
import Product from "../views/Product";
import CartView from "../components/carts/CartView";
import Fashion from "../views/Fashion";
import Digital from "../views/Digital";
import Accessories from "../views/Accessories";
import { LoadingSection } from "../components/LoadingSection";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Index />} />
      <Route
        path="/product/:productId"
        element={
          <Suspense fallback={LoadingSection}>
            <Product />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={LoadingSection}>
            <CartView />
          </Suspense>
        }
      />
      <Route path="/fashion" element={<Fashion />} />
      <Route path="/digital" element={<Digital />} />
      <Route path="/accessories" element={<Accessories />} />
      {/* 라우팅 추가 해보세요. */}
    </Routes>
  );
};

export default memo(Router);
