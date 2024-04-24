import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';

export default function ProjectsCard() {
  const projects = useSelector((state) => state.user?.projects)
  const [searchedProjects, setSearchedProjects] = useState([])

  useEffect(() => {
      setSearchedProjects(projects)
  }, [projects])

  return <div className="card border-primary mb-3 mx-md-2 dashboard-card" id='projects-card'>
    <div className="card-header navbar">
      Projects
      <Link to="/projects/new" className="btn btn-info btn-sm d-flex">+ Add New Project</ Link>
    </div>
    <div className="card-body dashboard-card-body">
      <SearchBar
        unfilteredArray={projects}
        searchKey={"name"}
        setFilteredArray={setSearchedProjects}
        className="form-control-sm"
        style={{marginBottom: "10px"}}
      />
      {searchedProjects?.length != 0 ? (
        _.map(searchedProjects, (project) => (
          <h4 key={project.id}>
            <Link to={`/projects/${project.id}`} className="btn btn-outline-info btn-sm d-flex">
              {project.name}
            </ Link>
          </h4>
        ))
      ) : (
        <h4 className="card-title">No Current Projects</h4>
      )}
    </div>
  </div>
}
