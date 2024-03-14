import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );

        const data = await res.json();
        setCategories(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return [loading, categories];
};

export default useGetCategories;
