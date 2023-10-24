import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className='col-lg-4 col-md-6 py-5'>
      <div className='card-mb-4 shadow p-3 mt-2'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h5 className='card-title'>{project.name}</h5>
            <a
              className='btn btn-primary rounded-0'
              href={`/projects/${project.id}`}
            >
              View
            </a>
          </div>
          <p className='small'>{project.status}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
