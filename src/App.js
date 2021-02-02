import Header from './Components/Header/Header';
import routes from './routes';
import './css/reset.css';
import './css/App.css';

function App() {
  return (
    <section className="App">
      <Header />
      { routes }
    </section>
  );
}

export default App;
