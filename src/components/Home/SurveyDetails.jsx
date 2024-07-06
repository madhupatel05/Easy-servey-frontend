import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EditSurvey } from '../../services/survey';

const SurveyDetails = () => {
  const [toolboxItems] = useState([
    { id: 'name', label: 'Name', type: 'input' },
    { id: 'description', label: 'Description', type: 'textarea' },
  ]);

  const [surveyInputs, setSurveyInputs] = useState([]);
  const location = useLocation();
  const { survey } = location.state || {};
  const navigate = useNavigate();

  const onDragStart = useCallback((evt) => {
    evt.dataTransfer.setData('text/plain', evt.currentTarget.id);
  }, []);

  const onDrop = useCallback((evt) => {
    evt.preventDefault();
    const draggedId = evt.dataTransfer.getData('text/plain');
    const draggedItem = toolboxItems.find((item) => item.id === draggedId);
    if (draggedItem && !surveyInputs.some((input) => input.id === draggedId)) {
      setSurveyInputs((prevInputs) => [
        ...prevInputs,
        { id: draggedItem.id, value: survey[draggedItem.id] || '', type: draggedItem.type },
      ]);
    }
  }, [toolboxItems, survey, surveyInputs]);

  const handleChange = (e, id) => {
    setSurveyInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, value: e.target.value } : input
      )
    );
  };

  const handleCancel = (id) => {
    setSurveyInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
  };

  const handleSave = async () => {
    try {
      const data = JSON.stringify({
        survey: {
          name: surveyInputs.find((input) => input.id === 'name')?.value,
          description: surveyInputs.find((input) => input.id === 'description')?.value,
        },
      })
      const response = await EditSurvey(survey.id, data)
      if (response.success) {
        navigate('/')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelAll = () => {
    navigate('/');
  };

  return (
    <div className=" container bg-light p-5 mt-5">
      <h4 className='text-center'>Survey Detail's Page</h4>
      <div className="row main_div">
        <div className="col-3 border p-3">
          <h4>Tool Box</h4>
          {toolboxItems.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="card p-3 mb-3"
              draggable
              onDragStart={onDragStart}
            >
              {item.label}
              <input type="text" className="form-control mt-2" value={survey[item.id]} />
            </div>
          ))}
        </div>
        <div
          className="col-9 border p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          {surveyInputs.length === 0 && (
            <p>Drag inputs from the toolbox to start editing the survey.</p>
          )}
          {surveyInputs.map((input) => (
            <div key={input.id} className="form-group">
              <label htmlFor={input.id}>{input.label}</label>
              {input.type === 'input' ? (
                <input
                  type="text"
                  id={input.id}
                  className="form-control"
                  value={input.value}
                  onChange={(e) => handleChange(e, input.id)}
                />
              ) : (
                <textarea
                  id={input.id}
                  className="form-control"
                  rows="5"
                  value={input.value}
                  onChange={(e) => handleChange(e, input.id)}
                ></textarea>
              )}
              <div className="mt-2  d-flex justify-content-end m-2">
                <button className="btn btn-primary m-2" onClick={handleSave}>Save</button>
                <button className="btn btn-secondary m-2" onClick={() => handleCancel(input.id)}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
        <div style={{float: 'right'}}>
          <button className="btn btn-outline-secondary" onClick={handleCancelAll}>Cancel</button>
        </div>
    </div>
  );
};

export default SurveyDetails;
