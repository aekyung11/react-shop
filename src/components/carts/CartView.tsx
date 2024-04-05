import { Link } from "react-router-dom";
import BreadCrumb from "../common/Breadcrumb";
import Confirm from "../common/Confirm";
import { cartTotal, isCartEmpty } from "../../store/cart";
import { useRecoilValue } from "recoil";
import CartList from "./CartList";
import { toCurrencyFormat } from "../../helpers/helpers";

const CartView = (): JSX.Element => {
  const isEmpty = useRecoilValue<boolean>(isCartEmpty);
  const total = useRecoilValue<number>(cartTotal);

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category="홈" crumb="장바구니" />
      <div className="mt-6 md:mt-14 px-2 lg:px-0">
        {isEmpty && (
          <div>
            <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
            <Link to="/" className="btn btn-primary mt-10">
              담으러 가기
            </Link>
          </div>
        )}
        <div className="lg:flex justify-between mb-20">
          <CartList />
          <div className="self-start shrink-0 flex items-center mt-10 mb-20">
            <span className="text-xl md:text-2xl">총 : {toCurrencyFormat(total)}</span>
            <label htmlFor="confirm-modal" className="modal-button btn btn-primary ml-5">
              구매하기
            </label>
          </div>
        </div>
      </div>
      <Confirm />
    </section>
  );
};

export default CartView;
