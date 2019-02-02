const React = require('react');
const api = require('../utils/api');
const Loading = require('./Loading');


function RepoGrid(props) {
  //console.log(props);
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index+1}</div>
            <ul className='space-list-items'>
              <li>
                <img 
                  className='avatar' 
                  src={repo.owner.avatar_url} 
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  );
}

function SelectLanguage(props) { // stateless functional component
  let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map((lang) => {
        return (
          <li 
            style={lang === props.selectedLanguage ? {color: 'red'} : null}
            key={lang} 
            onClick={props.onSelect.bind(null, lang)}>
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

  componentDidMount () {
    // AJAX
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(() => {
      //console.log(lang);
      return {
        selectedLanguage: lang,
        repos: null 
      }
    });

    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => {
          return {
            repos: repos
          };
        });
      });
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos 
          ? <Loading />
          : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

module.exports = Popular;








