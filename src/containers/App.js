import React, {Component} from 'react';
import Cardlist from '../components/Cardlist';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';


class App extends Component {
	constructor(){
		super()
		this.state = {
			robots: [],
			searchField: '',
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=>response.json())
			.then(users =>this.setState({robots: users}));
		
	}
	onSearchChange = (event) => {
		this.setState({searchField: event.target.value})
	}
	render(){
		const {robots, searchField} = this.state;
		const filteredRobots = robots.filter(robot=>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return !robots.length ?
		<h1>Loading</h1> :
		(
			<div className='tc'>
				<h1> RoboFriends </h1>
				<Searchbox searchChange= {this.onSearchChange}/>
				<Scroll>
					<ErrorBoundry>
						<Cardlist robots ={filteredRobots}/>
					</ErrorBoundry>
				</Scroll>
			</div>
		);
	}
}

export default App;