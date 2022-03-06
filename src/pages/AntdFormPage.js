import React, { useEffect, Component } from "react";
import { Form, Button, Input } from "antd";

const FormItem = Form.Item;

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

export default class AntdFormPage extends Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({ username: "defalut" });
  }
  onFinish = (val) => {
    console.log("onFinish", val); //sy-log
  };
  onFinishFailed = (val) => {
    console.log("onFinishFailed", val); //sy-log
  };
  render() {
    return (
      <div>
        <h3>AntdFormPage</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <FormItem name="username" label="姓名" rules={[nameRules]}>
            <Input placeholder="username placeholder" />
          </FormItem>
          <FormItem name="password" label="密码" rules={[passworRules]}>
            <Input placeholder="password placeholder" />
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

// Antd 3 Form HOC
// todo antd4 form store (state、)

// export default function AntdFormPage(props) {
//   const [form] = Form.useForm();
//   const onFinish = (val) => {
//     console.log("onFinish", val); //sy-log
//   };
//   const onFinishFailed = (val) => {
//     console.log("onFinishFailed", val); //sy-log
//   };

//   useEffect(() => {
//     form.setFieldsValue({username: "defalut"});
//     console.log("form", form); //sy-log
//   }, []);

//   return (
//     <div>
//       <h3>AntdFormPage</h3>
//       <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//         <FormItem name="username" label="姓名" rules={[nameRules]}>
//           <Input placeholder="username placeholder" />
//         </FormItem>
//         <FormItem name="password" label="密码" rules={[passworRules]}>
//           <Input placeholder="password placeholder" />
//         </FormItem>
//         <FormItem>
//           <Button type="primary" size="large" htmlType="submit">
//             Submit
//           </Button>
//         </FormItem>
//       </Form>
//     </div>
//   );
// }
