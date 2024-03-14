import { Container } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import notFound from "../assets/error.svg";

const NotFound = () => {
  return (
    <Helmet title="Not Found">
      <div className="not-found">
        <Container className="text-center">
          <img src={notFound} className="mb-3" alt="Not Found" />
          <p className="fs-1 mt-4 fw-bolder ">Page not found</p>
        </Container>
      </div>
    </Helmet>
  );
};

export default NotFound;
