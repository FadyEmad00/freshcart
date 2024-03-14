import { Spinner } from "react-bootstrap";
import "./loading.css";

const Loading = () => {
  return (
    <div className="laoding">
      <Spinner animation="grow" variant="primary" className="fs-1" />
    </div>
  );
};

export default Loading;
