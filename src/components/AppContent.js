import React from 'react';
import Search from './Search';
import UserInfo from './UserInfo';
import Actions from './Actions';
import Repos from './Repos';
import PropTypes from "prop-types";

const AppContent = ({ userinfo, repos, starred, handleSearch}) =>(
    <div className="App">
    <Search handleSearch = {handleSearch} />
    { !!userinfo && <UserInfo userinfo = { userinfo } />  } 
    { !!userinfo && <Actions /> }

    { !repos.lenght &&
    <Repos className="repos" 
      title="Repositórios"
      repos = { repos }
    />
    }

    { !starred.lenght &&
    <Repos className="starred" 
      title="Favoritos"
      repos = { starred }
    />
    }

  </div>
)

AppContent.propTypes ={
    userinfo : PropTypes.object,
    repos : PropTypes.array.isRequired,
    starred : PropTypes.array.isRequired
}

export default AppContent;
