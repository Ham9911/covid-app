import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { auth, signOut, setDoc, db, doc } from "../firebaseApp/FirebaseApp";
import {
  Form,
  Input,
  Radio,
  Button,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const AdminHome = () => {
  const authCtx = useContext(AuthContext);
  let singleQues = { data: null,
  option1:"Yes",
  option2:"No" };
  let multipleQues = { data: null };
  const singleQuesData = () => {
    setDoc(doc(db, "singleQuestionAnswers", singleQues.qno), singleQues);
    console.log("Data has been set to db");
  };
  const multipleQA = () => {
    setDoc(doc(db, "multipleQA", multipleQues.qno), multipleQues);
    console.log("Data has been set to db");
  };
  //Question Form
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
  };
  const tailLayout = {
    wrapperCol: { offset: 5, span: 10 },
  };

  const onFinish = (values) => {
    console.log(values);
    if (selection === "Single") {
      singleQues.qno = values.QuesNo;
      singleQues.ques = values.question;
      singleQues.answer = values.answer;
      if (values.data) {
        singleQues.data = values.data;
      }
      if (Object.keys(singleQues).length != 0) {
        //setting data on firebase db
        singleQuesData();
      }
    }
    if (selection === "Multiple") {
      multipleQues.qno = values.QuesNo;
      multipleQues.ques = values.question;
      multipleQues.correctAnswers = values.correctAnswers;
      multipleQues.wrongAnswers = values.wrongAnswers;
      if (values.data) {
        multipleQues.data = values.data;
      }
      if (Object.keys(multipleQues).length != 0) {
        //setting data on firebase db
        multipleQA();
        
      }
    }
    console.log(multipleQues);
  };

  const onReset = () => {
    form.resetFields();
  };
  //Question Form End

  //Type Selection Menu
  let checkSingle = null;
  const [selection, setSelection] = useState("Single");
  const selectHandler = (e) => {
    setSelection(e.target.value);
  };
  if (selection === "Single") {
    checkSingle = true;
  } else if (selection === "Multiple") {
    checkSingle = false;
  }
  //Type Selection Menu End

  //MCQ Form
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  //MCQ Form End

  //Set Data on FireStore DB

  //Set Data on FireStore DB End
  const logout = () => {
    console.log("function Runned");
    signOut(auth)
      .then(() => {
        authCtx.onLogout();
        authCtx.isUser=false;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="left-section">
        <div className="sub-leftSection">
          {checkSingle ? (
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={onFinish}
            >
              <Form.Item
                name="QuesNo"
                label="QuesNo"
                rules={[{ required: true }]}
              >
                <Input placeholder="Should be a unique value" />
              </Form.Item>
              <Form.Item
                name="question"
                label="Question"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter question here" />
              </Form.Item>
              <Form.Item name="data" label="Data" rules={[{ required: false }]}>
                <Input placeholder="Only for Information" />
              </Form.Item>
              <Form.Item
                name="answer"
                label="Answer"
                rules={[{ required: true }]}
              >
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.gender !== currentValues.gender
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("gender") === "other" ? (
                    <Form.Item
                      name="customizeGender"
                      label="Customize Gender"
                      rules={[{ required: true }]}
                    >
                      <span>
                        <Input />
                      </span>
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form
              name="dynamic_form_item"
              {...formItemLayoutWithOutLabel}
              onFinish={onFinish}
            >
              <h3>Note: Enter correct MCQ selection in first Answer Box</h3>
              <Form.Item
                name="QuesNo"
                label="QuesNo"
                rules={[{ required: true }]}
              >
                <span className="ant-input1">
                  <Input />
                </span>
              </Form.Item>
              <Form.Item
                name="question"
                label="Question"
                rules={[{ required: true }]}
              >
                <span className="ant-input1">
                  <Input />
                </span>
              </Form.Item>
              <Form.Item name="data" label="Data" rules={[{ required: false }]}>
                <span className="ant-input2">
                  <Input placeholder="Only for Information" />
                </span>
              </Form.Item>
              <Form.List
                name="correctAnswers"
                rules={[
                  {
                    validator: async (_, correctAnswers) => {
                      if (!correctAnswers || correctAnswers.length < 1) {
                        return Promise.reject(new Error("At least 1 Answer"));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "correctAnswers" : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input Answer or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="correctAnswer"
                            style={{ width: "60%" }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add Correct Answer
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              {/* Wrong Answers */}
              <Form.List
                name="wrongAnswers"
                rules={[
                  {
                    validator: async (_, wrongAnswers) => {
                      if (!wrongAnswers || wrongAnswers.length < 2) {
                        return Promise.reject(new Error("At least 2 Answers"));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "wrongAnswers" : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input Answer or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="wrongAnswers"
                            style={{ width: "60%" }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add Wrong Answer
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
        <div className="rightofleftSection">
          <form>
            <label className="subHeading"> Type Of Response </label>
            <select defaultValue={"Single"} onChange={selectHandler}>
              <option value="Single"> Single</option>
              <option value="Multiple"> Multiple</option>
            </select>
          </form>
        </div>
      </div>
      <div className="right-section">
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default AdminHome;
