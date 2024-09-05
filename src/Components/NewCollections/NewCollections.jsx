import React, { useEffect } from "react";
import Item from "../Item/Item";
import "./NewCollections.css";

const NewCollections = (props) => {
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
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />

      <div className="collections">
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

export default NewCollections;
