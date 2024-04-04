import { useRecoilValue } from "recoil";
import { productsList, productsOfCategory } from "../../store/products";
import { toCurrencyFormat } from "../../helpers/helpers";
import { Link } from "react-router-dom";

const ItemList = ({ category, limit }: { category: string; limit?: number }): JSX.Element => {
  // const items = useRecoilValue(productsList);
  const items = useRecoilValue(productsOfCategory({ category, limit }));
  return (
    <>
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{category}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list">
        {items.length > 0 ? (
          items.map((item) => {
            return (
              <Link
                key={item.id}
                className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
                to={`/product/${item.id}`}
              >
                <figure className="flex h-80 bg-white overflow-hidden">
                  <img
                    src={item.image}
                    alt="상품 이미지"
                    className="transition-transform duration-300 max-h-[50%] max-w-[50%]"
                  />
                </figure>
                <div className="card-body bg-gray-100 dark:bg-gray-700">
                  <p className="card-title text-base">{item.title}</p>
                  <p className="text-base">{toCurrencyFormat(item.price)}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <div>제품이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default ItemList;
