import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./AddPortal.css";
import { ADD_CLIENT } from "../mutations/clientsMutation";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientsQueries";

const AddPortal = ({ data, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || phone === "") {
      return alert("Please enter all fields");
    }

    addClient(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  return ReactDOM.createPortal(
    <>
      <div className='overlay'></div>
      <div className='edit-portal p-3'>
        <button
          className='btn btn-outline-secondary dark rounded-0'
          onClick={onClose}
        >
          Close
        </button>
        <div className='content d-flex justify-content-center align-items-center h-100 flex-column'>
          <h5 className='title'>Add Client</h5>
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
                <label className='form-label'>Email</label>
                <input
                  type='email'
                  className='form-control w-100'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Phone</label>
                <input
                  type='text'
                  className='form-control w-100'
                  id='name'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-primary dark rounded-0'>
                Add Client
              </button>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("edit-portal")
  );
};

export default AddPortal;
