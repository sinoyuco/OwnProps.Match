import React from 'react';
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";




class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      birthDate: "",
      email: "",
      password: "",
      password2: "",
      goal: "",
      experience: "",
      language: "",
      pronouns: "",
      errors: {},
    };

    this.handleEmailErr = this.handleEmailErr.bind(this)
    this.handleNameErr = this.handleNameErr.bind(this)
    this.handlePasswordErr = this.handlePasswordErr.bind(this)
    this.handlePassword2Err = this.handlePassword2Err.bind(this)
    this.handleLangErr = this.handleLangErr.bind(this)
    this.handleProErr = this.handleProErr.bind(this)
    this.handleGoalErr = this.handleGoalErr.bind(this)
    this.handleExpErr = this.handleExpErr.bind(this)
    this.handleBirthDateErr = this.handleBirthDateErr.bind(this)

    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleDropdownp = this.handleDropdownp.bind(this);
    // this.hanldeChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }



  update(field) {
    return (e) => {
      this.props.clearSessionErrors();

      this.setState({
        [field]: e.currentTarget.value,
      });
    }
  }

  handleDropdown(e) {
    this.setState({ language: e.target.value });
  }

  handleDropdownp(e) {
    this.setState({ pronouns: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      password2: this.state.password2,
      goal: this.state.goal,
      experience: this.state.experience,
      language: this.state.language,
      pronouns: this.state.pronouns,
      birthDate: this.state.birthDate,
    };

    // this.props.signup(user, this.props.history);
    this.props.signup(user);

    // if (this.props.signup(user)) {
    //   this.props.login(user);
    // };

    console.log(this.props.errors)
    // this.props.login(user);

    //debugger
    // if (this.props.errors.length === 0 || this.state.name){
    //   this.props.login(user);
    // }
    // this.props.history.push('/show')
  }

  handleChange = (date) => {
    this.setState({
      birthDate: date,
    });
  };

  handleEmailErr() {
    let field = document.getElementById("signup-email");
    if (field === null) return;

    if (this.props.errors.email) {
      field.className = "signup-yes-errors-input";
      return "Enter a valid email";
    } else {
      field.className = "signup-no-errors-input";
    }
  }

  
  handleNameErr() {
    let field = document.getElementById("signup-name");
    if (field === null) return;
    
    if (this.props.errors.name) {
      field.className = "signup-yes-errors-input";
      return "Name field is required";
    } else {
      field.className = "signup-no-errors-input";
    }
  }
  
  handlePasswordErr() {
    let field = document.getElementById("signup-password-1");
    if (field === null) return;

    if (this.props.errors.password) {
      field.className = "signup-yes-errors-input";
      return "Password must be at least 6 characters";
    } else {
      field.className = "signup-no-errors-input";
    }
  }

  handlePassword2Err() {
    let field = document.getElementById("signup-password-2");
    if (field === null) return;

    if (this.props.errors.password2) {
      field.className = "signup-yes-errors-input";
      return "Passwords must match";
    } else {
      field.className = "signup-no-errors-input";
    }
  }

  handleLangErr() {
    let field = document.getElementById("signup-lang");
    if (field === null) return;

    if (this.props.errors.language) {
      field.className = "signup-yes-errors-select";
      return "Language field is required";
    } else {
      field.className = "signup-no-errors-select";
    }
  }

  handleProErr() {
    let field = document.getElementById("signup-pro");
    if (field === null) return;

    if (this.props.errors.pronouns) {
      field.className = "signup-yes-errors-select";
      return "Pronoun field is required";
    } else {
      field.className = "signup-no-errors-select";
    }
  }
  
  handleGoalErr() {
    let field = document.getElementById("signup-goal");
    if (field === null) return;

    if (this.props.errors.goal) {
      field.className = "signup-yes-errors-textarea";
      return "Goal field is required";
    } else {
      field.className = "signup-no-errors-textarea";
    }
  }
  
  handleExpErr() {
    let field = document.getElementById("signup-exp");
    if (field === null) return;

    if (this.props.errors.experience) {
      field.className = "signup-yes-errors-textarea";
      return "Experience field is required";
    } else {
      field.className = "signup-no-errors-textarea";
    }
  }

  handleBirthDateErr() {
    let field = document.getElementById("date-exp");
    if (field === null) return;

    if (this.props.errors.birthdate) {
      field.className = "signup-yes-errors-date";
      return "Birthdate field is required";
    } else {
      field.className = "signup-no-errors-date";
    }
  }


  componentDidMount() {
    this.props.clearSessionErrors();


    let inputs = document.getElementsByClassName("signup-yes-errors-input");

    Array.from(inputs).forEach(input => {
      input.className = "signup-no-errors-input";
    });

    let selects = document.getElementsByClassName("signup-yes-errors-select");

    Array.from(selects).forEach(select => {
      select.className = "signup-no-errors-select";
    });

    let textareas = document.getElementsByClassName("signup-yes-errors-textarea");

    Array.from(textareas).forEach(textarea => {
      textarea.className = "signup-no-errors-textarea";
    });

    let date = document.getElementsByClassName("signup-yes-errors-date")

    date.className = "signup-no-errors-date"

  }

  
  render() {

    return (
      <div className="signup-form-container" >
        <form onSubmit={this.handleSubmit} className="signup-form-with-header">
          <div className="signup-form">
            <h1>Sign Up Here</h1>

            <input
              className="signup-no-errors-input"
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
              id="signup-email"
            />

            <p className="signup-error">{this.handleEmailErr()}</p>

            <input
            className="signup-no-errors-input"
              type="text"
              value={this.state.name}
              onChange={this.update("name")}
              placeholder="Name"
              id="signup-name"
            />

            <p className="signup-error">{this.handleNameErr()}</p>

            <input
            className="signup-no-errors-input"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
              id="signup-password-1"
            />
            <p className="signup-error">{this.handlePasswordErr()}</p>

            <input
            className="signup-no-errors-input"
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
              id="signup-password-2"
            />

            <p className="signup-error">{this.handlePassword2Err()}</p>
          <div className="signup-dropdown">
            <div className='dropdowns-row'>
                <span className='signup-lang-span'>

                  <select
                    onChange={this.handleDropdown}
                    value={this.state.value}
                    id="signup-lang"
                    className="signup-no-errors-select"
                    name={this.state.language === "" ? 'default' : 'selected'}
                    
                    // style={{color: 'red'}}
                  >
                    <option 
                    
                    value="" selected disabled hidden
                      >
                      Language/framework
                    </option>
                    <option value="Ruby">Ruby</option>
                    <option value="Rails">Rails</option>
                    <option value="Javascript">Javascript</option>
                    <option value="React">React</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="Node.js">Node.js</option>
                  </select>
                </span>
                
                
                <span>
                  {/* <label>Pronouns:</label> */}
                  <select
                    onChange={this.handleDropdownp}
                    value={this.state.value}
                    className="signup-no-errors-select"
                    name={this.state.pronouns === "" ? 'default' : 'selected'}
                    
                    id="signup-pro"
                    
                  >
                    <option  value="" selected disabled hidden
                      >
                      Pronouns
                    </option>
                    <option id='option' value="He/Him/His">He/Him/His</option>
                    <option value="She/Her/Hers">She/Her/Hers</option>
                    <option value="They/Them/Their">They/Them/Their</option>
                    <option value="Xe/Xem/Xyr">Xe/Xem/Xyr</option>
                  </select>
                </span>
              </div>

            <span className='dropdown-errors'>
                <p className="signup-error">{this.handleLangErr()}</p>

                <p className="signup-error">{this.handleProErr()}</p>
            </span>
          </div>

            <label>
              {/* Goal: */}
              <br />
              <textarea
              style={{resize: "none"}}
                className="signup-no-errors-textarea"
                value={this.state.goal}
                onChange={this.update("goal")}
                id="signup-goal"
                placeholder="Your goal"
              />
            </label>

            <p className="signup-error">{this.handleGoalErr()}</p>

            <label>
              {" "}
              {/* Experience: */}
              <br />
              <textarea
              style={{resize: "none"}}
                className="signup-no-errors-textarea"
                value={this.state.experience}
                onChange={this.update("experience")}
                id="signup-exp"
                placeholder="Experience"
              />
            </label>

            <p className="signup-error">{this.handleExpErr()}</p>

            <label >
              {/* Birthdate: */}
              <DatePicker
                id="date-exp"
                className="signup-no-errors-date"
                selected={this.state.birthDate}
                onChange={this.handleChange}
                placeholderText='Birthdate'
              />
            </label>
            <p className="signup-error">{this.handleBirthDateErr()}</p>

            <input type="submit" value="Submit" />
            <p className="link-to-other-form">Already have an account? <Link to="/login">Log in</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;