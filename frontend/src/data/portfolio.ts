import resumePdf from "../assets/resume.pdf";
import ibmImg from "../assets/ibm.png";
import uiuxImg from "../assets/uiux.jpg";
import courseraImg from "../assets/java.jpeg";
import profileImg from "../assets/john.jpg";

// --- START: NEW SKILL LOGO IMPORTS ---
// NOTE: You MUST replace these placeholder paths with the actual paths to your logo images.
import reactLogo from "../assets/reactLogo.png";
import jsLogo from "../assets/jsLogo.png";
import tsLogo from "../assets/tsLogo.png";
import htmlLogo from "../assets/htmlLogo.png";
import cssLogo from "../assets/cssLogo.png";
import tailwindLogo from "../assets/tailwindcss.jpg";
import nodeLogo from "../assets/nodeLogo.png";
import expressLogo from "../assets/express-logo.jpg";
import pythonLogo from "../assets/pythonLogo.png";
import djangoLogo from "../assets/djangoLogo.png";
import fastapiLogo from "../assets/fastapiLogo.png";
import mongoLogo from "../assets/mongoLogo.png";
import mysqlLogo from "../assets/mysqlLogo.png";
import firebaseLogo from "../assets/firebaseLogo.png";
import gitLogo from "../assets/gitLogo.png";
import githubLogo from "../assets/githubLogo.png";
import vscodeLogo from "../assets/vscode.jpg";
import figmaLogo from "../assets/figmaLogo.png";
import dockerLogo from "../assets/dockerLogo.png";
import geminiLogo from "../assets/geminiLogo.jpg";
import supabaseLogo from "../assets/supabaseLogo.png";
import tensorflowLogo from "../assets/tensorflowLogo.jpg";
import shadcnLogo from "../assets/shadcn.png";
import socketLogo from "../assets/socket.io.png";
import webrtcLogo from "../assets/webrtc.jpg";
import flaskLogo from "../assets/flask-logo.png";
import easyocr from "../assets/easy-ocr.png";
// --- END: NEW SKILL LOGO IMPORTS ---

