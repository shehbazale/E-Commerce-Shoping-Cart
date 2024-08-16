import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBfF4nbsNe35GXmxqb_EC3BbiGFDDSe9pI",
  authDomain: "north-store-react.firebaseapp.com",
  projectId: "north-store-react",
  storageBucket: "north-store-react.appspot.com",
  messagingSenderId: "28281892407",
  appId: "1:28281892407:web:59d20f95048ab8d391d9b2",
  measurementId: "G-BLP89BKSEQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
// const provider = new GoogleAuthProvider();

async function register(data) {
  const { fullname, age, email, password } = data;

  await createUserWithEmailAndPassword(auth, email, password);
  return addDoc(collection(db, "users"), { fullname, age, email });
}
function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

async function addProduct(product) {
  const { title, description, price, image } = product;
  const storageRef = ref(storage, "products/" + image.name);
  await uploadBytes(storageRef, image);
  const url = await getDownloadURL(storageRef);
  // console.log("products ", title, description, price, image);
  return addDoc(collection(db, "products"), {
    title,
    description,
    price,
    image: url,
  });
}

const getProducts = async () => {
  const getProducts = await getDocs(collection(db, "products"));
  const products = [];
  getProducts.forEach((doc) => {
    console.log("data a gia => ", doc.data());
    // productsData.push({ id: doc.id, ...doc.data() });   //or
    const data = doc.data();
    data.id = doc.id;
    products.push(data);
  });
  return products;
};
// show single product detail
const getSingleProduct = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  // return docSnap.data();    // function to sinply return product object
  const data = docSnap.data();
  data.id = docSnap.id;
  return data;
};
// sign in with google

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    return await signInWithPopup(auth, provider);
    // return result;
    // console.log("sign in ", result);
  } catch (error) {
    console.log("login errror", error);
  }
};
// Reset password function
const passwordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export {
  register,
  login,
  auth,
  collection,
  onAuthStateChanged,
  addProduct,
  getDocs,
  db,
  doc,
  getDoc,
  getProducts,
  getSingleProduct,
  signOut,
  signInWithGoogle,
  passwordReset,
};
