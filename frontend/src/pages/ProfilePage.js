import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import AuthContext from "../context/authContext";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const context = useContext(AuthContext);

  useEffect(() => {
    if (context.userId !== null && context.token !== null) {
      fetch(`http://localhost:8000/api/myapp/user/${context.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.token}`,
        },
        mode: "cors",
      })
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setEmail(data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [context.userId, context.token]);

  return (
    <Card
      style={{
        width: "18rem",
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Card.Header as="h5" style={{ background: "#9C27B0", color: "#fff" }}>
        User Profile
      </Card.Header>
      <Card.Body>
        <Card.Text>{name}</Card.Text>
        <Card.Text>{email}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfilePage;
