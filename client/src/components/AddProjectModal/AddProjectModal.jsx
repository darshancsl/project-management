import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import AddProjectPortal from "../../portals/AddProjectPortal";

const AddProjectModal = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const openEditForm = () => setShowEditForm(true);
  const closeEditForm = () => setShowEditForm(false);

  return (
    <div>
      <button className='btn btn-primary px-3 rounded-0' onClick={openEditForm}>
        <FaUser className='icon mb-1' />
        <span className='ps-2 d-inline-block'>Add Project</span>
      </button>

      {showEditForm && (
        <AddProjectPortal data={"value"} onClose={closeEditForm} />
      )}
    </div>
  );
};

export default AddProjectModal;
