import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) {
        return;
      }

      const snapshot = await getDocs(collection(db, "orders"));

      const orderList = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((order) => order.userId === auth.currentUser.uid);

      setOrders(orderList);
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-3 p-3">
            <h4>Order ID: {order.id}</h4>
            <p>Total: ${order.totalPrice}</p>
            <p>Products:</p>

            <ul>
              {order.products.map((product) => (
                <li key={product.id}>
                  {product.title} - ${product.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
