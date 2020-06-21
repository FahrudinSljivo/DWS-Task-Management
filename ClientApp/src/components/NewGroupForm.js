import React from 'react';
import Axios from 'axios';
import authService from './api-authorization/AuthorizeService';
import './Forms.css';
import jwtDecode from 'jwt-decode';

class NewGroupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Name: '' };
    }

    

     mySubmitHandler = async (event) => {
        alert("You are submitting data.");
        //...
        event.preventDefault();
         let token = await authService.getAccessToken();
         token = jwtDecode(token);
         Axios.post("https://localhost:44334/api/Groups", { Name: this.state.Name, Token: token.sub }, { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } })
            .then(res => alert("Dodano"))
             .catch(err => console.log(err));

         window.location.href = "https://localhost:44334/groups";
    }

    myChangeHandler = (event) => {
        this.setState({ Name: event.target.value });
    }

    render() {
        return (
            <div class="body-background">
                <div class="container">
                    <div class="row d-flex justify-content-center mx-auto">
                        <div class="col-md-6 col-xs-12 div-style">
                            <form onSubmit={this.mySubmitHandler}>
                                <div class="d-flex justify-content-center mx-auto main-label" >
                                    <h2>Enter the name of your group:</h2>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control text-box" name="Name" onChange={this.myChangeHandler} />
                                </div>
                                <div class="form-group justify-content-center d-flex">
                                    <input type="submit" class="btn btn-primary button-submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewGroupForm;
