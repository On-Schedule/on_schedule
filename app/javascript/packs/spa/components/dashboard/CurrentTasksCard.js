import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';

export default function CurrentTasksCard() {
  const tasks = useSelector((state) => state.user?.tasks)
  const [searchedItem, setSearchedItem] = useState([])

  useEffect(() => {
      setSearchedItem(tasks)
  }, [tasks])

  return <>
    <div className="card border-primary mb-3 mx-md-2">
      <div className="card-header navbar">
        <h4>Tasks</h4>
      </div>
      <div className="card-body">
        <SearchBar unfilteredArray={tasks} searchKey={"name"} setFilteredArray={setSearchedItem} />
        {searchedItem?.length != 0 ? (
          _.map(searchedItem, (task) => (
            <h4 key={task.id}>
              <Link to={`/projects/${task.project.id}`} className="btn btn-outline-success btn-lg d-flex">
                {task.name} ({task.project.name})
              </ Link>
            </h4>
          ))
        ) : (
          <h4 className="card-title">No tasks</h4>
        )}
      </div>
    </div>
  </>
}
