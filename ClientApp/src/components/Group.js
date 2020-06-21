import React, { Component } from 'react';
import Axios from 'axios';
import authService from './api-authorization/AuthorizeService';
import { Link } from 'react-router-dom';

export class Group extends Component {

  constructor(props) {
    super(props);
      this.state = {Groups: []};
  }

    async componentDidMount() {
        let token = await authService.getAccessToken();
        Axios.get("https://localhost:44334/api/Groups", {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                console.log("Proslo");
                console.log(res.data);
                this.setState({ Groups: res.data }, () => { console.log(this.state.Groups) })
            })
            .catch(err => {
                console.log("Nije proslo");
                console.log(err);
            })
    }

  render() {
      return (
              <div>
              <h1>All groups: </h1> 
              <br />
              {this.state.Groups.map(p => {
                  return <Link to={`/groups/${p.groupId}`}><h1>{p.group.name}</h1></Link>
              })}
              <br />
              <div>
                  <Link to="addGroup">Napravi novu grupu</Link>
              </div>
              </div>
    );
  }
}
