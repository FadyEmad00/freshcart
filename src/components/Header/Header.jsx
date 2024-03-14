import { useContext } from "react";
import "./header.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, setTotalQuantity } from "../../redux/slices/cartSlice";
import { FavContext } from "../../context/FavContext";
import logo from "../../assets/freshcart-logo.svg";

const Header = () => {
  const { token, setToken } = useContext(AuthContext);
  const { setFavItems } = useContext(FavContext);
  const { totalQuantity } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // rest everything
  const handleLogout = () => {
    setToken("");
    setFavItems([]);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    dispatch(setCartItems([]));
    dispatch(setTotalQuantity(0));
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top shadow  ">
      <Container className="  ">
        <NavLink to="/" className=" navbar-brand py-3">
          <img src={logo} alt="Logo" />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          className={
            !token ? " justify-content-end " : "justify-content-center"
          }
          id="basic-navbar-nav"
        >
          {token ? (
            <div className=" d-flex align-items-center justify-content-between w-100 ">
              <Nav className=" w-100 d-flex justify-content-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "fw-bold nav-link " : "nav-link "
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? "fw-bold nav-link " : "nav-link "
                  }
                >
                  Cart
                </NavLink>

                <NavLink
                  to="/wishList"
                  className={({ isActive }) =>
                    isActive ? "fw-bold nav-link " : "nav-link "
                  }
                >
                  wishList
                </NavLink>

                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? "fw-bold nav-link " : "nav-link "
                  }
                >
                  Products
                </NavLink>

                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive ? "fw-bold nav-link " : "nav-link "
                  }
                >
                  Categories
                </NavLink>

                <NavLink
                  to="/brands"
                  className={({ isActive }) =>
                    isActive ? "fw-bold nav-link " : "nav-link "
                  }
                >
                  Brands
                </NavLink>
              </Nav>

              <Nav className=" float-end ">
                <NavLink
                  to="/cart"
                  className=" position-relative me-3 text-black-50 "
                >
                  <FaShoppingCart className="fs-3" />
                  <span className="cart-num">{totalQuantity}</span>
                </NavLink>

                <div>
                  <span
                    className="fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </div>
              </Nav>
            </div>
          ) : (
            <Nav>
              <NavLink to="/sign-up" className=" nav-link " href="#home">
                register
              </NavLink>
              <NavLink to="/sign-in" className=" nav-link " href="#home">
                log in
              </NavLink>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
