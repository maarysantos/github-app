import React, { Component} from 'react';
import AppContent from './components/AppContent';
import './App.css';
import ajax from '@fdaciuk/ajax';

class App extends Component {
  constructor(){
    super()
    this.state = {
      userInfo : null,
      repos :[],
      starred : []
    }
  }

  handleSearch(e){
      const value = e.target.value
      const keyCode = e.which || e.keyCode
      const enter = 13
      if (keyCode === enter){
      ajax().get(` https://api.github.com/users/${value}`)
      .then((result) =>{
        this.setState({
          userInfo :{
             username: result.name,
             photo: result.avatar_url,
             login :result.login,
             repos :result.public_repos,
             followers:result.followers,
             following : result.followers
        }
        })
      })
    }
  }
  render(){
  return (
    < AppContent 
    userinfo = { this.state.userInfo } 
    repos = { this.state.repos} 
    starred = { this.state.starred }
    handleSearch ={(e)=> this.handleSearch(e)}
     />
  )
  }
}

export default App;
