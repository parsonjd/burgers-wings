import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "../utils/actions";
import { QUERY_CATEGORIES } from "../utils/queries";
import { idbPromise } from "../utils/helpers";

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((result) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: result,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div className="flex-row categories">
      {categories.map((foodItem) => (
        <button
          className="btn-large brown"
          type="button"
          key={foodItem._id}
          onClick={() => {
            handleClick(foodItem._id);
          }}
        >
          {foodItem.name}
        </button>
      ))}

      <a
        className="btn-large brown"
        type="button"
        href="/Menu"
        style={{ textDecoration: "none", fontWeight: "normal" }}
      >
        {" "}
        Full Menu
      </a>
    </div>
  );
}

export default CategoryMenu;
