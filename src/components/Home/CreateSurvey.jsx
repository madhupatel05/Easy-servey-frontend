import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddSurvey } from '../../services/survey';


const CreateSurvey = () => {
  const [survey, setSurvey] = useState({ name: '', description: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const handleCancle = () => {
    navigate('/')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = JSON.stringify(survey)
      const response =await AddSurvey(data)
      if(response.success){
        const result = response.data
        navigate('/survey-details', { state: { survey: result } });
      } else {
        throw new Error('Failed to create survey');
      }
    } catch (error) {
      setError('Failed to create survey. Please try again.');
    }
  };

  return (

    <div class="container bg-light p-5 mt-5 rounded">
      <h2 class="mb-4">Create Survey</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div class="form-group row m-2">
          <label for="name" class="col-sm-2 col-form-label text-left">Name<span className='text-danger'>*</span></label>
          <div class="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={survey.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div class="form-group row m-2">
          <label for="comment" class="col-sm-2 col-form-label text-left">Description</label>
          <div class="col-sm-8">
            <textarea
              className="form-control"
              rows="5"
              id="description"
              name="description"
              value={survey.description}
              onChange={handleChange}
            ></textarea>        </div>
        </div>
        <div class="form-group row m-3 p-2">
          <div class="col-sm-8 offset-sm-2 d-flex justify-content-between">
            <button type="button" class="btn btn-secondary mr-2" onClick={handleCancle}>Cancel</button>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default CreateSurvey;