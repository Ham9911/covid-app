import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Radio, Button } from "antd";
import {
  auth,
  doc,
  setDoc,
  query,
  collection,
  db,
  getDocs,
  onAuthStateChanged,
} from "../firebaseApp/FirebaseApp";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Survey = () => {
  let navigate=useNavigate();
  const authCtx = useContext(AuthContext);
  //Getting Survey Form Data
  let fetcheddata;
  let arr3 = [];
  let arr4 = [];
  let arr5 = [];
  let [surveyResponse, setsurveyResponse] = useState([]);
  let [qa, setqa] = useState([]);

  useEffect(async () => {
    let qaData = query(collection(db, "singleQuestionAnswers"));
    console.log(qa);
    let q = query(qaData);
    fetcheddata = await getDocs(q);
    console.log(fetcheddata);
    fetcheddata.forEach((doc) => {
      arr3 = doc.data();
      arr4.push(arr3);
      console.log(arr4);
    });
    console.log(arr4);
    setqa(arr4);
  }, []);
  //Checking User
  let currUser = {};
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        const lastLoggedin = new Date();
        console.log(email);
        currUser.email = email;
        currUser.surveytakenat = lastLoggedin;
        setsurveyResponse([currUser]);
        // ...
      } else {
        // User is signed out
        // ...
        console.log("no user has logged in");
      }
    });
  }, []);

  //Set Response
  const setResponseYes = (qno) => {
    let response = { qno: qno, res: "Yes" };
    console.log(surveyResponse);
    setsurveyResponse([...surveyResponse, response]);
  };
  const setResponseNo = (qno) => {
    let response = { qno: qno, res: "No" };
    console.log(surveyResponse);
    setsurveyResponse([...surveyResponse, response]);
  };
  //Setting Data on FireStore
  const onSubmitHandler = () => {
    setDoc(doc(db, "survey", surveyResponse[0].email), {surveyResponse});
    console.log("Data has been set to db");
    navigate('/');
  };

  console.log(surveyResponse);
  return (
    <div>
      <div className="left-section">
        {qa.map((data, index) => {
          console.log(data);
          return (
            <div>
              <div>
                Q-{data.qno}:{data.ques}
              </div>
              <div></div>
              <button
                className="surveybtn"
                onClick={() => {
                  setResponseYes(data.qno);
                }}
              >
                Yes
              </button>
              <button
                className="surveybtn"
                onClick={() => {
                  setResponseNo(data.qno);
                }}
              >
                No
              </button>
            </div>
          );
        })}
      <div><Button className="surveySubmit" onClick={onSubmitHandler} >Submit Survey</Button></div>
      </div>
      <div className="right-section"></div>
    </div>
  );
};

export default Survey;
