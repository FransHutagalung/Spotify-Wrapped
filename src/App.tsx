function App() {

  const hanleClick = () => {
    window.location.href = "/render";
  }

  return (
    <>
        <p>Hello World</p>    
        <button onClick={hanleClick} className="bg-green-600 rounded-md px-3 py-1 text-white">
          Render
          </button> 
    </>
  )
}

export default App
