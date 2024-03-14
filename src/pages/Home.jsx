import Products from "../pages/Products";
import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import img1 from "../assets/assortment-citrus-fruits.png";
import img2 from "../assets/1680391434638-cover.jpeg";
import img3 from "../assets/1680392991271-cover.jpeg";
import img4 from "../assets/1680401672268-cover.jpeg";
import img5 from "../assets/1680402295928-cover.jpeg";
import { Container } from "react-bootstrap";
import useGetCategories from "../hooks/useGetCategories";
import Helmet from "../components/Helmet/Helmet";
import Loading from "../components/Loading/Loading";
import { Link } from "react-router-dom";

const imgs = [img1, img2, img3, img4, img5];

const Home = () => {
  const [imgOrder, setImgOrder] = useState(1);

  const [loading, categories] = useGetCategories();

  const handleSideLeft = () => {
    if (imgOrder < 0) {
      setImgOrder(imgs.length - 1);
    } else if (imgOrder === imgs.length - 1) {
      setImgOrder(0);
    } else {
      setImgOrder(imgOrder + 1);
    }
  };

  const handleSideRight = () => {
    if (imgOrder === 0) {
      setImgOrder(imgs.length - 1);
    } else if (imgOrder > imgs.length - 1) {
      setImgOrder(1);
    } else {
      setImgOrder(imgOrder - 1);
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
    <div className="pt-5">
      <Container>
        <div>
          <div className=" text-center  ">
            <img className="w-25" src={imgs[imgOrder]} alt="" />
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
        </div>

        <div className=" w-100 categories mt-3">
          {categories.map((cat) => (
            <Link
              to={`/categories/${cat._id}`}
              key={cat._id}
              className="category text-decoration-none text-black"
            >
              <img src={cat.image} alt={cat.name} />
              <h5 className=" text-center">{cat.name}</h5>
            </Link>
          ))}
        </div>

        <Products />
      </Container>
    </div>
  );
};

export default Home;
