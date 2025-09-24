import resumePdf from "../assets/resume.pdf";
import ibmImg from "../assets/ibm.png";
import uiuxImg from "../assets/uiux.jpg";
import courseraImg from "../assets/java.jpeg";

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
    github: "https://github.com/johnwesley755",
    linkedin: "https://www.linkedin.com/in/john-wesley-6707ab258/",
    twitter: "https://x.com/JohnWesley97513",
    resume: resumePdf,
    avatar:
      "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171867_X85WpWCcMzNsoMWtMxiZQspKzaOwCyuK.jpg",
  },
  skills: {
    Frontend: {
      items: [
        {
          name: "React",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
          color: "#61DAFB",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
          color: "#F7DF1E",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
          color: "#3178C6",
        },
        {
          name: "HTML5",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
          color: "#E34F26",
        },
        {
          name: "CSS3",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
          color: "#1572B6",
        },
        {
          name: "Tailwind",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
          color: "#06B6D4",
        },
      ],
      gradient: "from-blue-900 via-blue-800 to-blue-700",
    },
    Backend: {
      items: [
        {
          name: "Node.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
          color: "#339933",
        },
        {
          name: "Express",
          icon: "https://cdn.buttercms.com/8am8PZECScDawQa33Lv2",
        },
        {
          name: "Python",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
          color: "#3776AB",
        },
        {
          name: "Django",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
          color: "#092E20",
        },
        {
          name: "FastAPI",
          icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVr-JXNop9z9sJIZqdnQxlOC2-WvdOPBl4QPkHtOsjCk1FRkkFM9_LsAoafHMJsD2ywIM&usqp=CAU",
          color: "#000000",
        },
      ],
      gradient: "from-green-900 via-green-800 to-green-700",
    },
    Database: {
      items: [
        {
          name: "MongoDB",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
          color: "#47A248",
        },
        {
          name: "MySQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
          color: "#4479A1",
        },
        {
          name: "Firebase",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
          color: "#FFCA28",
        },
      ],
      gradient: "from-purple-900 via-purple-800 to-purple-700",
    },
    Tools: {
      items: [
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
          color: "#F05032",
        },
        {
          name: "GitHub",
          icon: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
          // color: "#f1f1f1ff",
        },
        {
          name: "VS Code",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
          color: "#007ACC",
        },
        {
          name: "Figma",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
          color: "#F24E1E",
        },
        {
          name: "Docker",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
          color: "#2496ED",
        },
      ],
      gradient: "from-orange-900 via-orange-800 to-orange-700",
    },
  },
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
      category: "Web App",
      status: "Live",
      featured: true,
      stars: 267,
    },
    {
      id: 2,
      title: "AI Text-to-Video Generation",
      year: "2025",
      description:
        "Developed application converting text prompts into AI-generated videos using advanced diffusion models",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
      role: "Full Stack and AI/ML",
      techStack: ["Python", "Flask", "React", "Diffusion models"],
      demoLink: "https://shorts-video-alpha.vercel.app/",
      githubLink: "https://github.com/johnwesley755/shorts-video",
      category: "AI/ML",
      status: "Beta",
      featured: false,
      stars: 174,
    },
    {
      id: 3,
      title: "Chat Application",
      year: "2025",
      description:
        "Architected secure real-time messaging platform with authentication and stores user's data in MongoDB with instant messaging capabilities",
      image:
        "https://files.ably.io/ghost/prod/2023/01/build-a-realtime-chat-app-from-scratch--1-.png",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Express", "Socket.io"],
      demoLink: "https://chat-app-beta-six-31.vercel.app/",
      githubLink: "https://github.com/johnwesley755/chat-application",
      category: "Web App",
      status: "Live",
      featured: true,
      stars: 156,
    },
    {
      id: 4,
      title: "E-Commerce Platform",
      year: "2024",
      description:
        "Modern e-commerce solution with AI-powered recommendations, real-time inventory management, and seamless payment integration.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      role: "Full Stack Web Development",
      techStack: ["React", "Tailwind CSS", "Firebase", "Shadcn UI"],
      demoLink: "https://vutoria-bb1e7.web.app/",
      githubLink: "https://github.com/johnwesley755/vutoria-demo-store",
      category: "E-Commerce",
      status: "Live",
      featured: true,
      stars: 203,
    },
    {
      id: 5,
      title: "AI Image to Text Generator",
      year: "2024",
      description:
        "A web app that extracts text from images and generates context-aware responses using advanced natural language processing",
      image:
        "https://www.aiseesoft.com/images/tutorial/jpg-to-text/jpg-to-text.jpg",
      role: "AI Developer",
      techStack: ["Python", "FastAPI", "React", "WebSocket"],
      demoLink: "https://example.com/project5",
      githubLink: "https://github.com/johnwesley755/image-to-text",
      category: "AI/ML",
      status: "Beta",
      featured: false,
      stars: 174,
    },
    {
      id: 6,
      title: "Video Conferencing Application",
      year: "2025",
      description:
        "Built browser-based video conferencing solution enabling seamless peer-to-peer communication",
      image:
        "https://kumospace.mo.cloudinary.net/https://content.kumospace.com/hubfs/Blog/Why%20Businesses%20Need%20Secure%20Video%20Conferencing%20and%20How%20to%20Get%20Started/Secure-Video-Conferencing.jpg?tx=w_responsive:fallback-max-width_1212;fallback-max-width-mobile_720",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Firebase", "WebRTC"],
      demoLink: "https://video-conferencing-app-eoid.vercel.app/",
      githubLink: "https://github.com/johnwesley755/video-conferencing-app",
      category: "Web App",
      status: "Live",
      featured: true,
      stars: 267,
    },
    {
      id: 7,
      title: "Car Dealership Application",
      year: "2025",
      description:
        "A full-stack web application that allows users to explore car dealerships, view dealer details, and submit reviews with sentiment analysis.",
      image:
        "https://img.freepik.com/free-vector/isometric-devops-illustration_52683-84175.jpg?ga=GA1.1.1436923625.1750582702&semt=ais_hybrid&w=740",
      role: "Full Stack Web Development",
      techStack: ["React", "MongoDB", "Django", "Express"],
      demoLink: "https://car-dealership-application.onrender.com",
      githubLink: "https://github.com/johnwesley755/car-dealership-application",
      category: "Web App",
      status: "Live",
      featured: true,
      stars: 167,
    },
    {
      id: 8,
      title: "Product Pricing Application",
      year: "2025",
      description:
        "Built browser-based video conferencing solution enabling seamless peer-to-peer communication",
      image:
        "https://img.freepik.com/free-vector/gradient-api-illustration_23-2149368725.jpg?ga=GA1.1.1436923625.1750582702&semt=ais_hybrid&w=740",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Django", "Express", "Docker"],
      demoLink:
        "https://github.com/johnwesley755/dealer-evaluation-application",
      githubLink:
        "https://github.com/johnwesley755/dealer-evaluation-application",
      category: "Web App",
      status: "Beta",
      featured: true,
      stars: 137,
    },
    {
      id: 9,
      title: "Namma Isai",
      year: "2024",
      description:
        "A custom-built music player with playlists, local storage, and responsive UI. Features include audio visualization, custom themes, and seamless playback controls.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
      role: "Frontend Development",
      techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
      demoLink: "https://namma-isai-music.vercel.app/",
      githubLink: "https://github.com/johnwesley755/namma-isai-music",
      category: "Web App",
      status: "Live",
      featured: true,
      stars: 128,
    },
  ],
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
        // "Built AI-powered healthcare solution",
        // "Led team of 6 developers",
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
        // "Specialized in web exploitation",
        // "Won best newcomer award",
      ],
    },
    // {
    //   id: 6,
    //   title: "NASA Space Apps Challenge",
    //   organization: "NASA",
    //   period: "2024",
    //   type: "hackathon",
    //   image:
    //     "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
    //   description:
    //     "International hackathon using NASA's open data to solve real-world problems related to Earth and space exploration.",
    //   skills: [
    //     "Data Visualization",
    //     "React",
    //     "D3.js",
    //     "NASA APIs",
    //     "Space Technology",
    //   ],
    //   icon: "Rocket",
    //   achievements: [
    //     "Local winner - Chennai",
    //     "Created Earth monitoring dashboard",
    //     "Processed satellite imagery data",
    //     "Nominated for global judging",
    //   ],
    // },
  ],
};
