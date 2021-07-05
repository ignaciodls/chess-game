import Index from "./component/Index";
import {BoardProvider} from './contexts/boardContext'
import Normalize from 'react-normalize'
import {SocketProvider} from './contexts/socketContext'
import {Switch, Route, HashRouter} from 'react-router-dom'
import Board from "./component/Board";

function App() {

  return (

    <>
      <SocketProvider>
        <BoardProvider>
          <Normalize/>
          <HashRouter>

            <Switch>

              <Route exact path='/' component={Index}/>
              <Route exact path='/game/:roomId' component={Board} key={window.location.pathname}/>

            </Switch>

          </HashRouter>    
        </BoardProvider>
      </SocketProvider>
    </>
  );
}

export default App;

