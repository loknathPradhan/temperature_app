import React from 'react'

export default function Box(props) {
    return (
        <div className="box">
            <h2>{props.data}</h2>
            <p>{props.val}</p>
        </div>
    )
}
