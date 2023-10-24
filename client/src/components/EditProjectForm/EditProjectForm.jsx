import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { UPDATE_PROJECT } from "../../mutations/projectsMutation";
import { GET_PROJECTS } from "../../queries/projectsQueries";
import { useNavigate } from "react-router-dom";

const EditProjectForm = ({ project }) => {
  const navigate = useNavigate("/");
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("new");
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS, variables: { id: project.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please enter all fields");
    }

    updateProject(name, description, status);
  };

  return (
    <div className='mt-5'>
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            className='form-control w-100'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Description</label>
          <textarea
            type='email'
            className='form-control w-100'
            id='email'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Status</label>
          <select
            className='form-select'
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='new'>Todo</option>
            <option value='progress'>InProgress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
