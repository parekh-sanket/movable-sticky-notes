/* eslint-disable react/display-name */
// eslint-disable-next-line no-unused-vars
import React, { forwardRef } from "react"

const Note = forwardRef(({content, initialPos, ...props},ref) => {
    return (
        <div
			ref={ref}
            style={{
                position : "absolute",
				left : `${initialPos?.x}px`,
				top : `${initialPos?.y}px`,
				border : "2px solid black",
				userSelect :'none',
				pedding : "10px",
				width : "100px",
				cursor : 'move',
				backgroundColor : "lightyellow"
            }}
			{...props}
        >
            📌 {content}
        </div>
    )
})

export default Note