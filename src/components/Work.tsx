import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface WorkProject {
  name: string;
  category: string;
  description: string;
  tech: string;
  link?: string;
  webpage?: string;
  video?: string;
  image?: string;
}

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Scroll progress bar
  timeline.to(".work-scroll-progress", {
    scaleX: 1,
    ease: "none",
  }, 0);

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-scroll-track">
        <div className="work-scroll-progress" />
      </div>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {([
            {
              name: "Customer Behavior Analysis",
              category: "SQL Database Analysis",
              description:
                "A comprehensive PostgreSQL database analysis focusing on customer behavior. It queries key metrics such as revenue generation by gender, high-value discount shoppers, top-rated products, shipping fee comparisons, and subscriber vs. non-subscriber spending habits.",
              tech: "PostgreSQL, SQL Queries, pgAdmin 4, Database Analytics, Data Profiling, Customer Insights",
              image: "/images/project-customer-analysis.png",
            },
            {
              name: "Temperature Prediction",
              category: "Machine Learning & Predictive Modeling",
              description:
                "A machine learning project built in Jupyter Notebook to predict temperature trends. Utilizing Random Forest Regressor and data libraries, the model evaluates historical climate data, temperature, humidity, and wind speed trends to produce high-accuracy forecasts.",
              tech: "Python, Machine Learning, Random Forest, Jupyter Notebook, Pandas, NumPy, Scikit-Learn, Predictive Modeling",
              image: "/images/project-temperature-prediction.png",
            },
            {
              name: "Token Appointment System",
              category: "Appointment Booking Web App",
              description:
                "A real-time token management concept for hospitals and clinics. It helps patients book appointments, select doctors, get a token number, and track the currently serving token to reduce waiting time and improve queue flow.",
              tech: "React, UI Design, Appointment Workflow, Token Queue, Patient Dashboard, Responsive Layout",
              image: "/images/project-token-system.png",
            },
            {
              name: "Customer Behavior Dashboard",
              category: "Customer Analytics Dashboard",
              description:
                "A customer analytics dashboard for understanding purchase behavior. It tracks total customers, average purchase amount, review rating, subscription status, revenue and sales by category, age-group performance, shipping preferences, and gender filters.",
              tech: "Power BI, Customer Analytics, Filters, KPI Cards, Revenue Analysis, Category Analysis",
              image: "/images/project-customer-behavior.png",
            },
            {
              name: "Vrinda Store Annual Report 2025",
              category: "Excel Sales Dashboard",
              description:
                "An interactive annual sales report for Vrinda Store with month, channel, and category filters. The dashboard tracks orders, sales amount, gender-wise purchases, order status, top-performing states, age groups, and channel contribution.",
              tech: "Excel, Pivot Tables, Pivot Charts, Slicers, Dashboard Design, Sales Analysis",
              image: "/images/project-vrinda-store.png",
            },
          ] as WorkProject[]).map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                {project.description && <p>{project.description}</p>}
                <h4>Tools and features</h4>
                <p>{project.tech}</p>
                {"link" in project && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                    className="work-project-link"
                  >
                    View GitHub
                  </a>
                )}
                {"webpage" in project && project.webpage && (
                  <a
                    href={project.webpage}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                    className="work-project-link"
                  >
                    View Webpage
                  </a>
                )}
              </div>
              <WorkImage
                image={"image" in project && project.image ? project.image : "/images/placeholder.webp"}
                alt={project.name}
                video={"video" in project ? project.video : undefined}
                link={"webpage" in project ? project.webpage : "link" in project ? project.link : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
