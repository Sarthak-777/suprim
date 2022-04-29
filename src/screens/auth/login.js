import React, { useEffect, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { loginEndpoint } from "../../spotify";
import logo from "../../components/images/headphonelogo.png"
import "./login.css";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login({setUser}) {
  let navigate = useNavigate()
  const email = useRef(null);
  const password = useRef(null);

  const register = async () => {
    const myEmail = email.current.value;
    const myPassword = password.current.value;



    try {
      const responseFromAuth = await createUserWithEmailAndPassword(
        auth,
        myEmail,
        myPassword
      );

      const userId = responseFromAuth.user.uid;

      // saving to firestore
      await addDoc(collection(db, "users"), {
        email: myEmail,
        uid: userId,
      });

      // save user to localstorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: myEmail,
          uid: userId,
        })
      );

      // set user as active in app
      setUser({
        email: myEmail,
        uid: userId,
      });

      navigate("/chat");
    } catch (error) {
      alert(error);
    }
  };

  const login = async () => {
    const myEmail = email.current.value;
    const myPassword = password.current.value;

    try {
      const responseFromAuth = await signInWithEmailAndPassword(
        auth,
        myEmail,
        myPassword
      );

      const userId = responseFromAuth.user.uid;

      // save user to localstorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: myEmail,
          uid: userId,
        })
      );

      // set user as active in app
      setUser({
        email: myEmail,
        uid: userId,
      });

      navigate("/chat");
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    // get user from localstorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUser(user);
      navigate("/chat");
    }
  }, [navigate, setUser]);

  return (
    <Container>
      <img src={logo} alt="Logo" />
      <h2>Dhun</h2>

      <div className="log">
        <TextField
          required
          id="imput"
          label="Email"
          type="email"
          ref={email}
        />

        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          ref={password}

        />
      </div>
      <a href={loginEndpoint}>
        <div className="login-btn" onClick={login}>LOG IN</div>
      </a>
      <h2>
        Don't have an account? <a href="/register">Register here</a>
      </h2>
    </Container>
  
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height 100vh;
  width 100vw;
  background-color: #ECF0F1 ;
  gap: 2rem;
  img {
    height: 25vh;
  }
  button {
    padding: 1rem 5 rem;
    background-color: black;
    color : white;
    font-size: 2rem;
    cursor: pointer;

  }
`;