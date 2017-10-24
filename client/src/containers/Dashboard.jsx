import React, {Component} from 'react';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  gridList: {
    width: 500,
    height: 'auto',
    overflowY: 'auto',
  },
};

class Dashboard extends Component{
  constructor(props){
    super(props)

    this.state = {
      user: {},
      couplegoals: []
    }
  }

  componentWillMount(){
    axios.get(`/api/v1/users/me`, {
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      this.setState({
        user: response.data
      })
    })
    .catch(error => {
      console.log(error)
    })

    axios.get(`/api/v1/couplegoals/from/me`, {
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      this.setState({
        couplegoals: response.data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  render(){
    
    return(
      <div className='container'>
        <h1>Dashboard page</h1>
        <h2>Hello {this.state.user.name}</h2>

        <div className='container' style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
          >
            {this.state.couplegoals.map((goal, index) => (
              <GridTile
                key={index}
                title={goal.name}
              >
                <img src='https://placehold.it/180x180' />
              </GridTile>)
            )}
          </GridList>
        </div>
      </div>
    )
  }
}

export default Dashboard


// import {Tabs, Tab} from 'material-ui/Tabs';
// import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
// import Paper from 'material-ui/Paper';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
// const recentsIcon = <FontIcon className="material-icons">loyalty</FontIcon>;
// const nearbyIcon = <IconLocationOn />;




// // {/* 
// //           <Tabs>
// //             <Tab label="Item One" >
              
// //             </Tab>
// //             <Tab label="Item Two" >
// //               <div>
// //                 <h2 style={styles.headline}>Tab Two</h2>
// //                 <p>
// //                   This is another example tab.
// //                 </p>
// //               </div>
// //             </Tab>
// //             <Tab label="onActive" >
// //               <div>
// //                 <h2 style={styles.headline}>Tab Three</h2>
// //                 <p>
// //                   This is a third example tab.
// //                 </p>
// //               </div>
// //             </Tab>
// //           </Tabs> */}

// //           <Paper zDepth={1}>
// //             <BottomNavigation
// //               selectedIndex={this.state.selectedIndex}
// //               style={{position: "fixed", bottom:"0"}}
// //             >
// //               <BottomNavigationItem
// //                 label="Home"
// //                 icon={<FontIcon className="material-icons">home</FontIcon>}
// //                 onClick={() => this.select(0)}
// //               />
// //               <BottomNavigationItem
// //                 label="Goals"
// //                 icon={recentsIcon}
// //                 onClick={() => this.select(1)}
// //               />
              
// //               {/* <BottomNavigationItem
// //                 label="Nearby"
// //                 icon={nearbyIcon}
// //                 onClick={() => this.select(2)}
// //               /> */}
// //             </BottomNavigation>
// //           </Paper>
// //     )
// //   }
// // }