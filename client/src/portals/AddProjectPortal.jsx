import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./AddPortal.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientsQueries";
import { ADD_PROJECT } from "../mutations/projectsMutation";
import { GET_PROJECTS } from "../queries/projectsQueries";

const AddProjectPortal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("here", name, description, status);

    if (name === "" || description === "" || status === "") {
      return alert("Please enter all fields");
    }

    addProject(name, description, clientId, status);

    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
    onClose();
  };

  if (loading) return null;

  if (error) return <h2>Something went wrong</h2>;

  return ReactDOM.createPortal(
    <>
      {!loading && !error && (
        <div>
          <div className='overlay'></div>
          <div className='edit-portal p-3'>
            <button
              className='btn btn-outline-secondary dark rounded-0'
              onClick={onClose}
            >
              Close
            </button>
            <div className='content d-flex justify-content-center align-items-center h-100 flex-column'>
              <h5 className='title'>Add Project</h5>
              <div className='modal-body p-5 w-100'>
                <form onSubmit={handleSubmit}>
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
                  <div className='mb-3'>
                    <label className='form-label'>Client</label>
                    <select
                      className='form-select'
                      id='clientId'
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                    >
                      <option value=''>Select Client</option>
                      {data.clients.map((client) => {
                        return (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button
                    type='submit'
                    className='btn btn-primary dark rounded-0'
                  >
                    Add Project
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("edit-portal")
  );
};

export default AddProjectPortal;
