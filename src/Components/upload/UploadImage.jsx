import React, { useState } from "react";
import upload_area from "../Assets/upload_area.svg"; // Assuming you have the image here
import "./UploadImage.css";
const UploadImage = () => {
  const [image, setImage] = useState(null); // Person Image
  const [image1, setImage1] = useState(null); // Dress Image

  // Handler for person image upload
  const imageHandler = (e) => {
    setImage(e.target.files[0]); // Sets the uploaded image file for person
  };

  // Handler for dress image upload
  const imageHandler1 = (e) => {
    setImage1(e.target.files[0]); // Sets the uploaded image file for dress
  };

  // Function to handle image submission
  const uploadimage = () => {
    if (image && image1) {
      // Implement your logic here (e.g., sending image data to the backend)
      console.log("Person image:", image);
      console.log("Dress image:", image1);
    } else {
      console.log("Please upload both images.");
    }
  };

  return (
    <div className="uploadimage-container">
      {/* Upload for Person Image */}
      <div className="uploadimage-itemfield">
        <p>Person Image</p>
        <label htmlFor="person-image-input">
          <img
            className="uploadimage-thumbnail-img"
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="Person"
          />
        </label>
        <input
          type="file"
          name="image"
          id="person-image-input"
          hidden
          onChange={imageHandler}
        />
      </div>

      {/* Upload for Dress Image */}
      <div className="uploadimage-itemfield">
        <p>Dress Image</p>
        <label htmlFor="dress-image-input">
          <img
            className="uploadimage-thumbnail-img"
            src={image1 ? URL.createObjectURL(image1) : upload_area}
            alt="Dress"
          />
        </label>
        <input
          type="file"
          name="image1"
          id="dress-image-input"
          hidden
          onChange={imageHandler1}
        />
      </div>

      {/* Button to trigger upload */}
      <button className="uploadimage-btn" onClick={uploadimage}>
        ADD
      </button>
    </div>
  );
};

export default UploadImage;
