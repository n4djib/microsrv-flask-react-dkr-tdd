import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Form extends Component {
    constructor (props) {
        super(props);
        this.state = {
            formData: {
                username: '',
                email: '',
                password: ''
            }
        };
        this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    };

    componentDidMount() {
        this.clearForm();
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.formType !== nextProps.formType) {
            this.clearForm();
        };
    };

    clearForm() {
        this.setState({
            formData: {username: '', email: '', password: ''}
        });
    };

    handleFormChange(event) {
        const obj = this.state.formData;
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    };

    handleUserFormSubmit(event) {
        event.preventDefault();
        const formType = this.props.formType
        let data;
        if (formType === 'login') {
            data = {
                email: this.state.formData.email,
                password: this.state.formData.password
            };
        };

        if (formType === 'register') {
            data = {
                username: this.state.formData.username,
                email: this.state.formData.email,
                password: this.state.formData.password
            };
        };

        const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/${formType}`;
        axios.post(url, data)
            .then((res) => {
                this.clearForm();
                this.props.loginUser(res.data.auth_token);
            })
            .catch((err) => { console.log(err); });
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />;
        }
        
        return (
          <div>
            <h1>{this.props.formType}</h1>
            <hr/>
            <br/>
            <form onSubmit={(event) => this.props.handleUserFormSubmit(event)}>
                {this.props.formType === 'Register' &&
                    <div className="form-group">
                        <input
                            name="username"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Enter a username"
                            required
                            value={this.props.formData.username}
                            onChange={this.props.handleFormChange}
                        />
                    </div>
                }
                <div className="form-group">
                    <input
                        name="email"
                        className="form-control input-lg"
                        type="email"
                        placeholder="Enter an email address"
                        required
                        value={this.props.formData.email}
                        onChange={this.props.handleFormChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        name="password"
                        className="form-control input-lg"
                        type="password"
                        placeholder="Enter a password"
                        required
                        value={this.props.formData.password}
                        onChange={this.props.handleFormChange}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    value="Submit"
                />
            </form>
          </div>
        )

    }


};

export default Form;
