import React from "react";
import AddClientModal from "../components/AddClientModal/AddClientModal";
import Projects from "../components/Projects/Projects";
import { Container } from "react-bootstrap";
import ClientsComp from "../components/ClientsComp/ClientsComp";

const Home = () => {
  return (
    <>
      <Container>
        <Projects />
        <AddClientModal />
        <ClientsComp />
      </Container>
    </>
  );
};

export default Home;
