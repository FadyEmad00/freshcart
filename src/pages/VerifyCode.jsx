import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { Container } from "react-bootstrap";
import Loading from "../components/Loading/Loading";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetCode: code,
          }),
        }
      );

      const data = await res.json();

      if (data.status === "Success") {
        navigate("/reset-password");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
    <Helmet title="Verify Code">
      <Container className="mt-5">
        <h3>reset your account password</h3>

        <input
          type="text"
          placeholder="Code"
          className=" mt-4 form-control"
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="btn btn-outline-success mt-4" onClick={handleClick}>
          Verfiy
        </button>
      </Container>
    </Helmet>
  );
};

export default VerifyCode;
