import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../../mutations/projectsMutation";
import { GET_PROJECTS } from "../../queries/projectsQueries";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className='d-flex mt-5 ms-auto'>
      <button className='btn btn-danget m-2' onClick={deleteProject}>
        <FaTrash className='icon' />
        Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
