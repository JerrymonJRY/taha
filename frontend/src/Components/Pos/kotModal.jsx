import React, { useState } from "react";
const KotModal = ({ handleTabClick }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div
        className={`modal ${isModalOpen ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Details</h5>
              <button
                type="button"
                className="close"
                onClick={() => setModalOpen(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Display the data here */}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop ${isModalOpen ? "show" : ""}`}
        style={{ display: isModalOpen ? "block" : "none" }}
      ></div>
    </div>
  );
};

const handleTabClick = () => {
   
    setModalOpen(true);
  };

export  { KotModal, handleTabClick };
