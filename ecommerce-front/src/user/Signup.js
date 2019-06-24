import React from "react";
import Layout from '../core/Layout';
import { API } from '../config';


const Signup = () => {
  //handle change method
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const handleChange = name => event => {
      setValues({...values, error: false, [name]: event.target.value})
  }

  const signUpForm = () => (
      <form>
          <div className="form-group">
              <lable className="text-muted">Name</lable>
              <input onChange={handleChange('name')} type="text" className="form-control" />
          </div>

          <div className="form-group">
              <lable className="text-muted">Email</lable>
              <input onChange={handleChange('email')} type="email" className="form-control" />
          </div>

          <div className="form-group">
              <lable className="text-muted">Password</lable>
              <input onChange={handleChange('password')} type="password" className="form-control" />
          </div>
              <button className="btn btn-primary">Submit</button>

      </form>
  )

    return(
        <Layout 
                title="Signup" 
                description="Signup to Node React Bookstore App"
                className="container col-md-8 offset-md-2"
        >
          { signUpForm() }
          {JSON.stringify(values)}
        </Layout>
    );
  };   


export default Signup;