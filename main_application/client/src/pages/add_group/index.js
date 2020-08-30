import React from 'react'
import {Link} from "react-router-dom";

function AddGroup() {
  return (
      <div className="main-content">
      
        <div className="page-content">
            <div className="container-fluid">
  
              <div className="row">
                <div className="col-xl-6">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Tooltips and Popovers</h4>
                      <p className="card-subtitle mb-4">Tooltips and popovers can be placed within modals as needed.
                        When modals are closed, any tooltips and popovers within are also automatically dismissed.</p>
                      
                      <button type="button" className="btn btn-primary waves-effect waves-light" data-toggle="modal"
                              data-target="#exampleModalPopovers">
                        Launch demo modal
                      </button>
          
                      <div id="exampleModalPopovers" className="modal fade" tabIndex="-1" role="dialog"
                           aria-labelledby="exampleModalPopoversLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalPopoversLabel">Modal title</h5>
                              <button type="button" className="close waves-effect waves-light" data-dismiss="modal"
                                      aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <h5>Popover in a modal</h5>
                              <p>This <a href="#" role="button" className="btn btn-secondary popover-test"
                                         title="Popover title"
                                         data-content="Popover body content is set in this attribute."
                                         data-container="#exampleModalPopovers">button</a> triggers a popover on click.
                              </p>
                              <hr/>
                              <h5>Tooltips in a modal</h5>
                              <p><a href="#" className="tooltip-test" title="Tooltip"
                                    data-container="#exampleModalPopovers">This link</a> and <a href="#"
                                                                                                className="tooltip-test"
                                                                                                title="Tooltip"
                                                                                                data-container="#exampleModalPopovers">that
                                link</a> have tooltips on hover.</p>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary waves-effect waves-light"
                                      data-dismiss="modal">Close
                              </button>
                              <button type="button" className="btn btn-primary waves-effect waves-light">Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                 
                </div>
                
              </div>
              
              
            </div>
        </div>
      </div>
  )
}

export {AddGroup}