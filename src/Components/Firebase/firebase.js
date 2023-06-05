// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjEtRq_c2UcTfAe72u3tFBKlOadr0vQvI",
  authDomain: "linkedinclone-23324.firebaseapp.com",
  projectId: "linkedinclone-23324",
  storageBucket: "linkedinclone-23324.appspot.com",
  messagingSenderId: "864427618940",
  appId: "1:864427618940:web:48deac2459ee435b770ff9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firebaseDB = getFirestore(app);
const googleProviderAuth = new GoogleAuthProvider();
const FirebaseContextObj = createContext();
const fireStorage = getStorage(app);

export const FirebaseWrapper = (props) => {
  //function for sign up using email and password
  const signUpUser = async (email, password) => {
    try {
      let userSignUpResponse = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return userSignUpResponse;
    } catch (error) {
      console.log(error);
    }
  };

  // sign with google
  const signUpWithGoogle = async () => {
    const signUpUserWithGoogleResponse = signInWithPopup(
      firebaseAuth,
      googleProviderAuth
    );
    return signUpUserWithGoogleResponse;
  };

  const logInUserWithEmailAndPassword = async (email, password) => {
    const logInUserResponse = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    // console.log({ logInUserResponse });
    return logInUserResponse;
  };

  //sign out
  const singOutFun = () => {
    signOut(firebaseAuth);
  };

  //Create Collection in db
  const createObjInDatabase = async (path, id, userObj) => {
    console.log({ path });
    console.log({ id });
    console.log({ id });

    try {
      const firebaseDataAddResponse = await setDoc(
        doc(firebaseDB, path, id),
        userObj
      );
      console.log({ firebaseDataAddResponse });
    } catch (error) {
      console.log({ error });
    }
  };

  // read database with given Doc id
  const getDocument = async (path, id) => {
    const ref = doc(firebaseDB, path, id);
    const response = await getDoc(ref);
    return response.data();
  };

  //function for upload any file in storage
  async function uploadFileInStorage(file, path, metaData) {
    if (file == null) {
      return;
    }
    try {
      const fileRef = ref(fireStorage, path);
      const response = await uploadBytes(fileRef, file, metaData);
      
      return response.metadata.fullPath;
    } catch (error) {
      console.log({ error });
    }
  }

  async function getUrlOfMediaFile(path) {
    //create the ref of file form path of the file
    const refOfAllFiles = ref(fireStorage, path);
    const response = await listAll(refOfAllFiles);
    return response.items.map(async (file) => {
      return await getDownloadURL(file);
    });
  }

  async function getUrlOfPost(path) {
    //create the ref of file form path of the file
    const refOfAllFiles = ref(fireStorage, path);
    return await getDownloadURL(refOfAllFiles);
  }
  // update the data
  const updateTheCompleteDoc = async (path, postId, updatedObj) => {
    const washingtonRef = doc(firebaseDB, path, postId);
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, updatedObj);
  };

  // read database, all doc from collection
  async function getAllPostData(path) {
    let res = [];
    const querySnapshot = await getDocs(collection(firebaseDB, path));

    querySnapshot.forEach((doc) => {
      res.push(doc.data());
    });

    return res;
  }

  const value = {
    signUpUser,
    signUpWithGoogle,
    logInUserWithEmailAndPassword,
    singOutFun,
    createObjInDatabase,
    getDocument,
    uploadFileInStorage,
    getUrlOfMediaFile,
    getUrlOfPost,
    getUrlOfMediaFile,
    updateTheCompleteDoc,
    getAllPostData,
  };
  return (
    <FirebaseContextObj.Provider value={value}>
      {props.children}
    </FirebaseContextObj.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContextObj);
