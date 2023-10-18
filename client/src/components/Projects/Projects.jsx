import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PROJECTS } from "../../queries/projectsQueries";
import Spinner from "../Spinner/Spinner";
import ProjectCard from "../ProjectCard/ProjectCard";
import AddProjectModal from "../AddProjectModal/AddProjectModal";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <h1>Something went wrong!</h1>;
  return (
    <>
      <AddProjectModal />
      {data.projects.length > 0 ? (
        <div className='row'>
          {data.projects.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default Projects;
