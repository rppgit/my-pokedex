import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Main from './Components/Main';
import './Components/style.css'
import { Helmet } from 'react-helmet';
function App() {
  return (
    <>
      <Helmet>
        <style>{'body { background-color: #deeded; }'}</style>
      </Helmet>
      <Main />
    </>
  );
}

export default App;