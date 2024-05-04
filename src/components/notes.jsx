// eslint-disable-next-line no-unused-vars
import React, {createRef, useEffect, useRef} from "react"
import Note from "./note"

function Notes({notes, setNotes}) {
    useEffect(() => {
        let savedNotes = JSON.parse(localStorage.getItem("notes")) || []
        let updateNotes = notes.map((note) => {
            const savedNote = savedNotes.find((n) => n.id == note.id)
            if (savedNote) {
                return {...note, position: savedNote.position}
            } else {
                const position = determineNewPosition()
                return {...note, position}
            }
        })

        setNotes(updateNotes)
        localStorage.setItem("notes", JSON.stringify(updateNotes))
    }, [notes.length])

    // const notesRefs = useRef([])
    const notesRefs = []

    function determineNewPosition() {
        let maxX = window.innerWidth - 250
        let maxY = window.innerHeight - 250

        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY),
        }
    }

	function handleDragStart(e , note){
		const note_id = note.id
		// const noteRef = notesRefs.current[note_id].current
		const noteRef = notesRefs[note_id].current
		const rect = noteRef.getBoundingClientRect();
		// clientX meand user cursor x position
		const offsetX = e.clientX - rect.left
		// clientY meand user cursor y position
		const offsetY = e.clientY - rect.top

		const handleMouseMove = (e)=>{
			const newX = e.clientX - offsetX
			const newY = e.clientY - offsetY

			noteRef.style.left = `${newX}px` 
			noteRef.style.top = `${newY}px` 
		}

		const handleMouseUp = (e)=>{
			document.removeEventListener("mousemove" , handleMouseMove)
			document.removeEventListener("mouseup" , handleMouseUp)
			
			const finalRect = noteRef.getBoundingClientRect();
			const newPosition = {x : finalRect.left , y:finalRect.top}

			if(checkForOverLap(note_id)){
				noteRef.style.left = `${note.position.x}px` 
				noteRef.style.top = `${note.position.y}px` 
			}else{
				updateNotePositon(note_id , newPosition)
			}
		}

		const checkForOverLap = (note_id)=>{
			// const currentNoteRef = notesRefs.current[note_id].current
			const currentNoteRef = notesRefs[note_id].current
			const currentRect = currentNoteRef.getBoundingClientRect();

			return notes.some((note)=>{
				if(note.id == note_id ) return false

				const otherNoteRef = notesRefs[note.id].current
				const otherRect = otherNoteRef.getBoundingClientRect();

				let overlap = !(
					currentRect.right < otherRect.left ||
					currentRect.left > otherRect.right ||
					currentRect.bottom < otherRect.top ||
					currentRect.top > otherRect.bottom
				);

				return overlap
			})
		}
			
		document.addEventListener("mousemove" , handleMouseMove)
		document.addEventListener("mouseup" , handleMouseUp)
	}

	function updateNotePositon(note_id , newPosition){
		const updatedNotes = notes.map(note => { return note.id == note_id ? {...note , position : newPosition} : note})
		setNotes(updatedNotes)
        localStorage.setItem("notes", JSON.stringify(updatedNotes))
	}

    return (
        <div>
            {notes.map((note) => {
                return <Note key={note.id} 
							ref={notesRefs[note.id] ? 
									notesRefs[note.id] : 
									(notesRefs[note.id] = createRef())} 
							// ref={notesRefs.current[note.id] ? 
							// 		notesRefs.current[note.id] : 
							// 		(notesRefs.current[note.id] = createRef())} 
							initialPos={note.position} content={note.text}
							onMouseDown = {(e)=>handleDragStart(e , note)}
						/>
            })}
        </div>
    )
}

export default Notes
