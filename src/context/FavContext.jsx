import { createContext, useEffect, useState } from "react";
import useGetWishList from "../hooks/useGetWishList";

export const FavContext = createContext("");

const FavContextProvider = ({ children }) => {
  const [favItems, setFavItems] = useState([]);

  const [loading, wishList] = useGetWishList();

  useEffect(() => {
    setFavItems(wishList);
  }, [loading]);

  return (
    <FavContext.Provider value={{ favItems, setFavItems }}>
      {children}
    </FavContext.Provider>
  );
};
export default FavContextProvider;
