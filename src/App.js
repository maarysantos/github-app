import React, { Component} from 'react';
import AppContent from './components/AppContent';
import './App.css';
import ajax from '@fdaciuk/ajax';
import { throws } from 'assert';

class App extends Component {
  constructor(){
    super()
    this.state = {
      userInfo : null,
      repos :[],
      starred : [],
      isFetching: false
    }
  }

  gitHubApiUrl (username, type){
    const internalUser = username ? `/${username}` : ''
    const internalType = type ? `/${type}` : ''
    return ` https://api.github.com/users${internalUser}${internalType}`
  }

  handleSearch(e){
      const value = e.target.value
      const keyCode = e.which || e.keyCode
      const enter = 13
      if (keyCode === enter){
        this.setState({
          isFetching : true
        })
      ajax().get(this.gitHubApiUrl(value))
      .then((result) =>{
        this.setState({
          userInfo :{
             username: result.name,
             photo: result.avatar_url,
             login : result.login,
             repos : result.public_repos,
             followers: result.followers,
             following : result.following
        },
        repos :[],
        starred : []
        })
      })
      .always(()=>{
        this.setState({ isFetching:false })
      })
      }
    }

  getRepos(type){
     return (e) =>{
      const username = this.state.userInfo.login
      ajax().get(this.gitHubApiUrl(username, type))
      .then((result) =>{
        this.setState({ 
          [type] :
            result.map((repo)=>{
              return {
                name:repo.name,
                link: repo.html_url
              }
            })
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
    isFetching = { this.state.isFetching}
    handleSearch ={(e)=> this.handleSearch(e)}
    getRepos ={this.getRepos('repos')}
    getStarred ={this.getRepos('starred')}
     />
  )
  }
}

export default App;
