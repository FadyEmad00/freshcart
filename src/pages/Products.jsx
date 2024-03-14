import { useEffect, useState } from "react";
import { Container, FormControl } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductsComponent from "../components/Products/Products";
import Loading from "../components/Loading/Loading";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, products] = useFetchProducts();

  useEffect(() => {
    setProductsData(products);
  }, [loading]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value) {
      const filteredProducts = productsData.filter((pro) =>
        pro.title.toLowerCase().includes(value.toLowerCase())
      );

      setProductsData(filteredProducts);
    } else {
      setProductsData(products);
    }
  };

  if (loading) {
    return (
      <Helmet title="Loading...">
        <Loading />
      </Helmet>
    );
  }

  return (
    <Helmet title="Products">
      <Container>
        <div className=" p-5">
          <FormControl
            type="text"
            placeholder="Search..."
            onChange={handleChange}
          />
        </div>

        {productsData.length > 0 ? (
          <ProductsComponent products={productsData} />
        ) : (
          <h2 className=" text-center">No Products Found</h2>
        )}
      </Container>
    </Helmet>
  );
};

export default Products;
