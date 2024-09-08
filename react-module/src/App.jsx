// import './App.css'
import Button from './components/Button.jsx';
import LoadForm from './components/LoadForm.jsx';
function App() {

  return (
    <>
      <Button text={"Click"} clickHandler={() => { console.log("Button Clilcked!!!") }} />
      <LoadForm />
    </>
  )
}

export default App
