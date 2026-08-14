import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger);

interface CareerItem {
  type: "experience" | "education" | "certifications";
  role: string;
  company: string;
  period: string;
  description: string;
}

const careerData: CareerItem[] = [
  {
    type: "experience",
    role: "Data Analyst",
    company: "Thiranex",
    period: "Jun 2026 - Jul 2026",
    description:
      "Worked on data analytics projects involving data cleaning, visualization and dashboard creation using Excel, SQL, Power BI and Tableau, presenting data-driven insights from real-world datasets.",
  },
  {
    type: "experience",
    role: "Data Analytics Job Simulation",
    company: "Deloitte Australia (Via Forage)",
    period: "2025",
    description:
      "Completed a Deloitte Australia job simulation covering data analysis, Tableau dashboard creation, Excel-based classification, forensic technology exposure and communicating business insights.",
  },
  {
    type: "education",
    role: "B.E. - Artificial Intelligence & Machine Learning",
    company: "M.H. Saboo Siddik College Of Engineering, University Of Mumbai",
    period: "2024 - 2028",
    description:
      "Coursework spans machine learning, data structures and SQL-based data workflows, applied through self-initiated data analytics and ML projects.",
  },
  {
    type: "certifications",
    role: "Microsoft Power BI Certification",
    company: "Self-Directed Learning",
    period: "2024 - Present",
    description:
      "Completed self-directed certification in Microsoft Power BI, building interactive dashboards and KPI tracking beyond the academic curriculum.",
  },
];

const Career = () => {
  const [activeTab, setActiveTab] = useState<"experience" | "education" | "certifications">("experience");

  useEffect(() => {
    // Refresh ScrollTrigger so that heights and positions are recalculated for the new tab items
    ScrollTrigger.refresh();
  }, [activeTab]);

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My <span>Journey</span>
        </h2>

        <div className="career-tabs">
          <button
            className={`career-tab-btn ${activeTab === "experience" ? "active" : ""}`}
            onClick={() => setActiveTab("experience")}
            data-cursor="disable"
          >
            Experience
          </button>
          <button
            className={`career-tab-btn ${activeTab === "education" ? "active" : ""}`}
            onClick={() => setActiveTab("education")}
            data-cursor="disable"
          >
            Education
          </button>
          <button
            className={`career-tab-btn ${activeTab === "certifications" ? "active" : ""}`}
            onClick={() => setActiveTab("certifications")}
            data-cursor="disable"
          >
            Certifications
          </button>
        </div>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {careerData.map((item, index) => {
            const isVisible = item.type === activeTab;
            return (
              <div
                className={`career-info-box ${isVisible ? "active-tab-item" : "hidden-box"}`}
                key={index}
                style={{ display: isVisible ? "flex" : "none" }}
              >
                <div className="career-info-in">
                  <div className="career-role">
                    <h4>{item.role}</h4>
                    <h5>{item.company}</h5>
                  </div>
                  <h3>{item.period}</h3>
                </div>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Career;
