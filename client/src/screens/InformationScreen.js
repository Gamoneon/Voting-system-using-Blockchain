import React from "react";

const InformationScreen = () => {
  //------------------------------ Style CSS -----------------------------------------//
  const cardStyle = {
    width: "80%",
    margin: "3% auto",
  };

  //------------------------------ Content Render -----------------------------------------//
  return (
    <>
      <div className="card" style={cardStyle}>
        <h4 className="card-header text-center bg-primary text-light">
          User Manual
        </h4>
        <div className="card-body">
          <h4>Welcome ! These are few guidelines for User.</h4>
          <div className="card-text">
            <div>
              <h5>1. Voter Registration</h5>
              <ul>
                <li>
                  For casting the vote, student needs to first register to
                  participate in voting process. Student can access registration
                  form in <strong> "Voter Registration" </strong>menu once the
                  registration phase starts.
                </li>
                <li>
                  Student can only register in the{" "}
                  <strong> Registration Phase </strong>. After the registration
                  phase is over, the student can not register and thus will not
                  be able to vote.
                </li>
                <li>
                  For registration, the student will have to enter is PRN number
                  and Mobile Number.
                </li>
              </ul>
            </div>

            <h5>2. Voting Process</h5>
            <ul>
              <li>
                Overall voting process is divided into four phases. All of which
                will be initialized and terminated by the admin. <br />
                User will have to participate in the process according to
                current phase
              </li>
              <ol className="list-group list-group-numbered">
                <li className="list-group-item">
                  <strong>Registration Phase: </strong>
                  During this phase the registration of the students will be
                  carried out.
                </li>
                <li className="list-group-item">
                  <strong>Apply for candidate Phase: </strong>
                  After all students get registered for voting, verified
                  students by admin can apply as a candidate for ongoing
                  election role.
                </li>
                <li className="list-group-item">
                  <strong>Voting Phase: </strong>
                  After initialization of voting phase from the admin, user can
                  cast the vote in voting section. The casting of vote can be
                  simply done by clicking on "VOTE" button next to chosen
                  candidate. After which transaction will be initiated and on
                  confirmation, the vote will get successfully casted. Students
                  can vote only during voting phase is active.
                </li>
                <li className="list-group-item">
                  <strong>Result Phase: </strong>
                  This is the final stage of whole voting process during which
                  the results of election and summary statistics of election
                  will be displayed at "Result" section.
                </li>
              </ol>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationScreen;
