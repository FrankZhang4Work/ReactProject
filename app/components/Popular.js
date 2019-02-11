import React from 'react';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';


function RepoGrid({ repos }) {
  //console.log(props);
  return (
    <ul className='popular-list'>
      {repos.map(({ name, stargazers_count, owner, html_url }, index) => (
        <li key={name} className='popular-item'>
          <div className='popular-rank'>#{index+1}</div>
          <ul className='space-list-items'>
            <li>
              <img 
                className='avatar' 
                src={owner.avatar_url} 
                alt={'Avatar for ' + owner.login}
              />
            </li>
            <li><a href={html_url}>{name}</a></li>
            <li>@{owner.login}</li>
            <li>{stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  );
}

function SelectLanguage({ selectedLanguage, onSelect }) { // stateless functional component
  let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map((lang) => {
        return (
          <li 
            style={lang === selectedLanguage ? {color: 'red'} : null}
            key={lang} 
            onClick={() => onSelect(lang)}>
              {lang}
          </li>
        )
      })}
    </ul>
  )
}

// props, state
// lifecycle events
// ui - render
class Popular extends React.Component {
  constructor(props) { // set state in constructor
    super(props); // always have this when having constructor

    this.state = {
      selectedLanguage: 'All', // default state
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    // AJAX
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null 
    }));

    fetchPopularRepos(lang).then((repos) => this.setState(() => ({ repos })));
  }

  render() {
    const { selectedLanguage, repos} = this.state;

    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos 
          ? <Loading />
          : <RepoGrid repos={repos} />}
      </div>
    )
  }
}

export default Popular;








