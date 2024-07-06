import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  getSurvey } from '../../services/survey'

const Home = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getSurveyList = async () => {
    try {
      const res = await getSurvey();
      setSurveys(res);
    } catch (error) {
        setError(error);
      } finally {
          setLoading(false);
        }
  };

  useEffect(() => {
    getSurveyList();
  }, [])

  const handleViewSurvey = (survey) => {
    navigate('/survey-details', { state: { survey: survey } });
  };

  const handleCreateSurvey = () => {
    navigate('/create-survey')
  };

  return (
    <>
      {/* Navbar */}

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Easy Survey</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          {/* <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div> */}
        </div>
      </nav>

      {/* Survey List  */}

      <div className="container album py-5 bg-light mt-5">
        <div className="col text-end m-2">
          <button className="btn btn-success" onClick={handleCreateSurvey} >Create New Survey</button>
        </div>
        <p>{error}</p>
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {surveys.map((survey) => (
            <div className="col" key={survey.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4
                    className="card-text survey-link"
                    onClick={() => handleViewSurvey(survey)}
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    {survey.name}
                  </h4>
                  <p className="card-text">{survey.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
