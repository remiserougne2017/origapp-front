import React from 'react';
import { Icon } from 'react-native-elements';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Parameters from "./componentsNav/parametersNav"
import Library from "./componentsNav/libraryNav"
import Home from "./componentsNav/Home"
import BookContent from './componentsNav/book-content';
import Scan from './componentsNav/Scan'
import Book from './componentsNav/Books'
import SignUp from "./componentsNav/SignUp";
import SignIn from "./componentsNav/SignIn";
import newPassword from "./componentsNav/newPassword";
import contentMediaPage from "./componentsNav/content-media";


// comment Vincent : lignes pour REDUX
  // import MapLoc from './components/map';
import storeLibrairy from './reducers/reducerLibrairy';
import overlayData from './reducers/reducerOverlay';
import contentMediaData from './reducers/reducerContent';

import {Provider} from 'react-redux';
import reducerToken from './reducers/reducerToken';
import reducerPrenom from './reducers/reducerPrenom';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({reducerToken,storeLibrairy, reducerPrenom, overlayData,contentMediaData}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.disableYellowBox = true;


// COMMENT VINCENT : Pour ajouter un nouveau lien de navgivation :
  // 1) importer le components dans ce fichier app.js ex: import Library from "./componentsNav/libraryNav"
  // 2a) Si c'est un composant le signup/signin : ajouter le composant dans le stack navigator qui englobe toute l'app
  // 2b) Si c'est un composant interieur : ajouter le composant dans l'un des 3 stacknavigator (là ou c'est le plus logique)


// comment Vincent : 3 stack navigator interieurs
var StackNavigatorLibrary = createStackNavigator(
  {
    Library:Library,
}, { headerMode: 'none',});

var StackNavigatorHome = createStackNavigator(
  {
    Home:Home,
    Book:Book,
    BookContent:BookContent,
    contentMediaPage:contentMediaPage,
    Scan : Scan
}, {headerMode: 'none',});

 var StackNavigatorParameters = createStackNavigator(
  {
    Parameters:Parameters,
}, {headerMode: 'none',});


// comment Vincent : bottom navigator
var BottomNavigator = createBottomTabNavigator(
  {
    Home: StackNavigatorHome,
    Library: StackNavigatorLibrary,
    Parameters:StackNavigatorParameters,
  }
  ,
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        let imageIcon
        if (navigation.state.routeName == 'Home') {
          imageIcon = <Icon name= "home" type='antdesign' color={tintColor}  size= {40}/> 
          
        } else if (navigation.state.routeName == 'Library') {
          imageIcon = <Icon name= "book" type='entypo' color={tintColor}  size= {40}/> 

          
        } else if (navigation.state.routeName == 'Parameters') {
          imageIcon = <Icon name= "setting" type='antdesign' color={tintColor}  size= {40}/> 

        }        
        return imageIcon;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#1B1717',
      activeBackgroundColor: '#F9603E',
      inactiveBackgroundColor:'#F9603E',
      showLabel:false
    }     
  }
);
 
// comment Vincent : stack navigator global
  var StackNavigator = createStackNavigator({
    SignUp: SignUp,
    SignIn: SignIn,
    newPassword: newPassword,
    Home: Home,
    Bottom: BottomNavigator,
  }, {
    headerMode: 'none',
    
  });



  // comment Vincent : return global de app
  var NavigationVariable = createAppContainer(StackNavigator)

  function App() {
  
    return (
      <Provider store={store}>
        <NavigationVariable/>
      </Provider>
  
    );
  }
  
  export default App;
