import React, { useEffect, useContext, useState } from "react";
import {
  auth,
  collection,
  getDocs,
  signInWithEmailAndPassword,
  db,
  getDoc,
  doc,
  query,
  where,
  signOut,
  onAuthStateChanged,
} from "../firebaseApp/FirebaseApp";
import { Form, Input, Button, Checkbox } from "antd";
import AuthContext from "../context/AuthContext";
const SignIn = () => {
  const authCtx = useContext(AuthContext);
  let user = {};
  const [currUser, setcurrUser] = useState({});
  //Get User Data From FireStore
  const getUserData = async (email) => {
    console.log(email);
    let searchedUser = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    let s = query(searchedUser);
    let fetchedData = await getDocs(s);
    console.log(fetchedData);
    fetchedData.forEach((doc) => {
      setcurrUser(doc.data());
      console.log(currUser);
    });
  };
  //Note Admin ID=ham@123.com Password=123456789
  const onFinish = (values) => {
    console.log("Success:", values);
    const email = values.email;
    const password = values.password;
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log(userCredential);
      user = userCredential.user;
      console.log(user.email, user.password, "User Successfully Logged In");
      localStorage.setItem("LoggedInUser",user.email);
      getUserData(user.email);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (currUser.role === "user") {
    authCtx.checkUser();
    authCtx.onLogin();
  } else if (currUser.role === "admin") {
    authCtx.onLogin();
  }

  return (
    <div className="formBox">
      <Form
        className="form"
        name="basic"
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 12,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className="mainHeading">COVID 19 QUESTIONNAIRE</h1>
        <h2 className="SubHeading">SIGN IN</h2>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 14,
            span: 10,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 14,
            span: 10,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
