import React from "react";
import { Form, Input, Button } from "antd";
import { auth, createUserWithEmailAndPassword,setDoc,doc,db } from '../firebaseApp/FirebaseApp';
const Signup = () => {
    const onFinish = (values) => {
        let userDetails={};
        console.log('Success:', values);
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            user.displayName = values.username
            setDoc(doc(db, "users", user.email), {
            name: values.username,
            email: values.email,
            uid: user.uid,
            role:"user",
        });
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      console.log('User Details',userDetails)
        }
    
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
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
        <h2 className="SubHeading">SIGN UP</h2>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please input your first Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
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
          wrapperCol={{
            offset: 14,
            span: 10,
          }}
        >
          <Button type="primary" htmlType="submit">
           Sign Up
          </Button>
        </Form.Item>
      </Form>
    
    </div>
  );
};
export default Signup
