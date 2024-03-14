import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCartItems, setTotalQuantity } from "../redux/slices/cartSlice";
import { AuthContext } from "../context/AuthContext";

const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const dispatch = useDispatch();

  const addToCart = async (productId) => {
    setLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          productId,
        }),
      });

      const data = await res.json();

      toast.success(data.message);

      dispatch(setCartItems(data.data));
      dispatch(setTotalQuantity(data.numOfCartItems));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return [loading, addToCart];
};

export default useAddToCart;
