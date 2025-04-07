import React, { useState, useRef } from "react";
import { AiOutlineCamera, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"; 
import styles from "./addImage.module.css";

const AddImage = ({ onChange }) => {
  const [image, setImage] = useState(null); 
  const fileInputRef = useRef(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // for preview
      onChange(file); // ✅ send actual File object to parent
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
