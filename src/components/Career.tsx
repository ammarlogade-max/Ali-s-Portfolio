import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Job Title</h4>
                <h5>Company Name</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Describe your current role and your biggest wins here. Focus on
              impact and outcomes. Replace this placeholder with your own
              experience.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Job Title</h4>
                <h5>Company Name</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Summarize what you did in this role and the results you delivered.
              Replace this placeholder with your own experience.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Job Title</h4>
                <h5>Company Name</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Summarize what you did in this role and the results you delivered.
              Replace this placeholder with your own experience.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Job Title</h4>
                <h5>Company Name</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              Summarize what you did in this role and the results you delivered.
              Replace this placeholder with your own experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
