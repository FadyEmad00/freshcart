import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Helmet from "../components/Helmet/Helmet";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (data.statusMsg === "fail") {
        return toast.error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user));

      setToken(data.token);

      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <Helmet title="Sign in">
      <Container className=" my-5">
        <h2 className="mb-4">Login Now</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="validationCustom03">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>

          <div className=" d-flex  align-items-center justify-content-between ">
            <Link className="" to="/forget-password">
              forget your password?
            </Link>

            <Button variant="outline-secondary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </Helmet>
  );
};

export default Login;
