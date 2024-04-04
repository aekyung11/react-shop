import { atom, selector, selectorFamily } from "recoil";
import { CART_ITEM } from "../constants/category";
import { productWithId } from "./products";

export interface ICartInfo {
  readonly id: string | number;
  readonly count: number;
}

export interface ICartItem {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly count: number;
  readonly image: string;
}

export type ICartState = Readonly<Record<string | number, ICartInfo>>;

/**
 * 카트의 상태는 localStorage 기준으로 초기화 됩니다.
 * 카트의 상태는 새로고침해도 유지되어야 하기 때문입니다.
 */
export const cartState = atom<ICartState>({
  key: "cart",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      localStorage.getItem(CART_ITEM) && setSelf(JSON.parse(localStorage.getItem(CART_ITEM) as string));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});

/**
 * cartList를 구현 하세요.
 * id, image, count 등을 return합니다.
 */

// addToCart는 구현 해보세요.
export const addToCart = (cart: ICartState, id: string | number) => {
  return { ...cart, [id]: { id: id, count: (cart[id]?.count ?? 0) + 1 } };
};

// removeFromCart는 참고 하세요.
export const removeFromCart = (cart: ICartState, id: string | number) => {
  const tempCart = { ...cart };
  if (tempCart[id].count === 1) {
    delete tempCart[id];
    return tempCart;
  } else {
    return { ...tempCart, [id]: { id: id, count: cart[id].count - 1 } };
  }
};

export const cartItems = selector<ICartItem[]>({
  key: "cartItems",
  get({ get }) {
    const cart = get(cartState);
    return Object.keys(cart).map((id) => {
      const cartInfo = cart[id];
      const product = get(productWithId(parseInt(id)))!;
      return {
        id,
        count: cartInfo.count,
        title: product.title,
        price: product.price,
        image: product.image,
      };
    });
  },
});

export const cartTotalCount = selector<number>({
  key: "cartTotalCount",
  get({ get }) {
    const items = get(cartItems);
    return items.map((item) => item.count).reduce((acc, val) => acc + val, 0);
  },
});

export const cartTotal = selector<number>({
  key: "cartTotal",
  get({ get }) {
    const items = get(cartItems);
    return items.map((item) => item.price * item.count).reduce((acc, val) => acc + val, 0);
  },
});

export const isCartEmpty = selector<boolean>({
  key: "isCartEmpty",
  get({ get }) {
    return Object.keys(get(cartState)).length === 0;
  },
});

/**
 * 그 외에 화면을 참고하며 필요한 기능들을 구현 하세요.
 */
