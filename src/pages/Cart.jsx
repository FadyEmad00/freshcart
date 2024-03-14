import { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { setCartItems, setTotalQuantity } from "../redux/slices/cartSlice";
import Loading from "../components/Loading/Loading";
import { MdOutlineDelete } from "react-icons/md";
import Helmet from "../components/Helmet/Helmet";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const { cartItems, totalQuantity } = useSelector((state) => state.cart);

  const { token } = useContext(AuthContext);

  const dispatch = useDispatch();

  const handleCount = async (id, count, type) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({
            count: type === "up" ? count + 1 : count - 1,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      toast.success("product counted up successfully");
      dispatch(setCartItems(data.data));
      dispatch(setTotalQuantity(data.numOfCartItems));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });

      await res.json();

      toast.success("cart cleared successfully");

      dispatch(setCartItems([]));
      dispatch(setTotalQuantity(0));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/" + id,
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
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Helmet title="Cart">
      <div className="p-5 ">
        <Container className="bg-light mt-5 p-5">
          <div className="d-flex align-items-center justify-content-between ">
            <h2>Cart Shop</h2>

            <Button>Checkout</Button>
          </div>

          <div className="d-flex align-items-center justify-content-between  mt-2">
            <p className=" fw-semibold ">
              total price:{" "}
              <span className=" text-success ">
                {cartItems?.totalCartPrice ? cartItems.totalCartPrice : 0}
              </span>
            </p>

            <p className=" fw-semibold ">
              total number of items:{" "}
              <span className="text-success">
                {totalQuantity ? totalQuantity : 0}
              </span>
            </p>
          </div>

          <div>
            {totalQuantity && cartItems?.products?.length > 0 ? (
              cartItems?.products?.map((item) => (
                <div
                  key={item.product._id}
                  className="product-cart d-flex  mb-3 border  "
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="me-3"
                  />{" "}
                  <div className=" d-flex  align-items-center flex-wrap  justify-content-between  w-100 product-cart-actions">
                    <div>
                      <h4 className=" w-75 overflow-hidden ">
                        {item.product.title}
                      </h4>
                      <h5 className="text-success">{item.price} EGP</h5>
                      <span
                        className="delete text-danger fw-semibold "
                        onClick={() => handleRemove(item.product._id)}
                      >
                        <MdOutlineDelete />
                        remove
                      </span>
                    </div>

                    <div className="cart-actions">
                      <span
                        className=" btn btn-outline-success me-2"
                        onClick={() =>
                          handleCount(item.product._id, item.count, "up")
                        }
                      >
                        +
                      </span>
                      <span className="me-2 fw-bold ">{item.count}</span>
                      <span
                        className=" btn btn-outline-success me-2 "
                        onClick={() =>
                          handleCount(item.product._id, item.count, "down")
                        }
                      >
                        -
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3 className=" text-center ">No Products Added To Cart Yet</h3>
            )}
          </div>

          <div className=" d-flex align-items-center  justify-content-center border-top p-5 ">
            <h3
              className=" btn btn-outline-success fs-3  "
              onClick={handleClearCart}
            >
              Clear Your Cart
            </h3>
          </div>
        </Container>
      </div>
    </Helmet>
  );
};

export default Cart;