// Updated portfolio data with hackathon experiences
export const portfolioData = {
  personal: {
    name: "John Wesley",
    title: "Full Stack Developer",
    subtitle:
      "Building exceptional digital experiences with cutting-edge technology",
    bio: "Passionate full-stack developer with expertise in modern web technologies, AI integration, and user-centered design. I create scalable applications that solve real-world problems and deliver exceptional user experiences.",
    email: "johnwesley8113@gmail.com",
    phone: "+91 9841958457",
    location: "Chennai, Tamil Nadu, IN",
    github: "https://github.com/johnwesley755/ai-calling-agent",
    linkedin: "https://www.linkedin.com/in/john-wesley-6707ab258/",
    twitter: "https://x.com/JohnWesley97513",
    image: profileImg,
    resume: resumePdf,
    avatar:
      "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171867_X85WpWCcMzNsoMWtMxiZQspKzaOwCyuK.jpg",
  },
  skills: {
    Frontend: {
      items: [
        {
          name: "React",
          icon: reactLogo, // UPDATED to use imported variable
          color: "#61DAFB",
        },
        {
          name: "JavaScript",
          icon: jsLogo, // UPDATED to use imported variable
          color: "#F7DF1E",
        },
        {
          name: "TypeScript",
          icon: tsLogo, // UPDATED to use imported variable
          color: "#3178C6",
        },
        {
          name: "HTML5",
          icon: htmlLogo, // UPDATED to use imported variable
          color: "#E34F26",
        },
        {
          name: "CSS3",
          icon: cssLogo, // UPDATED to use imported variable
          color: "#1572B6",
        },
        {
          name: "Tailwind",
          icon: tailwindLogo, // UPDATED to use imported variable
          color: "#06B6D4",
        },
        {
          name: "Shadcn UI",
          icon: shadcnLogo,
          color: "#000000",
        },
      ],
      gradient: "from-blue-900 via-blue-800 to-blue-700",
    },
    Backend: {
      items: [
        {
          name: "Node.js",
          icon: nodeLogo, // UPDATED to use imported variable
          color: "#339933",
        },
        {
          name: "Express",
          icon: expressLogo, // UPDATED to use imported variable
        },
        {
          name: "Python",
          icon: pythonLogo, // UPDATED to use imported variable
          color: "#3776AB",
        },
        {
          name: "Django",
          icon: djangoLogo, // UPDATED to use imported variable
          color: "#092E20",
        },
        {
          name: "Flask",
          icon: flaskLogo, // UPDATED to use imported variable
          color: "#000000",
        },
        {
          name: "FastAPI",
          icon: fastapiLogo, // UPDATED to use imported variable
          color: "#000000",
        },

        {
          name: "TensorFlow",
          icon: tensorflowLogo,
          color: "#000000",
        },
        {
          name: "Socket.io",
          icon: socketLogo,
          color: "#000000",
        },
        {
          name: "WebRTC",
          icon: webrtcLogo,
          color: "#000000",
        },
      ],
      gradient: "from-green-900 via-green-800 to-green-700",
    },
    Database: {
      items: [
        {
          name: "MongoDB",
          icon: mongoLogo, // UPDATED to use imported variable
          color: "#47A248",
        },
        {
          name: "Supabase",
          icon: supabaseLogo, // UPDATED to use imported variable
          color: "#000000",
        },
        {
          name: "MySQL",
          icon: mysqlLogo, // UPDATED to use imported variable
          color: "#4479A1",
        },
        {
          name: "Firebase",
          icon: firebaseLogo, // UPDATED to use imported variable
          color: "#FFCA28",
        },
      ],
      gradient: "from-purple-900 via-purple-800 to-purple-700",
    },
    Tools: {
      items: [
        {
          name: "Git",
          icon: gitLogo, // UPDATED to use imported variable
          color: "#F05032",
        },
        {
          name: "GitHub",
          icon: githubLogo, // UPDATED to use imported variable
          // color: "#f1f1f1ff",
        },
        {
          name: "VS Code",
          icon: vscodeLogo, // UPDATED to use imported variable
          color: "#007ACC",
        },
        {
          name: "Figma",
          icon: figmaLogo, // UPDATED to use imported variable
          color: "#F24E1E",
        },
        {
          name: "Docker",
          icon: dockerLogo, // UPDATED to use imported variable
          color: "#2496ED",
        },
        {
          name: "Gemini API",
          icon: geminiLogo,
          color: "#2496ED",
        },
        {
          name: "EasyOCR",
          icon: easyocr,
          color: "#000000",
        }
      ],
      gradient: "from-orange-900 via-orange-800 to-orange-700",
    },
  },
  // START OF MOVED PROJECTS DATA (Content remains unchanged)
  projects: [
    {
      id: 1,
      title: "AI Calling Agent",
      year: "2025",
      description:
        "Intelligent call automation with context awareness and personalized conversation flows that adapt in real-time to user preferences",
      image:
        "https://www.intervuebox.ai/wp-content/uploads/2025/06/how-cut-candidate-no-shows-ai-calling-agents.png",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Express", "Gemini API"],
      demoLink: "https://ai-calling-agent-ashen.vercel.app/",
      githubLink: "https://github.com/johnwesley755/ai-calling-agent",
      category: "AI/ML",
      status: "Live",
      featured: true,
      stars: 267,
      icon: "brain",
      size: "large",
    },
    {
      id: 2,
      title: "Cerebro AI – Brain Tumor Detection",
      year: "2025",
      description:
        "AI-powered FastAPI web application for detecting brain tumors from MRI scans with secure role-based access for patients and doctors, integrated with TensorFlow and Supabase.",
      image:
        "https://th.bing.com/th/id/OIP.g4e_ohPsARrxuiI298uLrwHaEO?w=310&h=180&c=7&r=0&o=7&cb=12&dpr=1.1&pid=1.7&rm=3",
      role: "Full Stack Developer",
      techStack: ["React", "FastAPI", "TensorFlow", "Supabase", "Tailwind"],
      demoLink: "https://cerebro-ai-nu.vercel.app/",
      githubLink: "https://github.com/johnwesley755/cerebro-ai",
      category: "AI/ML",
      status: "Live",
      featured: true,
      stars: 289,
      icon: "brain",
      size: "large",
    },
    {
      id: 3,
      title: "Smart E-Commerce Hub",
      year: "2024",
      description:
        "AI-powered e-commerce platform with intelligent product recommendations and immersive shopping experiences",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
      role: "Full Stack Web Development",
      techStack: ["React", "Tailwind", "Firebase", "Shadcn UI"],
      demoLink: "https://vutoria-bb1e7.web.app/",
      githubLink: "https://github.com/johnwesley755/vutoria-demo-store",
      category: "E-Commerce",
      status: "Live",
      featured: true,
      stars: 203,
      icon: "shopping",
      size: "large",
    },
    {
      id: 4,
      title: "AI Text-to-Video Generation",
      year: "2025",
      description:
        "Revolutionary application converting text prompts into stunning AI-generated videos",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format",
      role: "Full Stack and AI/ML",
      techStack: ["Python", "FastAPI", "React", "Tensorflow"],
      demoLink: "https://johnwesley756-shorts-video.hf.space/",
      githubLink: "https://github.com/johnwesley755/shorts-video",
      category: "AI/ML",
      status: "Beta",
      featured: false,
      stars: 174,
      icon: "video",
      size: "medium",
    },
    {
      id: 5,
      title: "Real-time Chat Platform",
      year: "2025",
      description:
        "Next-generation messaging platform with end-to-end encryption and real-time presence",
      image:
        "https://files.ably.io/ghost/prod/2023/01/build-a-realtime-chat-app-from-scratch--1-.png",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Express", "Socket.io"],
      demoLink: "https://chat-app-beta-six-31.vercel.app/",
      githubLink: "https://github.com/johnwesley755/chat-application",
      category: "Web App",
      status: "Live",
      featured: false,
      stars: 156,
      icon: "message",
      size: "medium",
    },
    {
      id: 6,
      title: "Video Conferencing Application",
      year: "2025",
      description:
        "Enterprise-grade video conferencing with crystal-clear audio and screen sharing",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop&auto=format",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Firebase", "WebRTC"],
      demoLink: "https://video-conferencing-app-eoid.vercel.app/",
      githubLink: "https://github.com/johnwesley755/video-conferencing-app",
      category: "Web App",
      status: "Live",
      featured: false,
      stars: 267,
      icon: "video",
      size: "small",
    },
    {
      id: 7,
      title: "Namma Isai Music",
      year: "2024",
      description:
        "Immersive music streaming with spatial audio and dynamic visualizations",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format",
      role: "Frontend Development",
      techStack: ["HTML5", "CSS3", "JavaScript", "Firebase"],
      demoLink: "https://namma-isai-music.vercel.app/",
      githubLink: "https://github.com/johnwesley755/namma-isai-music",
      category: "Web App",
      status: "Live",
      featured: false,
      stars: 128,
      icon: "music",
      size: "small",
    },
    {
      id: 8,
      title: "Car Dealership Platform",
      year: "2025",
      description:
        "Full-stack automotive platform with dealership exploration and reviews",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&auto=format",
      role: "Full Stack Web Development",
      techStack: ["React", "MongoDB", "Django", "Express"],
      demoLink: "https://car-dealership-application.onrender.com",
      githubLink: "https://github.com/johnwesley755/car-dealership-application",
      category: "Web App",
      status: "Live",
      featured: false,
      stars: 167,
      icon: "globe",
      size: "small",
    },
    {
      id: 9,
      title: "Product Pricing Application",
      year: "2025",
      description:
        "Intelligent pricing with market analysis and dynamic recommendations",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Django", "Docker"],
      demoLink:
        "https://github.com/johnwesley755/dealer-evaluation-application",
      githubLink:
        "https://github.com/johnwesley755/dealer-evaluation-application",
      category: "Web App",
      status: "Beta",
      featured: false,
      stars: 137,
      icon: "globe",
      size: "small",
    },
    {
      id: 10,
      title: "Image to Text Extractor",
      year: "2025",
      description:
        "Extract text from images using advanced OCR technology with features like image preview, multiple export options (PDF/Word), and clipboard copy, built with Flask, React, and EasyOCR.",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop&auto=format",
      role: "Full Stack Developer",
      techStack: ["React", "Flask", "EasyOCR", "Tailwind", "OpenCV"],
      demoLink: "https://github.com/johnwesley755/image-to-text",
      githubLink: "https://github.com/johnwesley755/image-to-text",
      category: "Web App",
      status: "Completed",
      featured: true,
      stars: 137,
      icon: "camera",
      size: "medium",
    },

    {
      id: 11,
      title: "Agent Management System",
      year: "2025",
      description:
        "A secure MERN stack dashboard for managing agents, distributed lists, and CSV uploads with authentication, email workflows, and role-based access control.",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop&auto=format",
      role: "Full Stack Web Development",
      techStack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
      demoLink: "https://agent-management-system-dun.vercel.app/",
      githubLink: "https://github.com/johnwesley755/agent-management-system",
      category: "Web App / Dashboard",
      status: "Completed",
      featured: true,
      stars: 198,
      icon: "users",
      size: "large",
    },

    {
      id: 12,
      title: "Knowledge Hub – AI Document Management",
      year: "2025",
      description:
        "A collaborative MERN stack platform integrating Gemini AI for semantic search, smart tagging, and AI-powered document summarization.",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop&auto=format",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
      demoLink: "https://knowledge-hub-psi-nine.vercel.app/",
      githubLink: "https://github.com/johnwesley755/knowledge-hub",
      category: "Web App",
      status: "Live",
      featured: false,
      stars: 192,
      icon: "file-text",
      size: "large",
    },
  ],
  // END OF MOVED PROJECTS DATA
  experiences: [
    {
      id: 1,
      title: "IBM Full Stack Developer Certification",
      organization: "IBM",
      period: "2025",
      type: "certification",
      image: ibmImg,
      description:
        "Comprehensive full-stack development program covering microservices architecture, cloud deployment, DevOps practices, and enterprise-level application development.",
      skills: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Docker",
        "Kubernetes",
        "Django",
      ],
      icon: "Award",
      achievements: [
        "Completed 12 hands-on labs",
        "Built 3 full-stack projects",
        "Scored 95% on final assessment",
        "Certified in cloud deployment",
      ],
    },
    {
      id: 2,
      title: "Frontend for Java Full Stack Development",
      organization: "Coursera",
      period: "2025",
      type: "certification",
      image: courseraImg,
      description:
        "Advanced frontend development course focusing on modern JavaScript frameworks, responsive design, and integration with Java backend systems.",
      skills: ["HTML", "CSS", "Javascript", "Angular", "Bootstrap"],
      icon: "Code",
      achievements: [
        "Built responsive web applications",
        "Mastered Angular framework",
        "Implemented dynamic user interfaces",
        "Integrated with REST APIs",
      ],
    },
    {
      id: 3,
      title: "Google UX Design Certification",
      organization: "Google",
      period: "2025",
      type: "education",
      image: uiuxImg,
      description:
        "Comprehensive UX design program covering user research, prototyping, design systems, accessibility standards, and user-centered design methodology.",
      skills: [
        "Figma",
        "UI Design",
        "User Research",
        "Prototyping",
        "Accessibility",
        "Wireframing",
      ],
      icon: "Sparkles",
      achievements: [
        "Completed 6 real-world projects",
        "Developed professional UX portfolio",
        "Mastered design thinking process",
        "Certified in accessibility standards",
      ],
    },
    // Added Hackathon Experiences
    {
      id: 4,
      title: "Pitchathon",
      organization: "Vellore Institute of Technology, Chennai.",
      period: "2024",
      type: "hackathon",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
      description:
        "Developed innovative computer vision solution using machine learning algorithms for fashion retail industry",
      skills: [
        "React",
        "Machine Learning",
        "Python",
        "API Integration",
        "Team Leadership",
      ],
      icon: "Trophy",
      achievements: [
        "Selected as finalist in competitive 30-hour hackathon among 200+ participants.",
        "Developed innovative computer vision solution using machine learning algorithms for fashion retail industry",
      ],
    },
    {
      id: 5,
      title: "Innothon '24",
      organization: "KCG College of Technology,Chennai.",
      period: "2024",
      type: "hackathon",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      description:
        "Developed innovative computer vision solution using machine learning algorithms for fashion retail industry",
      skills: [
        "React",
        "Machine Learning",
        "Python",
        "API Integration",
        "Team Leadership",
      ],
      icon: "Shield",
      achievements: [
        "Advanced to finals in prestigious AI/ML hackathon focused on computer vision applications",
        "Collaborated with cross-functional team to deliver end-to-end AI solution within tight deadline constraints",
      ],
    },
  ],
};