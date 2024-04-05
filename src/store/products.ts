import { selector, selectorFamily } from "recoil";
import CONSTANTS from "../constants/constants";
import { Category } from "../constants/category";

// 혹시 API통신이 되지 않는다면 /product.json파일을 활용해서 로드하세요.
const productsURL = "/products.json";
// const productsURL = `${CONSTANTS.IS_DEV ? `/proxy` : `${import.meta.env.VITE_FAKE_STORE_API}`}/products`;
console.log(productsURL);

interface IRating {
  readonly rate?: number;
  readonly count?: number;
}
export interface IProduct {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly price: number;
  readonly image: string;
  readonly rating: IRating;
}

/**
 * productList는 API 1회 요청 후에 유지됩니다.
 * 디테일 페이지에서는 productDetail/id로 각각 호출하셔도 무방합니다.
 */
export const productsList = selector<IProduct[]>({
  key: "productsList",
  get: async () => {
    try {
      // for testing Suspense
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 5000, true);
      // })
      const response = await fetch(productsURL);
      return (await response.json()) || [];
    } catch (error) {
      console.log(`Error: \n${error}`);
      return [];
    }
  },
});

export const productsOfCategory = selectorFamily<IProduct[], { category: string; limit?: number }>({
  key: "productsOfCategory",
  get:
    ({ category, limit }) =>
    ({ get }) => {
      return get(productsList)
        .filter((product) => category === Category[product.category])
        .slice(0, limit);
    },
});

export const productWithId = selectorFamily<IProduct | undefined, number>({
  key: "productWithId",
  get:
    (id) =>
    ({ get }) => {
      return get(productsList).find((product) => id === product.id);
    },
});

export const productsForSearchTerm = selectorFamily<IProduct[], { term: string }>({
  key: "productsForSearchTerm",
  get:
    ({ term }) =>
    ({ get }) => {
      if (term) {
        return get(productsList).filter((product) => product.title.toLowerCase().includes(term.toLowerCase()));
      } else {
        return [];
      }
    },
  cachePolicy_UNSTABLE: {
    eviction: "lru",
    maxSize: 20,
  },
});
