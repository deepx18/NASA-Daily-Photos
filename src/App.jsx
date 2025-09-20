import { useEffect, useRef, useState } from 'react'
import './App.css'



function App() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const imgRef = useRef(null)
  const infoRef = useRef(null)
  const btnRef = useRef(null)
  const dateRef = useRef(null)

  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=OG5QOgpTh0kNG3uRHwNGWxm5hROWvDmBaHUTOAyA")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false)
      })
      .catch((err) => console.log(err))

  }, [])

  const handleClick = () => {
    let current = infoRef.current.style.display
    infoRef.current.style.display = (current === "none") ? "block" : "none"
    // imgRef.current.style.width = (current === "none") ? "70%" : "100%"
    btnRef.current.textContent = (current === "none") ? "→" : "←"
    console.log(infoRef)
  }

  const dateForm = () => {
    setLoading(true)
    let current = dateRef.current.value
    fetch(`https://api.nasa.gov/planetary/apod?api_key=OG5QOgpTh0kNG3uRHwNGWxm5hROWvDmBaHUTOAyA&date=${current}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }

  if (loading) return <h1>Loading ...</h1>

  return (
    <>
      <div className="img-container" style={{backgroundImage: `url(${data.url})`}} ref={imgRef}>
        <button ref={btnRef} onClick={handleClick}>←</button>
      </div>
      <div className="info" ref={infoRef} style={{display: "none"}}>
        <h1>{data.title}</h1>
        <p>{data.explanation}</p>
        <details>
          <summary>Choose a specific date </summary>
          <div className="form">
            <input type="date" ref={dateRef} />
            <button onClick={dateForm}>Reload</button>
          </div>
        </details>

      </div>
    </>
  )
}

export default App