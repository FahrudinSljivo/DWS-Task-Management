import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import authService from './api-authorization/AuthorizeService';

class GroupUsers extends Component {
    static displayName = GroupUsers.name;

    constructor(props) {
        super(props);
        this.state = { Users: [] };
        //this.deleteTodo = this.deleteTodo.bind(this);
    }

    async componentDidMount() {
        let token = await authService.getAccessToken();
        console.log(token);
        Axios.get("https://localhost:44334/api/Groups/" + this.props.match.params.id + "/users", {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                console.log("Proslo");
                console.log(res.data);
                this.setState({ Users: res.data }, () => {console.log(this.state.Users)})
            })
            .catch(err => {
                console.log("Nije proslo");
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                {this.state.Users.map(p => {
                    return <div> <h1>{p.user.userName}</h1> </div>
                })}
            </div>
        );
    }
}


export default GroupUsers;