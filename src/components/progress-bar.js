import React from 'react'

const ProgressBar = ({ percentage, index, total }) => {
    return (
        <div className="custom-progress-bar">
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ "width": `${percentage}` }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className="progress-counter">{index + "/" + total}</div>
        </div>
    )
}

export default ProgressBar