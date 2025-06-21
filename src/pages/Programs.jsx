import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProgramsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const programs = [
    {
      id: 1,
      title: "Full Stack Development",
      category: "development",
      duration: "3 months",
      level: "Beginner to Advanced",
      description: "Master both frontend and backend development with modern technologies like React, Node.js, and MongoDB.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML/CSS"],
      features: [
        "Build 5+ real-world projects",
        "Learn modern development practices",
        "One-on-one mentorship",
        "Industry-standard tools and frameworks"
      ],
      price: "₹15,000",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      category: "data",
      duration: "4 months",
      level: "Intermediate",
      description: "Learn to extract insights from data using Python, machine learning, and advanced analytics techniques.",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Tableau"],
      features: [
        "Hands-on ML projects",
        "Real dataset analysis",
        "Industry case studies",
        "Career guidance and placement support"
      ],
      price: "₹18,000",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Cybersecurity Fundamentals",
      category: "security",
      duration: "2 months",
      level: "Beginner",
      description: "Understand cybersecurity principles, ethical hacking, and how to protect digital assets.",
      technologies: ["Network Security", "Ethical Hacking", "Penetration Testing", "Security Tools"],
      features: [
        "Practical security assessments",
        "Hands-on lab exercises",
        "Industry certifications prep",
        "Expert instructor guidance"
      ],
      price: "₹12,000",
      color: "bg-red-500"
    },
    {
      id: 4,
      title: "Data Analysis",
      category: "data",
      duration: "2 months",
      level: "Beginner",
      description: "Learn to analyze and visualize data using Excel, SQL, and business intelligence tools.",
      technologies: ["Excel", "SQL", "Power BI", "Tableau", "Statistics"],
      features: [
        "Business intelligence projects",
        "Advanced Excel techniques",
        "SQL database management",
        "Dashboard creation and reporting"
      ],
      price: "₹10,000",
      color: "bg-purple-500"
    },
    {
      id: 5,
      title: "Project Management",
      category: "management",
      duration: "1.5 months",
      level: "All Levels",
      description: "Learn modern project management methodologies including Agile, Scrum, and traditional approaches.",
      technologies: ["Agile", "Scrum", "Jira", "Trello", "MS Project"],
      features: [
        "PMP certification prep",
        "Real project simulations",
        "Agile methodology mastery",
        "Leadership skills development"
      ],
      price: "₹8,000",
      color: "bg-yellow-500"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Programs' },
    { id: 'development', name: 'Development' },
    { id: 'data', name: 'Data & Analytics' },
    { id: 'security', name: 'Security' },
    { id: 'management', name: 'Management' }
  ];

  const filteredPrograms = activeTab === 'all' 
    ? programs 
    : programs.filter(program => program.category === activeTab);

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Our Internship <span className="text-blue-600">Programs</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Choose from our comprehensive range of internship programs designed to 
              jumpstart your career in technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Programs Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPrograms.map((program, index) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
                  >
                    <div className={`h-2 ${program.color}`}></div>
                    
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                        <span className="text-2xl font-bold text-blue-600">{program.price}</span>
                      </div>
                      
                      <div className="flex gap-4 text-sm text-gray-600 mb-4">
                        <span>📅 {program.duration}</span>
                        <span>📚 {program.level}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-6">{program.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {program.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {program.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                              <span className="text-green-500 mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex gap-3">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                          Enroll Now
                        </button>
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
