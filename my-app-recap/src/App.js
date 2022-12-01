import './App.css';
import Header from './components/Header/Header';


const blogStyle = {
  color: 'white',
  backgroundColor: 'blue',
  margin: '20px',
  padding: '10px'

}

function App() {
  return (



    <div>

      <div>
        <Header></Header>
      </div>
      <div className="App">
        <h1>Sakib Khan</h1>
        <p>I am not a fan of sakib khan</p>
      </div>


      <div className="container">
        <h2>Esa this is a challenge,<br />but you have to grab it . </h2>
      </div>

      <div className="blog">
        <Article></Article>
      </div>

      <div style={blogStyle}>
        <Article ></Article>
      </div>

    </div>

  );
}

function Article() {  // ata akta component.
  return (
    <div className='article'>
      <h1>This is a blog . so think it a large blog. </h1>
    </div>)


}

export default App;