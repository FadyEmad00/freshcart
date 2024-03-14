import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetProductDetails = (productId) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products/${productId}`
        );

        const data = await res.json();
        setData(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, []);

  return [loading, data];
};

export default useGetProductDetails;
