import "./product.css";
import { Button, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { FavContext } from "../../context/FavContext";
import Loading from "../Loading/Loading";
import useAddToCart from "../../hooks/useAddToCart";

// eslint-disable-next-line react/prop-types
const Product = ({ product }) => {
  const { favItems, setFavItems } = useContext(FavContext);
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const [loading, addToCart] = useAddToCart();

  useEffect(() => {
    favItems?.forEach((item) => {
      if (item.id === product.id) {
        setIsFav(true);
      }
    });
  }, [favItems]);

  const handleFavorite = async () => {
    setIsLoading(true);
    try {
      // remove the item from favorites
      if (isFav) {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${product.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              token,
            },
          }
        );

        const data = await res.json();

        toast.success(data.message);

        setFavItems(data.data);
        setIsFav(false);
      } else {
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
              productId: product.id,
            }),
          }
        );

        const data = await res.json();

        toast.success(data.message);

        setFavItems([...favItems, product]);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    await addToCart(productId);
  };

  if (loading || isLoading) {
    return <Loading />;
  }
  return (
    product && (
      <Col lg="3" md="6" className="product p-3">
        <Link
          to={`/productDetails/${product._id}`}
          className=" text-decoration-none text-black"
        >
          <div className=" w-100 px-4  ">
            <img
              className="w-100"
              src={product.imageCover}
              alt={product.title}
            />
          </div>
        </Link>

        <p className=" text-success mb-0">{product.category.name}</p>
        <h5 className=" overflow-hidden " style={{ height: "50px" }}>
          {product.title}
        </h5>

        <div className=" d-flex align-items-center  justify-content-between ">
          <h6>{product.price} EGP</h6>

          <div className=" me-5">
            <FaStar className=" text-warning" />
            <span>{product.ratingsAverage}</span>
          </div>
        </div>

        <div className="d-flex align-items-center  mt-3">
          <Button
            className="w-100 me-2 add-btn"
            variant="success"
            onClick={() => handleAddToCart(product.id)}
          >
            + Add
          </Button>

          <span onClick={handleFavorite}>
            {isFav ? (
              <FaHeart className=" fs-2 text-danger  mb-0" />
            ) : (
              <FaRegHeart className="fs-2  mb-0" />
            )}
          </span>
        </div>
      </Col>
    )
  );
};

export default Product;
