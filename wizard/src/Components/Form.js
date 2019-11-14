import React, {useState, useEffect} from "react"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";



const Login = ({values}) => {
    return(
        <div>
            <h2>Login</h2>
            <Form>
            <label className="userinfo">Name
            <Field type="text" name="name" placeholder="insert name"/>
            </label>
            <label className="userinfo">Email
            <Field type="text" name="email" placeholder="insert email"/>
            </label>
            <label className="userinfo">Password
            <Field type="text" name="pw" placeholder="insert password"/>
            </label>
            <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

const FormikLogin = withFormik({
    mapPropsToValues({name, email, pw}){
        return{
            name: name || "",
            email: email || "",
            pw: pw || ""
        }
    }
})(Login);



export default FormikLogin