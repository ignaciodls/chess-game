import Board from "./component/Board";
import {BoardProvider} from './contexts/boardContext'
import Normalize from 'react-normalize'

function App() {
  return (

    <>
      <BoardProvider>
        <Normalize/>
        <Board/>      
      </BoardProvider>
    </>
  );
}

export default App;
