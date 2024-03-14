import { useContext, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { MdOutlineDelete } from "react-icons/md";
import useGetWishList from "../hooks/useGetWishList";
import { Container } from "react-bootstrap";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading/Loading";
import useAddToCart from "../hooks/useAddToCart";

const WishList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, wishList] = useGetWishList();
  const { token } = useContext(AuthContext);

  const [loadi, addToCart] = useAddToCart();

  const handleRemove = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        }
      );

      await res.json();
      toast.success("product removed successfully");
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
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
    <Helmet title="WishList">
      <div className="p-5 ">
        <Container className="bg-light mt-5 p-5">
          <div>
            <h2>My wish List</h2>
          </div>

          <div>
            {wishList.length > 0 ? (
              wishList.map((item) => (
                <div
                  key={item._id}
                  className="product-cart d-flex mb-3 border  "
                >
                  <img
                    src={item.imageCover}
                    alt={item.title}
                    className="me-3"
                  />{" "}
                  <div className=" d-flex  align-items-center justify-content-between  w-100 ">
                    <div>
                      <h2 className=" w-75 overflow-hidden ">{item.title}</h2>
                      <h5 className="text-success">{item.price} EGP</h5>
                      <span
                        className="delete text-danger fw-semibold "
                        onClick={() => handleRemove(item._id)}
                      >
                        <MdOutlineDelete />
                        remove
                      </span>
                    </div>

                    <div className=" px-5">
                      <h4
                        className="btn btn-outline-success "
                        onClick={() => handleAddToCart(item._id)}
                      >
                        Add To Cart
                      </h4>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-center p-3">No Products yet</h2>
            )}
          </div>
        </Container>
      </div>
    </Helmet>
  );
};

export default WishList;
