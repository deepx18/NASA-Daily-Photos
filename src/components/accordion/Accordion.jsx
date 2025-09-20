import { useRef, useState } from 'react'
import data from "../../data"
import './Accordion.css'

function Accordion() {
  
  let temp = []
  data.forEach(() => {
    temp.push([false, "+"])
  })
  const [elements, setElements]  = useState(temp)
  const  [multiSelection, setMiltiSelection] = useState(false)
  const btnRef = useRef(null)

  const switchSelectionMode = () => {
    setMiltiSelection(!multiSelection)
    if (multiSelection) {
      btnRef.current.textContent = "Enable Multi-Selecttion"
    } else {
      btnRef.current.textContent = "Disable Multi-Selecttion"  
    }
  }
  
  const handleClick = (index) => {
    let tempElements = [...elements]
    tempElements.forEach( (elm, i) => {
      if (index !== i) {
        if (!multiSelection) {
          tempElements[i] = [false, "+"]
        }
      } else if (index == i) {
        if (tempElements[i][0]) {
          tempElements[i] = [false, "+"]
        } else {
          tempElements[i] = [true, "-"]
        }
      }
    })
    setElements(tempElements)
  }

  return (
    <>
      <div className="container">
        <button onClick={switchSelectionMode} ref={btnRef}>Enable Multi-Selecttion</button>
        {
          data.map((e, index) => {
            return (
              <div className="accordion" key={e.id}>
                <div className="title" onClick={() => handleClick(index)}>{e.title}<span>{elements[index][1]}</span></div>
                <div className={elements[index][0] ? "description show" : "description"} >{e.description}</div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Accordion;
