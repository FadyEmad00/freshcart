import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import useGetProductDetails from "../hooks/useGetProductDetails";
import { Button, Col, Container, Row } from "react-bootstrap";
import Loading from "../components/Loading/Loading";
import { FaArrowRight, FaArrowLeft, FaStar } from "react-icons/fa";
import useAddToCart from "../hooks/useAddToCart";
import { AuthContext } from "../context/AuthContext";
import { FavContext } from "../context/FavContext";
import toast from "react-hot-toast";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { favItems, setFavItems } = useContext(FavContext);
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [imgOrder, setImgOrder] = useState(0);
  const { productId } = useParams();

  const [loading, data] = useGetProductDetails(productId);

  const [load, addToCart] = useAddToCart();

  useEffect(() => {
    favItems?.forEach((item) => {
      if (item.id === data?.id) {
        setIsFav(true);
      }
    });
  }, [favItems, loading]);

  const handleSideLeft = () => {
    if (imgOrder < 0) {
      setImgOrder(data.images.length - 1);
    } else if (imgOrder === data.images.length - 1) {
      setImgOrder(0);
    } else {
      setImgOrder(imgOrder + 1);
    }
  };

  const handleSideRight = () => {
    if (imgOrder === 0) {
      setImgOrder(data.images.length - 1);
    } else if (imgOrder > data.images.length - 1) {
      setImgOrder(1);
    } else {
      setImgOrder(imgOrder - 1);
    }
  };

  const handleAddToCart = async (productId) => {
    await addToCart(productId);
  };

  const handleFavorite = async () => {
    setIsLoading(true);
    try {
      // remove the item from favorites
      if (isFav) {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${data?._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );

        const d = await res.json();
        toast.success(d.message);

        setFavItems(d.data);
        setIsFav(false);
      } else {
        console.log(data.id);
        // add the item to favorites
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token,
            },
            body: JSON.stringify({
              productId: data.id,
            }),
          }
        );

        const d = await res.json();

        toast.success(d.message);

        setIsFav(true);

        setFavItems([...favItems, d]);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) {
    return (
      <Helmet title="Loading...">
        <Loading />
      </Helmet>
    );
  }

  return (
    data && (
      <Helmet title={data.title}>
        <Container className="mt-5">
          <Row className=" align-items-center ">
            <Col lg="4" className=" position-relative ">
              <div>
                <img
                  className="w-100 user-select-none "
                  src={data.images[imgOrder]}
                  alt={data.title}
                />
              </div>

              <div className=" text-center ">
                <span
                  className=" fs-2 me-4"
                  style={{ cursor: "pointer" }}
                  onClick={handleSideLeft}
                >
                  <FaArrowLeft />
                </span>
                <span
                  className=" fs-2 me-4"
                  style={{ cursor: "pointer" }}
                  onClick={handleSideRight}
                >
                  <FaArrowRight />
                </span>
              </div>
            </Col>

            <Col lg="8">
              <h3>{data.title}</h3>
              <p>{data.description}</p>
              <div className=" d-flex align-items-center  justify-content-between py-3 px-2">
                <h5>{data.price} EGP</h5>

                <div className="d-flex align-items-center">
                  <FaStar className=" text-warning " />
                  <span>{data.ratingsAverage}</span>
                </div>
              </div>

              <div className="d-flex align-items-center  mt-5">
                <Button
                  className="w-100 me-2"
                  variant="success"
                  onClick={() => handleAddToCart(data.id)}
                >
                  + Add
                </Button>

                <span onClick={handleFavorite} style={{ cursor: "pointer" }}>
                  {isFav ? (
                    <FaHeart className=" fs-2 text-danger  mb-0" />
                  ) : (
                    <FaRegHeart className="fs-2  mb-0" />
                  )}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </Helmet>
    )
  );
};

export default ProductDetails;
