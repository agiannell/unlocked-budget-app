import Header from './Components/Header/Header';
import routes from './routes';
import './css/reset.css';
import './css/App.css';

function App() {
  return (
    <section className="App">
      { routes }
    </section>
  );
}

export default App;
