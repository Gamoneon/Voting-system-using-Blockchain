import React from "react";
import Navbar from "../components/Navbar.js";

const RegisterScreen = () => {
  return(
    <>
   <Navbar />
    <div>
      <form className="row g-3">
      <fieldset> 
      <legend>User personal information</legend>  
      <div className="col-md-6">
    <label for="inputName" className="form-label">Name</label>
    <input type="text" className="form-control" id="inputName">
     </input> 
  </div>
  <div className="col-md-6">
    <label for="inputEmail" className="form-label">Email</label>
    <input type="email" className="form-control" id="inputEmail">
     </input> 
  </div>
  <div className="col-md-6">
    <label for="inputPassword" className="form-label">Password</label>
    <input type="password" className="form-control" id="inputPassword">
    </input> 
  </div>
  <div className="col-12">
    <label for="inputPRNno" className="form-label">PRN No.</label>
    <input type="Number" className="form-control" id="inputPRNno" placeholder="546211">
    </input>
  </div>
  <div className="col-md-4">
    <label for="inputclass" className="form-label">Class</label>
    <select id="inputclass" className="form-select">
      <option selected>M.Sc. CA</option>
      <option>M.Sc. CS</option>
      <option>M.Sc. IMCA</option>
      <option>M.Sc. DS</option>
    </select>
  </div>

<br></br>

  <div className="col-12">
    <button type="submit" className="btn btn-primary">Submit</button>
    
  </div>
  </fieldset> 
</form>
</div>
</>
);
};

export default RegisterScreen;
