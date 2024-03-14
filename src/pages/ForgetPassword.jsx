import { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await res.json();

      if (data.statusMsg === "success") {
        navigate("/verify-code");
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
    <Helmet title="Forget Password">
      <Container className="mt-5">
        <h3>please enter your verification code</h3>

        <input
          type="email"
          placeholder="Email"
          className=" mt-4 form-control"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-outline-success mt-4" onClick={handleClick}>
          Verfiy
        </button>
      </Container>
    </Helmet>
  );
};

export default ForgetPassword;
