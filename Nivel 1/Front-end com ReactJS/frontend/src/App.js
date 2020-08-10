import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./App.css";
import Header from "./components/Header";

export default function App() {
  const [projects, setProject] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProject(response.data);
    });
  }, []);

  async function handleAddProject() {
    // projects.push(`Novo Projeto ${Date.now()}`);
    // setProject([...projects, `Novo Projeto ${Date.now()}`]);
    const response = await api.post("projects", {
      title: `Novo Projeto ${Date.now()}`,
      status: "Finalizado",
    });
    const project = response.data;
    setProject([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />
      {projects.map((project) => (
        <ul key={project.id}>
          <li>Titulo:{project.title}</li>
          <li>Status:{project.status}</li>
        </ul>
      ))}
      <button type="button" onClick={handleAddProject}>
        Adicionar novo projeto
      </button>
    </>
  );
}
