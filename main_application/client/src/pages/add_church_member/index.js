import React from 'react'
import {Link} from "react-router-dom";

function AddChurchMember() {
  return (
      <div className="main-content">
      
        <div className="page-content">
          <div className="container-fluid">
            
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 font-size-18">Add a member</h4>
                
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item"> <Link to="/">home </Link> </li>
                      <li className="breadcrumb-item active">Add a member</li>
                    </ol>
                  </div>
              
                </div>
              </div>
            </div>
          
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                  
                    
                    <form className="needs-validation" noValidate>
                      <div className="form-row">
                        <div className="col-md-4 mb-3">
                          <label htmlFor="validationCustom01">First name</label>
                          <input type="text" className="form-control" id="validationCustom01" placeholder="First name" required/>
                            <div className="valid-feedback">
                              Looks good!
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <label htmlFor="validationCustom02">Last name</label>
                          <input type="text" className="form-control" id="validationCustom02" placeholder="Last name"
                                 value="Otto" required/>
                            <div className="valid-feedback">
                              Looks good!
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <label htmlFor="validationCustomUsername">Username</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="inputGroupPrepend">@</span>
                            </div>
                            <input type="text" className="form-control" id="validationCustomUsername"
                                   placeholder="Username" aria-describedby="inputGroupPrepend" required/>
                              <div className="invalid-feedback">
                                Please choose a username.
                              </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="validationCustom03">City</label>
                          <input type="text" className="form-control" id="validationCustom03" placeholder="City"
                                 required />
                            <div className="invalid-feedback">
                              Please provide a valid city.
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="validationCustom04">State</label>
                          <input type="text" className="form-control" id="validationCustom04" placeholder="State"
                                 required />
                            <div className="invalid-feedback">
                              Please provide a valid state.
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="validationCustom05">Zip</label>
                          <input type="text" className="form-control" id="validationCustom05" placeholder="Zip"
                                 required />
                            <div className="invalid-feedback">
                              Please provide a valid zip.
                            </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox form-check">
                          <input type="checkbox" className="custom-control-input" id="invalidCheck"
                                 required />
                            <label className="custom-control-label" htmlFor="invalidCheck">Agree to terms
                              and conditions</label>
                            <div className="invalid-feedback">
                              You must agree before submitting.
                            </div>
                        </div>
                      </div>
                      <button className="btn btn-primary waves-effect waves-light" type="submit">Submit form</button>
                    </form>
                
                  </div>
                </div>
              
              </div>
             
            </div>
        
          </div>
          
        </div>
       
      </div>
  )
}

export {AddChurchMember}