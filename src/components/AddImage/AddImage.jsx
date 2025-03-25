import React, { useState, useRef } from "react";
import { AiOutlineCamera, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"; // Import delete and edit icons
import styles from "./addImage.module.css";

const AddImage = () => {
  const [image, setImage] = useState(null); // State to store the selected image
  const fileInputRef = useRef(null); // Ref to the file input

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image URL once loaded
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  // Trigger file input when clicking on the camera icon
  const handleClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  // Handle image change (for changing the image)
  const handleChangeImage = () => {
    fileInputRef.current.click(); // Trigger file input to change image
  };

  // Handle image delete
  const handleDeleteImage = () => {
    setImage(null); // Remove the image
  };

  return (
    <div className={styles.container}>
      {!image ? (
        // Show camera icon and heading when no image is selected
        <>
          
          <div className={styles.imageSymbol} onClick={handleClick}>
            <AiOutlineCamera className={styles.icon} />
          </div>
        </>
      ) : (
        // Show image preview and Change/Delete options when an image is selected
        <div className={styles.imagePreviewContainer}>
          <img src={image} alt="Selected" className={styles.previewImage} />
          <div className={styles.options}>
            <AiOutlineEdit
              className={styles.icon}
              onClick={handleChangeImage}
              title="Change Image"
            />
            <AiOutlineDelete
              className={styles.icon}
              onClick={handleDeleteImage}
              title="Delete Image"
            />
          </div>
        </div>
      )}

      {/* Hidden file input field */}
      <input
        type="file"
        accept="image/*"
        className={styles.fileInput}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default AddImage;
