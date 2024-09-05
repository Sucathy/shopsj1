import { default as React, useEffect } from "react";
import Item from "../Item/Item"; // Ensure this path is correct
import "./Popular.css";

const Popular = (props) => {
  useEffect(() => {
    const preloadImages = () => {
      props.data.forEach((item) => {
        const img = new Image();
        img.src = item.image; // Preload the image
      });
    };

    preloadImages();
  }, [props.data]);

  return (
    <div className="popular">
      <h1>SHOP FOR THE DAY</h1>
      <hr />
      <div className="popular-item">
        {props.data.map((item, i) => {
          return (
            <Item
              id={item.id}
              key={i}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
