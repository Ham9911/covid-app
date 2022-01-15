import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Radio, Button } from "antd";
import {
  auth,
  signOut,
  query,
  collection,
  db,
  getDocs,
} from "../firebaseApp/FirebaseApp";
import AuthContext from "../context/AuthContext";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const Survey = () => {
  const authCtx = useContext(AuthContext);
  //Getting Survey Form Data
  let fetcheddata;
  let arr3 = [];
  let arr4 = [];
  let newarr = [];
  let [qa, setqa] = useState([]);
  //   const qaSearch=async () => {
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
  //Set Response
  const setResponseYes=(qno)=>{
    let response={qno:qno,res:"Yes"}
    console.log(response);
  }
  const setResponseNo=(qno)=>{
    let response={qno:qno,res:"No"}
    console.log(response);
  }
  

  return (
    <div>
      <div className="left-section">
        {qa.map((data, index) => {
          console.log(data);
          return (
            <div>
              <div>{data.qno}</div>
              <div>{data.ques}</div>
              <button className="surveybtn" onClick={()=>{setResponseYes(data.qno)}}>Yes</button><button className="surveybtn" onClick={()=>{setResponseNo(data.qno)}}>No</button>
              {/* <Button style={{marginTop:'10px'}} onClick={()=>{}}>Delete Post</Button> */}
            </div>
          );
        })}
      </div>
      <div className="right-section"></div>
    </div>
  );
};

export default Survey;
