import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const useGetWishList = () => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getWishList = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            headers: {
              token,
            },
          }
        );
        const data = await response.json();

        setWishList(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getWishList();
  }, []);

  return [loading, wishList];
};

export default useGetWishList;
