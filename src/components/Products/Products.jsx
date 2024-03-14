import { Container, Row } from "react-bootstrap";
import Product from "../Product/Product";

const Products = ({ products }) => {
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default Products;
