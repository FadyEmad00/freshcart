import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import toast from "react-hot-toast";
import Loading from "../components/Loading/Loading";
import { Link } from "react-router-dom";

const Brands = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );

        const data = await res.json();
        setBrands(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Helmet title="Brands">
      <Container className=" mt-5 py-3">
        <h2 className=" fw-bold  text-center text-success ">All Brands</h2>
        <Row className="gap-3 justify-content-center ">
          {brands.map((brand) => (
            <Col key={brand._id} lg="3" md="4" className="border brand">
              <Link
                to={`/brands/${brand._id}`}
                className=" text-decoration-none text-black "
              >
                <div className=" w-100 px-4  ">
                  <img className="w-100" src={brand.image} alt={brand.name} />
                </div>

                <h4 className="text-center text-black-50 ">{brand.name}</h4>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Helmet>
  );
};

export default Brands;
