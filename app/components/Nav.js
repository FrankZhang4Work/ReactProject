const React = require('react');
//const Link = require('react-router-dom').Link;
const NavLink = require('react-router-dom').NavLink;

function Nav(props) {
	return (
		<ul className='nav'>
			<li>
				<NavLink exact activeClassName='active' to='/'>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='active' to='/battle'>
					Battle
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='active' to='/popular'>
					Popular
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='active' to='/playGround'>
					Play Ground
				</NavLink>
			</li>
		</ul>
	)
}

module.exports = Nav;