import React, { useState, useRef } from "react";
import { AiOutlineCamera, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"; 
import styles from "./addImage.module.css";

const AddImage = () => {
  const [image, setImage] = useState(null); 
  const fileInputRef = useRef(null); 

  
  const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  
  const handleClick = () => {
    fileInputRef.current.click(); 
  };

  
  const handleChangeImage = () => {
    fileInputRef.current.click(); 
  };

  
  const handleDeleteImage = () => {
    setImage(null); 
  };

  return (
    <div className={styles.container}>
      {!image ? (
        
        <>
          
          <div className={styles.imageSymbol} onClick={handleClick}>
            <AiOutlineCamera className={styles.icon} />
          </div>
        </>
      ) : (
        
        <div className={styles.imagePreviewContainer}>
          <img src={image} alt="Selected" className={styles.previewImage} />
          <div className={styles.options}>
            <AiOutlineEdit
              className={styles.editicon}
              onClick={handleChangeImage}
              title="Change Image"
            />
            <AiOutlineDelete
              className={styles.deleteicon}
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
