import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
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

  function createPost() {
    const post = {
      title: "Land 100K Job",
      description: "Finish FES Week 6",
      uid: user.uid
    };

    addDoc(collection(db, "posts"), post)
  }

  async function updatePost() {
    const hardCodedID = "tPeJhPSG6Sxy38JnjIBY";
    const postRef = doc(db, "posts", hardCodedID);
    const post = await getPostByID(hardCodedID);
    console.log(post);
    const newPost = {
      ...post,
      title: "Land 800K Job"
    };
    updateDoc(postRef, newPost);
    console.log(newPost);
  }

  function deletePost() {
    const hardCodedID = "tPeJhPSG6Sxy38JnjIBY";
    const postRef = doc(db, "posts", hardCodedID);
    deleteDoc(postRef);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
    console.log(posts);
  }

  async function getPostByID(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
    
  }

  async function getPostsByUID() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    )
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

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
    if(!(Object.keys(user).length > 0)) {
      setLoading(true);
    }
    
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
    if (Object.keys(user).length > 0) {
      return user.email[0].toUpperCase()
    } else {
      return ""
    }
    // else if (!(Object.keys(user).length > 0)) {
    //   return "..."
    // }
  }


  return (
    <div className="App">
      <nav>
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
        <button className="btn" onClick={logout}>


        {/* {Object.keys(user).length > 0 ? user.email[0].toUpperCase() : btnCont()} */}
        {loading ? "..." : btnCont()}
        
        </button>

        <button onClick={createPost}>Create Post</button>
        <button onClick={getAllPosts}>Get All Posts</button>
        <button onClick={getPostByID}>Get Post by ID</button>
        <button onClick={getPostsByUID}>Get Post by UID</button>
        <button onClick={updatePost}>Update Post</button>
        <button onClick={deletePost}>Delete Post</button>

      </nav>
    </div>
  );
}

export default App;
