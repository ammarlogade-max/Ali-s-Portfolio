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
              name: "Vrinda Store Annual Report 2025",
              category: "Excel Sales Dashboard",
              description:
                "An interactive annual sales report for Vrinda Store with month, channel, and category filters. The dashboard tracks orders, sales amount, gender-wise purchases, order status, top-performing states, age groups, and channel contribution.",
              tech: "Excel, Pivot Tables, Pivot Charts, Slicers, Dashboard Design, Sales Analysis",
              image: "/images/project-vrinda-store.jpeg",
            },
            {
              name: "HR Analytics Dashboard",
              category: "Employee Attrition Analysis",
              description:
                "A workforce analytics dashboard focused on employee attrition. It summarizes employee count, attrition count, attrition rate, average age, salary, and years at company, with breakdowns by education, age, salary slab, tenure, gender, and job role.",
              tech: "Power BI, DAX, Data Modeling, HR Analytics, KPI Cards, Donut Charts, Bar Charts",
              image: "/images/project-hr-analytics.svg",
            },
            {
              name: "Taxi Ride Analysis",
              category: "Transport Analytics Dashboard",
              description:
                "A taxi trip analysis dashboard that studies total trips, average fare, revenue, distance, fare distribution by hour, fare trends, city district demand density, payment type, ratings, cancellations, and vehicle-type performance.",
              tech: "Power BI, Data Visualization, Revenue Analysis, Trip Analytics, Geo Heatmap, KPI Tracking",
              image: "/images/project-taxi-ride.svg",
            },
            {
              name: "Token Appointment System",
              category: "Appointment Booking Web App",
              description:
                "A real-time token management concept for hospitals and clinics. It helps patients book appointments, select doctors, get a token number, and track the currently serving token to reduce waiting time and improve queue flow.",
              tech: "React, UI Design, Appointment Workflow, Token Queue, Patient Dashboard, Responsive Layout",
              image: "/images/project-token-system.svg",
            },
            {
              name: "Customer Behavior Dashboard",
              category: "Customer Analytics Dashboard",
              description:
                "A customer analytics dashboard for understanding purchase behavior. It tracks total customers, average purchase amount, review rating, subscription status, revenue and sales by category, age-group performance, shipping preferences, and gender filters.",
              tech: "Power BI, Customer Analytics, Filters, KPI Cards, Revenue Analysis, Category Analysis",
              image: "/images/project-customer-behavior.svg",
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
