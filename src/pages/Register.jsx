import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [phone, setPhone] = useState("");

  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            rePassword,
            phone,
          }),
        }
      );

      const data = await res.json();

      if (data.statusMsg === "fail") {
        return toast.error(data.message);
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.user));

        setToken(data.token);

        navigate("/");
        toast.success("Account created successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <Helmet title="Sign up">
      <Container className=" my-5">
        <h2 className="mb-4">Register Now</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="validationCustom03">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter  Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Re-Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="ReEnter Password"
              onChange={(e) => setRepassword(e.target.value)}
              value={rePassword}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </Form.Group>

          <div className=" d-flex  align-items-center justify-content-end ">
            <Button variant="outline-secondary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </Helmet>
  );
};

export default Register;
