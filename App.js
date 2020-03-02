import React from 'react';
import { Icon } from 'react-native-elements';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Parameters from "./componentsNav/parametersNav"
import Library from "./componentsNav/libraryNav"
import Home from "./componentsNav/homeNav";
import SignUp from "./componentsNav/SignUp"

// comment Vincent : lignes pour REDUX
  // import MapLoc from './components/map';
  // import {Provider} from 'react-redux';
  // import loginName from './reducers/login.reducer';
  // import {createStore, combineReducers}  from 'redux';
  // const store = createStore(combineReducers({loginName,poilist}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
    Bottom: BottomNavigator,
  }, {
    headerMode: 'none',
    
  });



  // comment Vincent : return global de app
  var NavigationVariable = createAppContainer(StackNavigator)

  function App() {
  
    return (
      // POUR REDUX : <Provider store={store}>
        <NavigationVariable/>
      // POUR REDUX : </Provider>
  
    );
  }
  
  export default App;
