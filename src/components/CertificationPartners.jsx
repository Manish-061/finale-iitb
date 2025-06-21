import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CertificationPartners = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [partnersData, setPartnersData] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Simulate loading state and data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setPartnersData([
        {
          id: 1,
          name: 'Microsoft',
          logo: 'https://img.icons8.com/color/96/microsoft.png',
          description: 'Azure Fundamentals, Power Platform'
        },
        {
          id: 2,
          name: 'Google',
          logo: 'https://img.icons8.com/color/96/google-logo.png',
          description: 'Google Cloud Platform, Analytics'
        },
        {
          id: 3,
          name: 'Amazon AWS',
          logo: 'https://img.icons8.com/color/96/amazon-web-services.png',
          description: 'Cloud Practitioner, Solutions Architect'
        },
        {
          id: 6,
          name: 'Oracle',
          logo: 'https://img.icons8.com/color/96/oracle-logo.png',
          description: 'Database, Java Certification'
        },
        {
          id: 7,
          name: 'IBM',
          logo: 'https://img.icons8.com/color/96/ibm.png',
          description: 'Data Science, AI/ML'
        },
        {
          id: 8,
          name: 'Adobe',
          logo: 'https://img.icons8.com/color/96/adobe-creative-cloud.png',
          description: 'Creative Suite, Digital Marketing'
        },
        {
          id: 9,
          name: 'Meta',
          logo: 'https://img.icons8.com/color/96/meta.png',
          description: 'Social Media Marketing, AR/VR'
        },
        {
          id: 10,
          name: 'Salesforce',
          logo: 'https://img.icons8.com/color/96/salesforce.png',
          description: 'Admin, Developer, Marketing Cloud'
        },
        {
          id: 11,
          name: 'Red Hat',
          logo: 'https://img.icons8.com/color/96/red-hat.png',
          description: 'Linux, OpenShift, Ansible'
        },
        {
          id: 12,
          name: 'VMware',
          logo: 'https://img.icons8.com/color/96/vmware.png',
          description: 'vSphere, Cloud Management'
        }
      ]);
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading simulation

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Skeleton loading component
  const PartnerSkeleton = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center text-center">
        <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
          <Skeleton height={64} width={64} className="mb-4" />
          <Skeleton height={20} width={120} className="mb-2" />
          <Skeleton height={16} width={160} count={2} className="mb-1" />
        </SkeletonTheme>
      </div>
    </div>
  );

  // Partner card component
  const PartnerCard = ({ partner, index }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-hover"
      whileHover={{ 
        y: -5, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.img
          src={partner.logo}
          alt={`${partner.name} logo`}
          className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
        />
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {partner.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {partner.description}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 md:py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Our <span className="text-blue-600">Certification Partners</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We've partnered with industry leaders to provide globally recognized certifications 
              that enhance your career prospects and validate your expertise in cutting-edge technologies.
            </p>
          </motion.div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {isLoading ? (
              // Show skeleton loading state
              Array(12).fill(0).map((_, index) => (
                <PartnerSkeleton key={index} />
              ))
            ) : (
              // Show actual partner data
              partnersData.map((partner, index) => (
                <PartnerCard 
                  key={partner.id} 
                  partner={partner} 
                  index={index} 
                />
              ))
            )}
          </div>

          {/* Call to Action */}
          {!isLoading && (
            <motion.div 
              variants={itemVariants}
              className="text-center mt-12"
            >
              <p className="text-gray-600 mb-6">
                Ready to get certified? Explore our certification-focused internship programs.
              </p>
              <motion.a
                href="/programs"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors cursor-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Certification Programs
                <svg 
                  className="ml-2 h-5 w-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationPartners;
