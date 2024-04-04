import { Link } from "react-router-dom";
import { ICartState, addToCart, cartItems, cartState, removeFromCart } from "../../store/cart";
import { toCurrencyFormat } from "../../helpers/helpers";
import { useRecoilState, useRecoilValue } from "recoil";

const CartList = (): JSX.Element => {
  // Recoil을 사용해서 cart데이터를 가져오는 예제입니다.
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const items = useRecoilValue(cartItems);

  // store/cart.ts를 참고하세요.
  const removeFromCartHandler = (id: string) => {
    setCart(removeFromCart(cart, id));
  };

  const addToCartHandler = (id: string) => {
    setCart(addToCart(cart, id));
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
          <Link to={`/product/${item.id}`}>
            <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
              <img src={item.image} alt={item.title} className="object-contain w-full h-48" />
            </figure>
          </Link>
          <div className="card-body px-1 lg:px-12">
            <h2 className="card-title">
              <Link className="link link-hover" to={`/product/${item.id}`}>
                {item.title}
              </Link>
            </h2>
            <p className="mt-2 mb-4 text-3xl">
              {toCurrencyFormat(item.price * item.count)}{" "}
              <span className="text-2xl">({toCurrencyFormat(item.price)})</span>
            </p>
            <div className="card-actions">
              <div className="btn-group">
                <button className="btn btn-primary" onClick={() => removeFromCartHandler(item.id)}>
                  -
                </button>
                <button className="btn btn-ghost no-animation">{item.count}</button>
                <button className="btn btn-primary" onClick={() => addToCartHandler(item.id)}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
