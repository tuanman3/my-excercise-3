// src/components/Admin/AvatarModal.jsx
import React, { useState } from "react";
import "../../styles/Admin.css";

const AvatarModal = ({ isOpen, onClose, currentAvatar, onSave }) => {
  const [newAvatarLink, setNewAvatarLink] = useState(currentAvatar || "");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="confirm-modal"
        style={{ textAlign: "left", width: "380px" }}
      >
        <h3>Cập nhật ảnh đại diện Admin</h3>

        <div className="input-group">
          <label className="input-label">Dán Link ảnh mới (URL)</label>
          <input
            className="input-field"
            value={newAvatarLink}
            onChange={(e) => setNewAvatarLink(e.target.value)}
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div className="modal-btns">
          <button className="btn-cancel btn-modal" onClick={onClose}>
            Hủy
          </button>
          <button
            className="btn-confirm btn-modal"
            style={{ backgroundColor: "#96e2b6", color: "#000" }}
            onClick={() => onSave(newAvatarLink)}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarModal;
