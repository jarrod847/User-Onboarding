import React, {useState, useEffect} from "react"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components"

const StyledForm = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
`;







const Login = ({values, errors, touched, status}) => {
    
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (status) {
            setUser([...user, status])
        }
    }, [status]);


    


    return(
        <div>
            <h2>Login</h2>
            <Form>
                <StyledForm>
                    <label className="userinfo">Name
                    <Field type="text" name="name" placeholder="insert name"/>
                    {touched.name && errors.name && (<p className="error">{errors.name}</p>)}
                    </label>
                    <label className="userinfo">Email
                    <Field type="text" name="email" placeholder="insert email"/>
                    {touched.email && errors.email && (<p className="error">{errors.email}</p>)}
                    </label>
                    <label className="userinfo">Password
                    <Field type="text" name="pw" placeholder="insert password"/>
                    {touched.pw && errors.pw && (<p className="error">{errors.pw}</p>)}
                    </label>
                    <label className="checkbox">Policy Agreement
                    <Field type='checkbox' name="policy" checked={values.policy}/>
                    {touched.policy && errors.policy && (<p className="error">{errors.policy}</p>)}
                    </label>
                    <button type="submit">Submit</button>        
                </StyledForm>
            </Form>

            {user.map(person => (
                <ul key={person.id}>
                    <li>Name: {person.name}</li>
                    <li>Email: {person.email}</li>
                    <li>Password: {person.password}</li>
                </ul>
            ))}

        </div>

    
    )
}

const FormikLogin = withFormik({
    mapPropsToValues({name, email, pw, policy}){
        return{
            name: name || "",
            email: email || "",
            pw: pw || "",
            policy: policy || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Required field."),
        email: Yup.string().required("Required field."),
        pw: Yup.string().required("Required field."),
        policy: Yup.boolean().required(true)
    }),
    handleSubmit(values, { setStatus }) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
                console.log(response);
                setStatus(response.data);
            })
            .catch(error => console.log(error.response));
    }
})(Login);




export default FormikLogin