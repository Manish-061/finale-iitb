import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Award, Calendar, User, FileText } from 'lucide-react';

const VerifyCertificatePage = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock certificate data for demonstration
  const mockCertificates = {
    'INTECH2024001': {
      isValid: true,
      studentName: 'Rajesh Kumar Singh',
      program: 'Full Stack Development',
      issueDate: '2024-03-15',
      completionDate: '2024-03-10',
      grade: 'A+',
      skills: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript'],
      instructor: 'Dr. Priya Sharma',
      certificateUrl: '/certificates/INTECH2024001.pdf'
    },
    'INTECH2024002': {
      isValid: true,
      studentName: 'Priya Mehta',
      program: 'Data Science & Analytics',
      issueDate: '2024-02-28',
      completionDate: '2024-02-25',
      grade: 'A',
      skills: ['Python', 'Pandas', 'Machine Learning', 'TensorFlow', 'Data Visualization'],
      instructor: 'Prof. Amit Singh',
      certificateUrl: '/certificates/INTECH2024002.pdf'
    }
  };
  
  const handleVerification = async (e) => {
    e.preventDefault();
    if (!certificateId.trim()) return;
    
    setIsLoading(true);
    setVerificationResult(null);
    
    // Simulate API call
    setTimeout(() => {
      const result = mockCertificates[certificateId.toUpperCase()];
      if (result) {
        setVerificationResult({ ...result, certificateId: certificateId.toUpperCase() });
      } else {
        setVerificationResult({ isValid: false, certificateId: certificateId.toUpperCase() });
      }
      setIsLoading(false);
    }, 1500);
  };

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
              Verify <span className="text-blue-600">Certificate</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Enter your certificate ID to verify the authenticity of your INLIGHN TECH certificate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Verification Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Verification Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-blue-50 p-8 rounded-2xl mb-12"
            >
              <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
                Certificate Verification
              </h2>
              
              <form onSubmit={handleVerification} className="max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      placeholder="Enter Certificate ID (e.g., INTECH2024001)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                      disabled={isLoading}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isLoading || !certificateId.trim()}
                    className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 ${
                      isLoading || !certificateId.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                    whileHover={!isLoading && certificateId.trim() ? { scale: 1.05 } : {}}
                    whileTap={!isLoading && certificateId.trim() ? { scale: 0.95 } : {}}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        Verify
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                Certificate ID format: INTECH + Year + Sequential Number (e.g., INTECH2024001)
              </p>
            </motion.div>

            {/* Verification Result */}
            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`p-8 rounded-2xl ${
                  verificationResult.isValid 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="text-center mb-8">
                  {verificationResult.isValid ? (
                    <>
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-green-800 mb-2">Certificate Verified!</h3>
                      <p className="text-green-700">This certificate is authentic and valid.</p>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-red-800 mb-2">Certificate Not Found</h3>
                      <p className="text-red-700">
                        Certificate ID "{verificationResult.certificateId}" could not be verified. 
                        Please check the ID and try again.
                      </p>
                    </>
                  )}
                </div>

                {verificationResult.isValid && (
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Student Name</p>
                            <p className="font-semibold text-gray-900">{verificationResult.studentName}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Award className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Program</p>
                            <p className="font-semibold text-gray-900">{verificationResult.program}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Issue Date</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(verificationResult.issueDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Certificate ID</p>
                            <p className="font-semibold text-gray-900">{verificationResult.certificateId}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">G</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Grade</p>
                            <p className="font-semibold text-gray-900">{verificationResult.grade}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">I</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Instructor</p>
                            <p className="font-semibold text-gray-900">{verificationResult.instructor}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-sm text-gray-600 mb-2">Skills Acquired</p>
                      <div className="flex flex-wrap gap-2">
                        {verificationResult.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Download Certificate
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyCertificatePage;
