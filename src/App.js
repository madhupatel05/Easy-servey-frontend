
import HomePage from './components/Home/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SurveyDetails from './components/Home/SurveyDetails';
import SurveyDetails from "./components/Home/SurveyDetails"
import CreateSurvey from "./components/Home/CreateSurvey"
import "./styles.css";




function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/create-survey" element={<CreateSurvey/>}></Route>
        <Route path="/survey-details" element={<SurveyDetails/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
