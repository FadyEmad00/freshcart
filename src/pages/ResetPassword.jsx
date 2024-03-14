import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { Container } from "react-bootstrap";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword,
          }),
        }
      );

      const data = await res.json();
      if (data) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(" Password updated successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Verify Code">
      <Container className="mt-5">
        <h3>reset your account password</h3>

        <input
          type="email"
          placeholder="Email"
          className=" mt-4 form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className=" mt-4 form-control"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="btn btn-outline-success mt-4" onClick={handleClick}>
          Verfiy
        </button>
      </Container>
    </Helmet>
  );
};

export default ResetPassword;
