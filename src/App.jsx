import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Suspense, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Products from "./pages/Products";
import useGetCart from "./hooks/useGetCart";
import { useDispatch } from "react-redux";
import { setCartItems, setTotalQuantity } from "./redux/slices/cartSlice";
import Cart from "./pages/Cart";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import WishList from "./pages/WishList";
import ProductDetails from "./pages/ProductDetails";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyCode from "./pages/VerifyCode";
import ResetPassword from "./pages/ResetPassword";
import Loading from "./components/Loading/Loading";
import NotFound from "./pages/NotFound";

function App() {
  const { token } = useContext(AuthContext);
  const [cart, loading, numOfCartItems] = useGetCart();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) {
      dispatch(setCartItems(cart));
      dispatch(setTotalQuantity(numOfCartItems ? numOfCartItems : 0));
    }
  }, [loading]);

  return (
    <>
      <Toaster />
      <Header />

      <main className=" pt-5">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={token ? <Home /> : <Navigate to="/sign-in" />}
            />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/productDetails/:productId"
              element={<ProductDetails />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/wishList" element={<WishList />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
