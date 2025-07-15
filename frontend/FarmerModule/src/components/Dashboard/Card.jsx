import React from 'react'
import Report from './Report'
import './Card.css';
const Card = () => {
  return (
    <>
      <main className='content px-3 py-4'>
        <div className="container-fluid">
            <div className="mb-3">
                <h3 className="fw-bold fs-4 mb-3">
                    Admin Dashboard
                </h3>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="card shadow">
                            <div className="card-body py-4">
                                <h6 className="mb-2 fw-bold">
                                    Order No: 12345678
                                </h6>
                                <p className='fw-bold mb-2'>
                                    $5000
                                </p>
                                <div className="mb-0">
                                    <span className="badge text-success me-2">
                                        accepted
                                    </span>
                                    <span className="fw-bold">
                                        In Transit
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card shadow">
                            <div className="card-body py-4">
                                <h6 className="mb-2 fw-bold">
                                    Order No: 12345678
                                </h6>
                                <p className='fw-bold mb-2'>
                                    $5000
                                </p>
                                <div className="mb-0">
                                    <span className="badge text-danger me-2">
                                        canceled
                                    </span>
                                    <span className="fw-bold text-danger">
                                        Refund Initiated
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card shadow">
                            <div className="card-body py-4">
                                <h6 className="mb-2 fw-bold">
                                    Order No: 12345678
                                </h6>
                                <p className='fw-bold mb-2'>
                                    $5000
                                </p>
                                <div className="mb-0">
                                    <span className="badge text-success me-2">
                                        accepted
                                    </span>
                                    <span className="fw-bold text-success">
                                        Delivered
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <>
                    <Report/>
                </>
            </div>
        </div>
      </main>
    </>
  )
}

export default Card
