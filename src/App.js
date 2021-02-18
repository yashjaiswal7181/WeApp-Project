import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboad from './Components/dashboard/Dashboard';
import Footer from './Components/footer/Footer';
import Header from './Components/header/Header';
import FavCity from './Components/readNow/FavCity';
import PrivateRoute from './Components/PrivateRoute';

function App(){
    return(
      <div className="App" >
     <Router>
       <Header/>
       <Switch>
          <Route exact path="/" component={Dashboad}/>
          <PrivateRoute path="/fav" component={FavCity}/>
          {/* <Route component={NotFound}/> */}
       </Switch>
       <Footer/>
     </Router>  
    </div>
    ); 
}
export default App;