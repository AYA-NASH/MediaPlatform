// import './App.css'
import Button from './components/Button.jsx';
import LoadForm from './components/LoadForm.jsx';
import MediaUpload from './components/MediaUpload.jsx';

function App() {

  return (
    <>
      <Button text={"Click"} clickHandler={() => { console.log("Button Clilcked!!!") }} />
      <MediaUpload />
    </>
  )
}

export default App
