import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import MenuItem from "./MenuItem";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_ITEMS } from "../utils/actions";
import { QUERY_ITEMS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";

function ItemList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_ITEMS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_ITEMS,
        items: data.items,
      });

      data.items.forEach((item) => {
        idbPromise("items", "put", item);
      });
    } else if (!loading) {
      idbPromise("items", "get").then((items) => {
        dispatch({
          type: UPDATE_ITEMS,
          items,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterItems() {
    if (!currentCategory) {
      return state.items;
    }

    return state.items.filter((item) => item.category._id === currentCategory);
  }

  return (
    <div className="row menu-items">
      {state.items.length ? (
        <div className="row">
          {filterItems().map((item) => (
            <MenuItem
              key={item._id}
              _id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any items yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ItemList;
