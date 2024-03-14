import Loading from "../components/Loading/Loading";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGetCategories from "../hooks/useGetCategories";

const Categories = () => {
  const [loading, categories] = useGetCategories();

  if (loading) {
    return (
      <Helmet title="Loading...">
        <Loading />
      </Helmet>
    );
  }

  return (
    <Helmet title="Categories">
      <Container className=" mt-5 py-3">
        <h2 className=" fw-bold  text-center text-success mb-4">
          All Categories
        </h2>
        <Row className="gap-3 justify-content-center ">
          {categories.map((category) => (
            <Col key={category._id} lg="3" md="4" className="border brand">
              <Link
                to={`/categories/${category._id}`}
                className=" text-decoration-none text-black "
              >
                <div className="text-center overflow-hidden ">
                  <img
                    style={{ height: "360px" }}
                    className="object-fit-cover "
                    src={category.image}
                    alt={category.name}
                  />
                </div>

                <h4 className="text-center text-black-50 ">{category.name}</h4>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Helmet>
  );
};

export default Categories;
