import React, {useEffect} from 'react'

function UnauthenticatedApp() {
  
  useEffect(()=> {
    window.$('body').addClass("bg-primary");
  },[])
  
  
  return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center min-vh-100">
                <div className="w-100 d-block my-5">
                  <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-5">
                      <div className="card">
                        <div className="card-body">
                          <div className="text-center mb-4 mt-3">
                            <h3>
                              <a href="/">CHURCH ADMIN</a>
                            </h3>
                          </div>
                          <form action="http://myrathemes.com/lunoz/layouts/vertical/mt-3" className="p-2">
                            <div className="form-group">
                              <label htmlFor="emailaddress">Email address</label>
                              <input className="form-control" type="email" id="emailaddress" required=""
                                     placeholder="john@deo.com"/>
                            </div>
                            <div className="form-group">
                              <a href="pages-recoverpw.html" className="text-muted float-right">Forgot your
                                password?</a>
                              <label htmlFor="password">Password</label>
                              <input className="form-control" type="password" required="" id="password"
                                     placeholder="Enter your password"/>
                            </div>
                          
                            <div className="form-group mb-4 pb-3">
                              <div className="custom-control custom-checkbox checkbox-primary">
                                <input type="checkbox" className="custom-control-input" id="checkbox-signin"/>
                                  <label className="custom-control-label" htmlFor="checkbox-signin">Remember me</label>
                              </div>
                            </div>
                            <div className="mb-3 text-center">
                              <button className="btn btn-primary btn-block" type="submit"> Sign In</button>
                            </div>
                          </form>
                        </div>
                        
                      </div>
                    
                      <div className="row mt-4">
                        <div className="col-sm-12 text-center">
                          <p className="text-white-50 mb-0">Create an account? <a href="pages-register.html"
                                                                                  className="text-white-50 ml-1"><b>Sign
                            Up</b></a></p>
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

export default UnauthenticatedApp
