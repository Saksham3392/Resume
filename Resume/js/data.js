/**
 * ====================================================================
 * PORTFOLIO DATA CONFIGURATION - SAKSHAM SHEORAN
 * ====================================================================
 * Professional Full-Stack Software Engineer & Computer Science Student.
 * Authentic resume data, categorized skills, selected projects,
 * engineering approach, and verified coordinates.
 */

var portfolioData = {
  // 1. Brand & Profile Identity
  profile: {
    name: "Saksham Sheoran",
    brandName: "Saksham Sheoran",
    brandMonogram: "SS",
    role: "Full-Stack Software Engineer",
    university: "Chitkara University",
    degree: "B.E. Computer Science & Engineering in AI-ML",
    location: "Punjab, India",
    email: "sakshamsheoran2005@gmail.com",
    githubUrl: "https://github.com/Saksham3392",
    linkedinUrl: "https://www.linkedin.com/in/saksham-sheoran/",
    statusText: "Available for Software Engineering Opportunities — 2026/2027",
    resumeUrl: "#resume"
  },

  // 2. Hero Section Content
  hero: {
    name: "Saksham Sheoran",
    title: "Full-Stack Software Engineer",
    bio: "Computer Science & Engineering student at Chitkara University, focused on building scalable web applications, reliable backend systems, and polished user experiences.",
    status: "Available for Software Engineering Opportunities — 2026/2027",
    typewriterText: "Computer Science & Engineering student at Chitkara University, focused on building scalable web applications, reliable backend systems, and polished user experiences.",
    buttons: [
      { label: "View Projects", href: "#projects", primary: true },
      { label: "Download Resume", href: "#resume", secondary: true, id: "download-resume-btn" },
      { label: "Contact Me", href: "#contact", outline: true }
    ]
  },

  // 3. Professional Summary
  summary: {
    heading: "Building Software That Solves Real Problems",
    subheading: "Computer Science Fundamentals • Full-Stack Development • Systems Engineering",
    p1: "I am a Computer Science & Engineering student with a strong interest in full-stack development and software engineering. I build web applications across the frontend, backend, databases, APIs, and deployment.",
    p2: "My approach combines strong computer science fundamentals with practical development—writing clean code, designing maintainable systems, optimizing performance, and creating intuitive user experiences."
  },

  // 4. Categorized Technical Skills
  skills: [
    {
      category: "Languages",
      icon: "fa-solid fa-code",
      items: ["C++", "Java", "JavaScript", "TypeScript", "Python", "SQL"]
    },
    {
      category: "Frontend",
      icon: "fa-solid fa-laptop-code",
      items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Responsive Web Design", "UI Development"]
    },
    {
      category: "Backend",
      icon: "fa-solid fa-server",
      items: ["Node.js", "Express.js", "REST APIs", "Authentication & Authorization", "API Development", "Server-Side Development", "Microservices"]
    },
    {
      category: "Databases",
      icon: "fa-solid fa-database",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Database Design", "SQL Query Optimization"]
    },
    {
      category: "Tools & DevOps",
      icon: "fa-solid fa-screwdriver-wrench",
      items: ["Git", "GitHub", "Docker", "Linux", "CI/CD", "Vercel", "AWS"]
    },
    {
      category: "Computer Science",
      icon: "fa-solid fa-microchip",
      items: ["Data Structures & Algorithms", "Object-Oriented Programming", "Database Management Systems", "Operating Systems", "Computer Networks", "Computer Architecture", "Distributed Systems", "System Design", "Software Engineering"]
    }
  ],

  // 5. Selected Projects (Software I've Designed, Built & Shipped)
  projectCategories: ["All", "Full Stack", "Backend & Systems", "Web Applications"],
  projects: [
    {
      id: "project-cn-mcqs",
      title: "Computer Networks Assessment Engine (CN-MCQs)",
      category: "Web Applications",
      oneLiner: "Interactive exam simulator and practice platform for core Computer Networks and distributed protocol concepts.",
      techStack: ["JavaScript", "HTML5", "CSS3", "DOM API", "GitHub Pages"],
      bullets: [
        "Architected an interactive examination and quiz engine for Computer Networking protocols, subnetting, and transport layer topics.",
        "Engineered instantaneous score calculation, time tracking, and detailed question explanation reviews without backend dependencies.",
        "Structured modular question banks with randomized evaluation algorithms and persistent local progress tracking.",
        "Deployed directly to GitHub Pages with responsive cross-device layout design."
      ],
      githubUrl: "https://github.com/Saksham3392/CN-MCQs",
      demoUrl: "https://github.com/Saksham3392/CN-MCQs"
    },
    {
      id: "project-java-mcqs",
      title: "Java OOP & Concurrency Practice Suite",
      category: "Web Applications",
      oneLiner: "Interactive assessment suite covering Object-Oriented Programming, Java Memory Model, and JVM fundamentals.",
      techStack: ["JavaScript", "CSS3", "HTML5", "Java Concepts"],
      bullets: [
        "Built comprehensive assessment modules for Core Java, multi-threading, JVM architecture, and exception handling hierarchies.",
        "Designed immediate visual feedback loops, explanation breakdowns, and performance analytics for students.",
        "Optimized client-side evaluation logic for zero-latency question transitions and mobile-friendly usability.",
        "Maintained structured version control and documentation on GitHub."
      ],
      githubUrl: "https://github.com/Saksham3392/Java-Programming-Mcqs",
      demoUrl: "https://github.com/Saksham3392/Java-Programming-Mcqs"
    },
    {
      id: "project-1",
      title: "Distributed Worker Queue & Job Pipeline",
      category: "Backend & Systems",
      oneLiner: "Distributed reverse proxy and asynchronous task routing engine with automated load handling and caching.",
      techStack: ["Node.js", "Express.js", "Redis", "Docker", "PostgreSQL"],
      bullets: [
        "Designed and developed a modular task queue engine handling background workloads with exponential retry policies.",
        "Built in-memory Redis BullMQ caching and pub/sub layers to reduce downstream database read bottlenecks.",
        "Integrated JWT-based token authentication and role-based access control (RBAC) across protected endpoints.",
        "Architected containerized services using Docker for deterministic local development and deployment."
      ],
      githubUrl: "https://github.com/Saksham3392",
      demoUrl: "https://github.com/Saksham3392"
    },
    {
      id: "project-2",
      title: "Real-Time Collaborative Code Workspace",
      category: "Full Stack",
      oneLiner: "Synchronized multi-user programming environment featuring live operational updates and room pub/sub.",
      techStack: ["React.js", "TypeScript", "Node.js", "WebSockets", "Redis"],
      bullets: [
        "Built synchronized code state propagation across connected clients via bi-directional WebSockets.",
        "Implemented room-based pub/sub channels using Redis and robust operational conflict resolution with optimistic client updates.",
        "Designed normalized state management and modular reusable UI primitives with Tailwind CSS.",
        "Optimized frontend bundle size and rendering performance for high-throughput messaging."
      ],
      githubUrl: "https://github.com/Saksham3392",
      demoUrl: "https://github.com/Saksham3392"
    },
    {
      id: "project-3",
      title: "High-Throughput Microservices Gateway",
      category: "Backend & Systems",
      oneLiner: "Reverse proxy API Gateway enforcing rate-limiting, JWT authentication, and structured error boundaries.",
      techStack: ["TypeScript", "Express.js", "Docker", "REST APIs", "PostgreSQL"],
      bullets: [
        "Architected an API Gateway implementing token-bucket rate limiting to protect downstream services against load surges.",
        "Centralized authentication middleware and audit logging telemetry for incoming HTTP requests.",
        "Configured automated Docker containerization with comprehensive health check probes and structured logging.",
        "Followed clean architecture and SOLID design patterns for modular, maintainable microservice boundaries."
      ],
      githubUrl: "https://github.com/Saksham3392",
      demoUrl: "https://github.com/Saksham3392"
    }
  ],

  // 6. Engineering Approach
  approach: [
    {
      number: "01",
      title: "Clean Architecture",
      tagline: "Build software that remains understandable as it grows.",
      description: "Focus on modular components, separation of concerns, reusable code, well-structured APIs, and maintainable codebases that team members can navigate effortlessly."
    },
    {
      number: "02",
      title: "Performance",
      tagline: "Make software fast, efficient, and reliable.",
      description: "Consider algorithmic complexity, database queries, network requests, caching, rendering performance, and backend efficiency across every tier of the stack."
    },
    {
      number: "03",
      title: "User Experience",
      tagline: "Technical quality should translate into a better product.",
      description: "Build responsive interfaces with intuitive interactions, accessibility, consistency, and relentless attention to detail so that complex systems feel effortless to use."
    }
  ],

  // 7. Education & Coursework
  education: {
    university: "Chitkara University",
    degree: "B.E. Computer Science & Engineering in AI-ML",
    location: "Punjab, India",
    status: "Active Student & Engineer",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Computer Architecture",
      "Software Engineering",
      "Distributed Systems",
      "Machine Learning Fundamentals"
    ]
  },

  // 8. About Saksham
  about: {
    heading: "About Saksham",
    p1: "I am a Computer Science & Engineering student at Chitkara University who enjoys building software from idea to implementation.",
    p2: "My interests span full-stack development, backend engineering, databases, system design, and modern web technologies.",
    p3: "I enjoy solving engineering problems, learning new technologies, and turning complex requirements into simple, reliable products."
  },

  // 9. Interactive Terminal
  terminal: {
    prompt: "saksham@portfolio:~$",
    welcome: "Welcome to Saksham Sheoran's Developer Shell.\nType 'help' for available commands or try 'skills', 'projects', 'about'.\n",
    commands: {
      help: `Available commands:
  about        → About Saksham
  skills       → Technical Skills
  projects     → Selected Projects
  education    → Education & Relevant Coursework
  grades       → Academic Transcript & Semester Grades
  approach     → Engineering Approach
  contact      → Contact Information
  resume       → Download Resume
  clear        → Clear terminal screen`,
      about: `About Saksham:
  • Computer Science & Engineering student at Chitkara University (AI-ML).
  • Full-stack developer focused on scalable web apps and reliable backends.
  • Passionate about clean architecture, system design, and practical software engineering.`,
      skills: `Technical Skills:
  • Languages        : C++, Java, JavaScript, TypeScript, Python, SQL
  • Frontend         : React.js, Next.js, HTML5, CSS3, Tailwind CSS, Responsive UI
  • Backend          : Node.js, Express.js, REST APIs, Microservices, Auth & Security
  • Databases        : PostgreSQL, MySQL, MongoDB, Redis, Schema Design
  • Tools & DevOps   : Git, GitHub, Docker, Linux, CI/CD, Vercel, AWS
  • Computer Science : DSA, OOP, DBMS, OS, Computer Networks, System Design`,
      projects: `Selected Projects:
  1. Computer Networks Assessment Engine (CN-MCQs) - https://github.com/Saksham3392/CN-MCQs
  2. Java OOP & Concurrency Practice Suite        - https://github.com/Saksham3392/Java-Programming-Mcqs
  3. Distributed Worker Queue & Job Pipeline       - Redis BullMQ & task routing
  4. Real-Time Collaborative Workspace             - WebSockets & operational state
  5. High-Throughput Microservices Gateway         - JWT auth & reverse proxy caching`,
      education: `Education:
  • Chitkara University — Punjab, India
  • Degree: B.E. Computer Science & Engineering in AI-ML (2024 – 2028)
  • Cumulative CGPA: 9.03 / 10.00 (87.00 Credits Earned)
  • Coursework: Data Structures & Algorithms, OOP, DBMS, OS, Networks, Architecture, Software Engineering, Distributed Systems`,
      grades: `Academic Grades & Evaluation (Chitkara University):
  • Overall CGPA : 9.03 / 10.00
  • Total Credits: 87.00 Credits Earned
  • Semester 1   : SGPA 7.67 | 21.00 Credits
  • Semester 2   : SGPA 9.00 | 24.00 Credits
  • Semester 3   : SGPA 10.00 | 20.00 Credits (Peak SGPA - All 'O' Grades)
  • Semester 4   : SGPA 9.50 | 22.00 Credits (Latest Verified CGPA 9.03)
  • Semesters 5-8: Evaluation Pending / Upcoming Academic Terms`,
      approach: `Engineering Approach:
  01 — Clean Architecture : Build software that remains understandable as it grows.
  02 — Performance        : Make software fast, efficient, and reliable.
  03 — User Experience    : Technical quality should translate into a better product.`,
      contact: `Contact & Coordinates:
  • Email    : sakshamsheoran2005@gmail.com
  • GitHub   : https://github.com/Saksham3392
  • LinkedIn : https://www.linkedin.com/in/saksham-sheoran/`,
      resume: `Resume:
  • Download Link: Saksham_Sheoran_Resume.pdf (Contact via sakshamsheoran2005@gmail.com for direct copy)`
    }
  },

  // 10. Academic Grades & Transcripts (Chitkara University)
  grades: {
    currentCgpa: "9.03",
    totalCompletedCredits: "87.00",
    years: [
      {
        year: 1,
        title: "Year 1",
        label: "First Year",
        period: "2024 – 2025",
        status: "Completed",
        semesters: [
          {
            sem: 1,
            title: "Semester 1",
            status: "Completed",
            sgpa: "7.67",
            cgpa: "7.67",
            totalCredits: "21.00",
            courses: [
              { num: 1, code: "24APS1103", name: "Linear Algebra", credits: "2.00", grade: "A+", period: "1 SEM" },
              { num: 2, code: "24APS1104", name: "Calculus for Engineers", credits: "3.00", grade: "A+", period: "1 SEM" },
              { num: 3, code: "24CAI1101", name: "Programming for Artificial Intelligence", credits: "5.00", grade: "B+", period: "1 SEM" },
              { num: 4, code: "24CAI1102", name: "Introduction to Artificial Intelligence", credits: "4.00", grade: "P", period: "1 SEM" },
              { num: 5, code: "24CSE0102", name: "Front End Engineering-I", credits: "5.00", grade: "A+", period: "1 SEM" },
              { num: 6, code: "24MOC0119", name: "Environmental, Social and Governance - I", credits: "2.00", grade: "O", period: "1 SEM" },
              { num: 7, code: "24UNI0125", name: "Disaster Management", credits: "0.00", grade: "O", period: "1 SEM" }
            ]
          },
          {
            sem: 2,
            title: "Semester 2",
            status: "Completed",
            sgpa: "9.00",
            cgpa: "8.38",
            totalCredits: "24.00",
            courses: [
              { num: 1, code: "24APS2102", name: "Computer Oriented Numerical Techniques", credits: "3.00", grade: "A", period: "2 SEM" },
              { num: 2, code: "24CAI0103", name: "Applied Soft Computing", credits: "3.00", grade: "O", period: "2 SEM" },
              { num: 3, code: "24CAI0104", name: "Programming Paradigms for Accelerated Computing", credits: "3.00", grade: "C", period: "2 SEM" },
              { num: 4, code: "24CAI0105", name: "Web Development Frameworks", credits: "3.00", grade: "O", period: "2 SEM" },
              { num: 5, code: "24CAI0106", name: "Foundations of Cloud Computing", credits: "2.00", grade: "O", period: "2 SEM" },
              { num: 6, code: "24ECE0110", name: "Digital Electronics", credits: "3.00", grade: "A+", period: "2 SEM" },
              { num: 7, code: "24MOC0111", name: "Indian Knowledge System", credits: "2.00", grade: "O", period: "2 SEM" },
              { num: 8, code: "24MOC0130", name: "Environmental, Social and Governance - II", credits: "2.00", grade: "O", period: "2 SEM" },
              { num: 9, code: "24UNI0106", name: "Environmental Studies", credits: "2.00", grade: "O", period: "2 SEM" },
              { num: 10, code: "25AI001", name: "The Rudiments of Artificial Intelligence, ChatGPT, DeepSeek, Grok and Metaverse", credits: "1.00", grade: "O", period: "2 SEM" }
            ]
          }
        ]
      },
      {
        year: 2,
        title: "Year 2",
        label: "Second Year",
        period: "2025 – 2026",
        status: "Completed",
        semesters: [
          {
            sem: 3,
            title: "Semester 3",
            status: "Completed",
            sgpa: "10.00",
            cgpa: "8.88",
            totalCredits: "20.00",
            courses: [
              { num: 1, code: "24APS3103", name: "Discrete Mathematics", credits: "2.00", grade: "O", period: "3 SEM" },
              { num: 2, code: "24APS3104", name: "Statistics for Applications", credits: "2.00", grade: "O", period: "3 SEM" },
              { num: 3, code: "24CAI0107", name: "Data Analytics", credits: "3.00", grade: "O", period: "3 SEM" },
              { num: 4, code: "24CAI0108", name: "Data Structures & Algorithms", credits: "3.00", grade: "O", period: "3 SEM" },
              { num: 5, code: "24CAI0109", name: "Modern Operating Systems", credits: "2.00", grade: "O", period: "3 SEM" },
              { num: 6, code: "24CAI0110", name: "Cloud Data Management", credits: "2.00", grade: "O", period: "3 SEM" },
              { num: 7, code: "24UNI0105", name: "Human Values & Professional Ethics", credits: "2.00", grade: "O", period: "3 SEM" },
              { num: 8, code: "25ECE0211", name: "Programming the Internet of Things", credits: "2.00", grade: "O", period: "3 SEM" },
              { num: 9, code: "25MOC0101", name: "AI for Marketing Specialization", credits: "2.00", grade: "O", period: "3 SEM" }
            ]
          },
          {
            sem: 4,
            title: "Semester 4",
            status: "Completed",
            sgpa: "9.50",
            cgpa: "9.03",
            totalCredits: "22.00",
            courses: [
              { num: 1, code: "24APS4101", name: "Applied Probability and Random Processes", credits: "3.00", grade: "A+", period: "4 SEM" },
              { num: 2, code: "24CAI0201", name: "Database Management Systems", credits: "4.00", grade: "O", period: "4 SEM" },
              { num: 3, code: "24CAI0202", name: "Java Programming", credits: "4.00", grade: "A", period: "4 SEM" },
              { num: 4, code: "24CAI0203", name: "Supervised and Unsupervised Learning", credits: "4.00", grade: "O", period: "4 SEM" },
              { num: 5, code: "24CAI0204", name: "Optimization Techniques", credits: "2.00", grade: "O", period: "4 SEM" },
              { num: 6, code: "24CAI0206", name: "Creative Thinking Tools for Success and Leadership", credits: "2.00", grade: "O", period: "4 SEM" },
              { num: 7, code: "24UNI0124", name: "Cyber Security", credits: "3.00", grade: "O", period: "4 SEM" }
            ]
          }
        ]
      },
      {
        year: 3,
        title: "Year 3",
        label: "Third Year",
        period: "2026 – 2027",
        status: "In Progress",
        semesters: [
          { sem: 5, title: "Semester 5", status: "Upcoming", courses: null },
          { sem: 6, title: "Semester 6", status: "Upcoming", courses: null }
        ]
      },
      {
        year: 4,
        title: "Year 4",
        label: "Final Year",
        period: "2027 – 2028",
        status: "Upcoming",
        semesters: [
          { sem: 7, title: "Semester 7", status: "Upcoming", courses: null },
          { sem: 8, title: "Semester 8", status: "Upcoming", courses: null }
        ]
      }
    ]
  },

  // 11. Social Links & Coordinates
  socialLinks: [
    { name: "GitHub", handle: "@Saksham3392", url: "https://github.com/Saksham3392", icon: "fa-brands fa-github" },
    { name: "LinkedIn", handle: "SAKSHAM SHEORAN", url: "https://www.linkedin.com/in/saksham-sheoran/", icon: "fa-brands fa-linkedin-in" },
    { name: "Email", handle: "sakshamsheoran2005@gmail.com", url: "mailto:sakshamsheoran2005@gmail.com", icon: "fa-solid fa-envelope" }
  ]
};

if (typeof window !== 'undefined') {
  window.portfolioData = portfolioData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
