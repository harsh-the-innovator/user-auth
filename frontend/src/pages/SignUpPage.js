import React, { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import AuthContext from "../context/authContext";
import "./boxStyle.css";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [validated, setValidated] = useState(false);
  const context = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const requestBody = {
        name: event.target.formName.value,
        email: event.target.formEmail.value,
        password: event.target.formPassword.value,
      };
      fetch("http://localhost:8000/api/myapp/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        mode: "cors",
      })
        .then((res) => res.json())
        .then((data) => {
          context.login(data.token, data.userId);
          toast.success(`${data.message}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          event.target.formName.value = "";
          event.target.formEmail.value = "";
          event.target.formPassword.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setValidated(true);
  };

  return (
    <div className="form-style">
      <Card>
        <Card.Body>
          <Card.Title>SignUp</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter name" />
              <Form.Control.Feedback type="invalid">
                Please provide your name!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email id!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                pattern="[A-Za-z\d]{3}"
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be atleast 3 characters and should not
                contain white spaces
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid passsword
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUpPage;
