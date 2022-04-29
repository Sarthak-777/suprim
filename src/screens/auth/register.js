import React, { useRef } from "react";
import styled from "@emotion/styled";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import logo from "../../components/images/headphonelogo.png"
import TextField from "@mui/material/TextField";
import "./register.css";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register({setUser}) {
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


      Window.alert("User is now active");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <img src={logo} alt="Logo" />
      <h1>Dhun</h1>


      <div className="log">
        <TextField
          required
          id="input"
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
      <button onClick={register}>Register</button>
      <h2>
        Already have an account? <a href="/">Login here</a>
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
    background: transparent;
  }
  button {
    padding: 1rem 5 rem;
    background-color: black;
    color : white;
    font-size: 2rem;
    cursor: pointer;

  }
`;