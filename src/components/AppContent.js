import React from 'react';
import Search from './Search';
import UserInfo from './UserInfo';
import Actions from './Actions';
import Repos from './Repos';
import PropTypes from "prop-types";

const AppContent = ({ 
  userinfo,
  repos, 
  starred,
  isFetching,
  handleSearch,
  getRepos, 
  getStarred,
  
}) =>(
    <div className="App">
    <Search isDisabled ={isFetching} handleSearch = {handleSearch} />
    {isFetching && <div>Carregando...</div>}
    { !!userinfo && <UserInfo userinfo = { userinfo } />  } 
    { !!userinfo && <Actions getRepos ={ getRepos } getStarred ={ getStarred}/> }

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
    starred : PropTypes.array.isRequired,
    isFetching : PropTypes.bool.isRequired,
    handleSearch : PropTypes.func.isRequired,
    getRepos : PropTypes.func.isRequired,
    getStarred : PropTypes.func.isRequired
}

export default AppContent;
