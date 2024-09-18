import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import "./popularMen.css";
const PopularMen = () => {
  const [allwebproducts, setAllwebProducts] = useState([]);

  // Fetch popular products from the server
  const fetchPopularMenProducts = () => {
    fetch("http://localhost:4000/popularinmen")
      .then((res) => res.json())
      .then((data) => setAllwebProducts(data))
      .catch((error) =>
        console.error("Error fetching popular men products:", error)
      );
  };

  useEffect(() => {
    fetchPopularMenProducts();
  }, []);

  return (
    <div className="popular">
      <h1> MEN'S COllECTION</h1>
      <hr />
      <div className="popular-item">
        {allwebproducts.map((item, i) => (
          <Item
            id={item._id} // Assuming you're using MongoDB, so the ID will be _id
            key={i}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularMen;
