import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTemplate } from '../../actions/templates';

export default function ProjectTemplateForm(setOpenModal) {
  const [details, setDetails] = useState({})
  const dispatch = useDispatch()
  const formData = new FormData()


  const submitForm = () => async (e) => {
    if (!isValid()) {
      return;
    }

    formData.set("name", details.name)
    formData.set("csv_file", details.csv_file)

    await dispatch(addTemplate(formData));
  }


  const isValid = () => {
    if (details.csv_file && details.name) {
      return true
    } else {
      return false
    }
  }

  const addFile = (e) => {
    setDetails({...details, csv_file: e.target.files[0]})
  }

  const addName = (e) => {
    setDetails({...details, name: e.target.value})
  }

  return <div>
    <label>Template Name</label>
    <input
      type="text"
      className="form-control form-control-sm"
      style={{}}
      placeholder='Template Name'
      onChange={addName}
    />
    <label>CSV File</label>
    <input
      type="file"
      className="form-control form-control-sm"
      style={{}}
      placeholder='Template Name'
      accept='.csv'
      onChange={addFile}
    />
    <button
      className={`btn btn-sm ${isValid() ? "btn-outline-success" : "btn-outline-danger"}`}
      onClick={submitForm()}
      disabled={!isValid()}
    >Save</button>
  </div>
}
