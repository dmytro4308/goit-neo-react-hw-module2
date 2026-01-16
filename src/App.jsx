import { useState, useEffect } from "react";
import "./App.module.css";
import Description from "./components/Description/Description";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

const getInitialState = () => {
  const savedValues = localStorage.getItem('feedback-values');
  
  if (savedValues) {
    try {
      return JSON.parse(savedValues);
    } catch (error) {
      console.error("Error during parsing localStorage:", error);
    }
  }
  
  return {
    good: 0,
    neutral: 0,
    bad: 0,
  };
};

const STORAGE_KEY = 'feedback-values';

const App = () => {
  const [values, setValues] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values)); 
  }, [values]);

  const updateFeedback = feedbackType => {
    setValues(prevValues => ({
      ...prevValues,
      [feedbackType]: prevValues[feedbackType] +1,
    }))
};

const totalFeedback = values.good + values.neutral + values.bad;

const resetFeedback = () => {
  setValues({
    good: 0,
    neutral: 0,
    bad: 0,
  });
};

const avgFeedback = Math.round((values.good/totalFeedback) * 100) 
  return (
    <div className="app">
      <Description />
      <Options onUpdate={updateFeedback} onReset={resetFeedback} total={totalFeedback}/>
      {totalFeedback === 0 ? ( <Notification />) : <Feedback good = {values.good} neutral={values.neutral} bad = {values.bad} total={totalFeedback} avg = {avgFeedback}/> }     
    </div>
  );
};

export default App;