import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <div>
      <Link className="brown-text" to="/Menu">
        ← Back to Menu
      </Link>

      {user ? (
        <div className="row">
          <h3>Order history for {user.username}!</h3>
          {user.orders.map((order) => (
            <div key={order._id}>
              <h5>
                {new Date(
                  parseInt(order.purchaseDate, 10)
                ).toLocaleDateString()}
              </h5>
              <div className="flex-row">
                {order.items.map(({ _id, image, name, price }) => (
                  <div key={_id} className="card">
                    <div class="card-image">
                      <img alt={name} src={`/images/${image}`} />
                      <span class="card-title">{name}</span>
                    </div>
                    <div className="order-price">
                      <span>${price}.00</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default OrderHistory;
