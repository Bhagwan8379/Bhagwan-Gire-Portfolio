import React from 'react'

const FallBackError = ({ error, resetErrorBoundary }) => {
    console.warn(error)

    return <>
        <div className="container mt-5">
            <div className=' fw-bold fs-6'>
                <h2>Oops !  Something Wrong Please Check</h2>
                <p>{error.message}.</p>
                <button className='btn btn-sm btn-danger' type='button' onClick={resetErrorBoundary}>Try again</button>
            </div >
        </div>
    </>
}

export default FallBackError