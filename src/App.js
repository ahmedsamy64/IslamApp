import './App.css';
import Home from './components/home';
import Childs from './components/homePages/childs';
import ChildsTournments from './components/homePages/childs/tournments';
import ChildsPics from './components/homePages/childs/childsPics';
import ChildsApp from './components/homePages/childs/childsApp';
import Videos from './components/homePages/videos';
import Pics from './components/homePages/pics';
import Landing from './components/landing';
import PageBorders from './components/pageBorders';
import { Route, Switch } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useLanguage } from "./context";



function App() {
  const [language, setCurrentLanguage] = useLanguage(useLanguage)
  let location = useLocation()
  return (
    <div className="App">
      <Switch>
        <Route key="home" path='/home' exact component={Home} />
        <Route key="landing" path='/' exact component={Landing} />
        <Route key="childs" path='/childs' exact component={Childs} />
        <Route key="childsTournments" path={'/childs/tournment'} exact component={ChildsTournments} />
        <Route key="childsPics" path={'/childs/childPics'} exact component={ChildsPics} />
        <Route key="app" path={'/childs/app'} exact component={ChildsApp} />
        <Route key="videos" path='/videos' exact component={Videos} />
        <Route key="pics" path='/pics' exact component={Pics} />
      </Switch>
      {/*    {useLocation().pathname !== '/' && <PageBorders />} */}
      {sessionStorage.getItem('language')?.length > 1 || language ?
        location.pathname === '/' ? null : <PageBorders /> : null}
    </div>
  );
}

export default App;
