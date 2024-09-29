// import './App.css'
import Button from './components/Button.jsx';
import ImageUpload from './components/ImageUpload.jsx';
import LoadForm from './components/LoadForm.jsx';

function App() {

  return (
    <>
      <Button text={"Click"} clickHandler={() => { console.log("Button Clilcked!!!") }} />
      <ImageUpload />
    </>
  )
}

export default App
