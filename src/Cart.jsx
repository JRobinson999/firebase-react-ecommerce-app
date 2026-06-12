import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const totalPrice = products.reduce((total, product) => {
    return total + Number(product.price || 0);
  }, 0);

  const placeOrder = async () => {
    if (!auth.currentUser) {
      alert("Please login before placing an order.");
      navigate("/login");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        products,
        totalPrice,
        createdAt: new Date(),
      });

      alert("Order placed!");
      navigate("/orders");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cart</h2>

      {products.length === 0 ? (
        <p>No products in cart.</p>
      ) : (
        <>
          {products.map((product) => (
            <div key={product.id} className="card mb-2 p-3">
              <h4>{product.title}</h4>
              <p>${product.price}</p>
            </div>
          ))}

          <h3>Total: ${totalPrice}</h3>

          <button className="btn btn-success" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
