import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import React from "react";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

  // run something when the page first mounts/loads
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false); // doesn't work
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);



  function register() {
    createUserWithEmailAndPassword(auth, "email@example.com", "password")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });

      setLoggedIn(true);
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@example.com", "password")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });

      setLoggedIn(true);
  }

  function logout() {
    signOut(auth);
    setUser({});
    setLoggedIn(false);
  }

  // function btnCont() {
  //   if (Object.keys(user).length > 0) {
  //     return user.email[0].toUpperCase()
  //   } else {
  //     return ""
  //   }
  // }

  function btnCont() {
    if (!loggedIn) {
      return ""
    }
    else if (!(Object.keys(user).length > 0)) {
      return "..."
    }
  }

  return (
    <div className="App">
      <nav>
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
        <button className="btn" onClick={logout}>


        {Object.keys(user).length > 0 ? user.email[0].toUpperCase() : btnCont()}

        </button>
      </nav>
    </div>
  );
}

export default App;
