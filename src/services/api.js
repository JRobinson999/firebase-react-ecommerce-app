import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

const API = {
  get: async (path) => {
    if (path === "/products") {
      const snapshot = await getDocs(productsCollection);

      const products = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      return { data: products };
    }

    if (path.startsWith("/products/")) {
      const id = path.split("/")[2];
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        return {
          data: {
            id: productSnap.id,
            ...productSnap.data(),
          },
        };
      }

      return { data: null };
    }
  },

  post: async (path, product) => {
    if (path === "/products") {
      const docRef = await addDoc(productsCollection, product);

      return {
        data: {
          id: docRef.id,
          ...product,
        },
      };
    }
  },

  put: async (path, product) => {
    if (path.startsWith("/products/")) {
      const id = path.split("/")[2];
      const productRef = doc(db, "products", id);

      await updateDoc(productRef, product);

      return {
        data: {
          id,
          ...product,
        },
      };
    }
  },

  delete: async (path) => {
    if (path.startsWith("/products/")) {
      const id = path.split("/")[2];
      const productRef = doc(db, "products", id);

      await deleteDoc(productRef);

      return {
        data: {
          id,
        },
      };
    }
  },
};

export default API;
