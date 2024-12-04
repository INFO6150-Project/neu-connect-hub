import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import "./ProfileGithub.css";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className="github-section">
      {repos.map((repo) => (
        <div key={repo.id} className="github-repo">
          <div className="repo-header">
            <h4 className="repo-name">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <div className="repo-stats">
              <span className="stat-badge">{repo.stargazers_count} stars</span>
              <span className="stat-badge">{repo.watchers_count} watchers</span>
              <span className="stat-badge">{repo.forks_count} forks</span>
            </div>
          </div>

          {repo.description && (
            <p className="repo-description">{repo.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
