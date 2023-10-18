import React, { useState } from "react";
import AddPortal from "../../portals/AddPortal";
import { FaUser } from "react-icons/fa";

const AddClientModal = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const openEditForm = () => setShowEditForm(true);
  const closeEditForm = () => setShowEditForm(false);

  return (
    <div>
      <button className='btn btn-primary px-3 rounded-0' onClick={openEditForm}>
        <FaUser className='icon mb-1' />
        <span className='ps-2 d-inline-block'>Add Client</span>
      </button>

      {showEditForm && <AddPortal data={"value"} onClose={closeEditForm} />}
    </div>
  );
};

export default AddClientModal;
