import React from 'react';

function About() {
    return (
        <div className='container-fluid my-5'>
            <div className='row justify-content-center mb-4'>
                <div className="col-lg-4 col-md-4 col-sm-12">
                <div class="card">
                        <img className="card-img-top" src="..." alt="Card cap" />
                        <div className="card-body">
                        <h5 className="card-title">Profile</h5>
                        <p className="card-text">
                            instructor profile goes here
                        </p>
                        </div>
                        <div className="card-footer">
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-5 px-5 py-5">
            <div className="col-lg-4 col-md-4 col-sm-12">
                <div class="card">
                        <img className="card-img-top" src={require("../assets/gaff.jpg")} alt="gaffaru" class="img-fluid" />
                        <div className="card-body">
                        <h5 className="card-title">Profle</h5>
                        <p className="card-text">
                            Name: Mudashiru Ghaffaru
                        </p>
                        <p className="card-text">
                            Program: BSc. Computer Engineering
                        </p>
                        <p className="card-text">
                            Role: Machine Learning Engineer
                        </p>
                        </div>
                        <div className="card-footer">
                        <small className="text-muted"></small>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12">
                <div class="card">
                        <img className="card-img-top" src={require("../assets/malik.jpg")} alt="malik" class="img-fluid"/>
                        <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                            Name:Musah Abdul-Malik
                        </p>
                        <p className="card-text">
                            Program: BSc. Computer Engineering
                        </p>
                        <p className="card-text">
                            Role: Frontend Web developer
                        </p>
                        </div>
                        <div className="card-footer">
                        <small className="text-muted"></small>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12">
                <div class="card">
                        <img className="card-img-top" src={require("../assets/andy.jpg")} class="img-fluid" alt="Andy" />
                        <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                            Name:Andy Selasie Ivor
                        </p>
                        <p className="card-text">
                            Program: BSc. Computer Engineering
                        </p>
                        <p className="card-text">
                            Role: Mobile App developer
                        </p>
                        </div>
                        <div className="card-footer">
                        <small className="text-muted"></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About