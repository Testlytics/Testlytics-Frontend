import React, { useState } from 'react';
import styles from './submitModal.module.css'; // style file

const SubmitModal = ({ onConfirm, onCancel }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (!query.trim()) {
      setError('Please enter your query or write "None".');
      return;
    }
    onConfirm(query);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.heading}>Submit</h2>
        <p className={styles.description}>Are you sure?</p>

        <label className={styles.label}>Any queries?<span>*</span></label>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError('');
          }}
          className={styles.input}
          placeholder="Write your query or 'None'"
          required
        />
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttonGroup}>
          <button onClick={handleConfirm} className={styles.yesBtn}>
            Yes
          </button>
          <button onClick={onCancel} className={styles.noBtn}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
