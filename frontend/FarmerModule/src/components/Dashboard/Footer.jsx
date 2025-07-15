import React from 'react'
import './Footer.css';
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
            <div className="row text-body-secondary">
                <div className="col-6 text-start">
                    <a href="#" className="text-body-secondary">
                        <strong>Veggie To</strong>
                    </a>
                </div>
                <div className="col-6 text-end text-body-secondary d-none d-md-block">
                    <ul className="list-inline mb-O">
                        <li className="list-inline-item">
                            <a href="#" className="text-body-secondary">Contact</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#" className="text-body-secondary">About</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#" className="text-body-secondary">Terms & Condition</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
