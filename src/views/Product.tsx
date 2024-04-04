import { Link, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { productWithId } from "../store/products";
import BreadCrumb from "../components/common/Breadcrumb";
import { toCurrencyFormat } from "../helpers/helpers";
import { ICartState, addToCart, cartState } from "../store/cart";

const Product = (): JSX.Element => {
  const params = useParams();
  if (params.productId === undefined) {
    throw new Error("productId not provided");
  }
  const item = useRecoilValue(productWithId(parseInt(params.productId)));

  const [cart, setCart] = useRecoilState<ICartState>(cartState);

  const addToCartHandler = (id: string | number) => {
    setCart(addToCart(cart, id));
  };

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      {item ? (
        <>
          <BreadCrumb category={item.category} crumb={item.title} />
          <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
            <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
              <img src={item.image} alt={item.title} className="object-contain w-full h-72" />
            </figure>
            <div className="card-body px-1 lg:px-12">
              <h2 className="card-title">
                {item.title}
                <span className="badge badge-accent ml-2">NEW</span>
              </h2>
              <p>{item.description}</p>
              <div className="flex items-center mt-3">
                <div className="rating rating-half">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <>
                      <input
                        key={"first" + v}
                        type="radio"
                        name="rating-10"
                        className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
                        disabled
                        checked={!!item.rating["rate"] && item.rating["rate"] >= v - 0.5}
                      />
                      <input
                        key={"second" + v}
                        type="radio"
                        name="rating-10"
                        className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
                        disabled
                        checked={!!item.rating["rate"] && item.rating["rate"] >= v}
                      />
                    </>
                  ))}
                </div>
                <div className="ml-2">
                  {item.rating["rate"]} / {item.rating["count"]} 참여
                </div>
              </div>
              <p className="mt-2 mb-4 text-3xl">{toCurrencyFormat(item.price)}</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={() => addToCartHandler(item.id)}>
                  장바구니에 담기
                </button>
                <Link className="btn btn-outline ml-1" to="/cart">
                  장바구니로 이동
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>Not found</>
      )}
    </section>
  );
};

export default Product;
