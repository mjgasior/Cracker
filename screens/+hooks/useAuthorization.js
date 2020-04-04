import { useState, useContext } from "react";
import * as firebase from "firebase";
import { UserContext } from "../../+context/UserContext";

const isPasswordValid = p => {
  if (p === undefined || p.length < 5) {
    alert("Password has to be longer");
    return false;
  }
  return true;
};

export const useAuthorization = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const signUp = () => {
    if (!isPasswordValid(password)) {
      return;
    }

    try {
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString());
    }
  };

  const login = () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => setUser(user));
    } catch (error) {
      console.log(error.toString());
    }
  };

  return { setPassword, setEmail, login, signUp };
};