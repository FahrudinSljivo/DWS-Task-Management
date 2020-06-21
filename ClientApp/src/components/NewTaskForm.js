import React from 'react';
import Axios from 'axios';
import './Forms.css';
import jwtDecode from 'jwt-decode';
import authService from './api-authorization/AuthorizeService';

class NewTaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            taskDescription: '',
            dateOfExp: '',
            priority: null,
        };
    }

    mySubmitHandler = async (event) => {
        alert("You are submitting data.");
        //...
        event.preventDefault();

        var parts = this.state.dateOfExp.split('-');
        var mydate = new Date(parts[0], parts[1], parts[2]);
        this.state.dateOfExp = mydate;

        let token = await authService.getAccessToken();
        token = jwtDecode(token);

        Axios.post("https://localhost:44334/api/Todos", {
            taskName: this.state.taskName,
            taskDescription: this.state.taskDescription,
            dateOfExp: this.state.dateOfExp,
            priority: this.state.priority,
            Token: token.sub
        })
            .then(res => alert("Dodano"))
            .catch(err => console.log(err));

        window.location.href = "https://localhost:44334/";
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }


    render() {
        return (
           
            <div class="body-background">
                <div class="container">
                    <div class="row d-flex justify-content-center mx-auto">
                        <div class="col-md-6 col-xs-12 div-style">
                            <form onSubmit={this.mySubmitHandler}>
                                <div class="d-flex justify-content-center mx-auto main-label" >
                                </div>
                                <div class="form-group">
                                    <p>Enter task name:</p>
                                    <input type="text" class="form-control text-box" name="taskName" onChange={this.myChangeHandler} />
                                </div>
                                <div class="form-group">
                                    <p>Enter task description:</p>
                                    <textarea name="taskDescription" rows="3" cols="50" class="form-control text-box" onChange={this.myChangeHandler}></textarea>
                                </div>
                                <div class="form-group">
                                    <p>Enter date of expiry (YYYY-MM-DD):</p>
                                    <input type="text" class="form-control text-box" name="expDate" onChange={this.myChangeHandler} />
                                </div>
                                <div class="form-group">
                                    <p>Select task priority (1 being highest priority):</p>
                                    <input type="radio" name="priority" value='1' onChange={this.myChangeHandler} />
                                    <label for="first">1</label><br />
                                    <input type="radio" name="priority" value='2' onChange={this.myChangeHandler} />
                                    <label for="second">2</label><br />
                                    <input type="radio" name="priority" value='3' onChange={this.myChangeHandler} />
                                    <label for="third">3</label><br />
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

export default NewTaskForm;
