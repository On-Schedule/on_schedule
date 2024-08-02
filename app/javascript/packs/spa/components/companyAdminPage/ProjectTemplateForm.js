import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTemplate } from '../../actions/templates';

export default function ProjectTemplateForm({closeModal}) {
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
    closeModal()
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
      placeholder='Template Name'
      onChange={addName}
    />
    <label>CSV File</label>
    <input
      type="file"
      className="form-control form-control-sm"
      accept='.csv'
      onChange={addFile}
    />
    <div className="display-flex">
      <button
        className={`btn btn-sm ${isValid() ? "btn-outline-success border-success" : "btn-outline-danger"}`}
        onClick={submitForm()}
        disabled={!isValid()}
        style={{marginTop: "1em", flexGrow: "1"}}
      >Save</button>
      <button
        className="btn btn-sm"
        onClick={closeModal}
        style={{marginTop: "1em", marginLeft: ".5em", flexGrow: "1"}}
      >Cancel</button>
    </div>
  </div>
}
