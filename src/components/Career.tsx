import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education, experience <span>&</span>
          <br /> certifications
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analyst</h4>
                <h5>Thiranex</h5>
              </div>
              <h3>
                Jun 2026
                <br />- Jul 2026
              </h3>
            </div>
            <p>
              Worked on data analytics projects involving data cleaning,
              visualization and dashboard creation using Excel, SQL, Power BI
              and Tableau, presenting data-driven insights from real-world
              datasets.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analytics Job Simulation</h4>
                <h5>Deloitte Australia (Via Forage)</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed a Deloitte Australia job simulation covering data
              analysis, Tableau dashboard creation, Excel-based classification,
              forensic technology exposure and communicating business insights.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Microsoft Power BI Certification</h4>
                <h5>Self-Directed Learning</h5>
              </div>
              <h3>
                2024 -
                <br />
                Present
              </h3>
            </div>
            <p>
              Completed self-directed certification in Microsoft Power BI,
              building interactive dashboards and KPI tracking beyond the
              academic curriculum.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>
                  B.E. - Artificial Intelligence & Machine Learning
                </h4>
                <h5>
                  M.H. Saboo Siddik College Of Engineering, University Of
                  Mumbai
                </h5>
              </div>
              <h3>
                2024
                <br />-<br />
                2028
              </h3>
            </div>
            <p>
              Coursework spans machine learning, data structures and SQL-based
              data workflows, applied through self-initiated data analytics and
              ML projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
