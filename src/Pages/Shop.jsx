import React, { useEffect, useState } from "react";
import BestSeller from "../Components/BestSeller/BestSeller";
import Hero from "../Components/Hero/Hero";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import OfferZone from "../Components/OfferZone/OfferZone";
import Popular from "../Components/Popular/Popular";
// import PopularMen from "../Components/PopularMen/PopularMen";

const Shop = () => {
  const [popularWomen, setPopularWomen] = useState([]);
  // const [popularMen, setPopularMen] = useState([]);
  const [newCollection, setNewCollection] = useState([]);

  const fetchInfo = () => {
    // Fetch popular products for women
    fetch("http://44.201.85.252/popularinwomen")
      .then((res) => res.json())
      .then((data) => setPopularWomen(data))
      .catch((error) =>
        console.error("Error fetching women's popular products:", error)
      );

    // Fetch new collections
    fetch("http://44.201.85.252/newcollections")
      .then((res) => res.json())
      .then((data) => setNewCollection(data))
      .catch((error) =>
        console.error("Error fetching new collections:", error)
      );

    // Fetch popular products for men
    // fetch("http://44.201.85.252/popularinmen")
    //   .then((res) => res.json())
    //   .then((data) => setPopularMen(data))
    //   .catch((error) =>
    //     console.error("Error fetching men's popular products:", error)
    //   );
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const customLineStyle = {
    border: "none",
    borderTop: "4px solid",
    width: "100%",
    marginTop: "50px",
  };

  return (
    <div>
      <Hero />
      <Popular data={popularWomen} />
      <hr style={customLineStyle} />
      <OfferZone />
      <BestSeller />
      <hr style={customLineStyle} />
      <NewCollections data={newCollection} />

      {/* <PopularMen data={popularMen} /> */}
      <NewsLetter />
    </div>
  );
};

export default Shop;
