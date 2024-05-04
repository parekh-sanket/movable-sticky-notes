import {useState} from "react"
import Notes from "./components/notes"

function App() {
    let [notes, setNotes] = useState([
        {
            id: 1,
            text: "hii , this is Notes : 1",
        },
        {
            id: 2,
            text: "hii , this is Notes : 2",
        },
    ])
    return <Notes notes = {notes} setNotes = {setNotes}/>
}

export default App
