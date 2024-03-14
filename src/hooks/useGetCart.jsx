import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useGetCart = () => {
  const [cart, setCart] = useState([]);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getCart = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        });

        const data = await res.json();

        if (data.statusMsg === "fail") {
          console.log(data.message);
        }

        setCart(data.data);
        setNumOfCartItems(data.numOfCartItems);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getCart();
  }, []);

  return [cart, loading, numOfCartItems];
};

export default useGetCart;
