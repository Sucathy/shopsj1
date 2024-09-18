import React, { useState } from "react";

const TryOnUpload = () => {
  const [personImage, setPersonImage] = useState(null);
  const [clothingImage, setClothingImage] = useState(null);

  const handlePersonImageUpload = (e) => {
    setPersonImage(e.target.files[0]);
  };

  const handleClothingImageUpload = (e) => {
    setClothingImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Upload both images to the backend for processing
    const formData = new FormData();
    formData.append("personImage", personImage);
    formData.append("clothingImage", clothingImage);

    fetch("/api/tryon", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the processed image response
        console.log("Processed image:", data.processedImageUrl);
      });
  };

  return (
    <div>
      <div>
        <h3>Upload Person Image</h3>
        <input type="file" onChange={handlePersonImageUpload} />
      </div>
      <div>
        <h3>Upload Clothing Image</h3>
        <input type="file" onChange={handleClothingImageUpload} />
      </div>
      <button onClick={handleSubmit}>Try On</button>
    </div>
  );
};

export default TryOnUpload;
