import React from 'react';
import Axios from 'axios';
import './Forms.css';

class AddNewUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        };
    }

    mySubmitHandler = (event) => {
        alert(this.props.match.params.id)
        alert(this.state.userName);
        //...
        event.preventDefault();

        Axios.post("https://localhost:44334/api/Groups/" + this.props.match.params.id, {
            UserName: this.state.userName
        })
            .then(res => alert("Dodano"))
            .catch(err => console.log(err));
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
                                    <h2>Enter username:</h2>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control text-box" name="userName" onChange={this.myChangeHandler}/>
                                </div>
                                <div class="form-group justify-content-center d-flex">
                                    <input type="submit" class="btn btn-primary button-submit" value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewUser;
