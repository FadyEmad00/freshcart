import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        const data = await response.json();

        setProducts(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return [loading, products];
};

export default useFetchProducts;
