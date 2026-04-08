import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Download, X, Shield, Terminal } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CertificateGenerator({ isComplete, flagsFound, tutorialsCompleted, theme = 'dark' }) {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [generating, setGenerating] = useState(false);
  const certificateRef = useRef(null);

  const totalFlags = 7;
  const totalTutorials = 5; // Updated to 5 labs
  const isFullyComplete = tutorialsCompleted === totalTutorials; // Only need labs for certificate

  const handleDownload = async () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    setGenerating(true);
    
    try {
      // Capture certificate as canvas
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      // Convert to PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`KARCHON_Certificate_${userName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate. Please try again.');
    }

    setGenerating(false);
  };

  if (!isFullyComplete) return null;

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        onClick={() => setShowModal(true)}
        className={`fixed bottom-24 right-8 z-40 p-4 rounded-full shadow-2xl border-2 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-white text-white hover:from-gray-700 hover:to-gray-800'
            : 'bg-gradient-to-br from-gray-100 to-gray-200 border-black text-black hover:from-gray-200 hover:to-gray-300'
        } transition-all duration-300 hover:scale-110 group`}
        aria-label="Get your completion certificate"
      >
        <Award className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className={`absolute top-4 right-4 z-10 p-2 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                <h2 className={`text-2xl font-mono font-bold flex items-center gap-3 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  <Award className="w-7 h-7" />
                  Claim Your Certificate
                </h2>
                <p className={`mt-2 font-mono text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  🎉 Congratulations! You've completed all {totalTutorials} interactive labs!
                </p>
              </div>

              {/* Certificate Preview */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div ref={certificateRef} className="bg-white p-12 rounded-xl border-8 border-black relative">
                  {/* Corner decorations */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-gray-800" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-gray-800" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-gray-800" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-gray-800" />

                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-12 h-12 text-black" />
                      <Shield className="w-10 h-10 text-gray-700" />
                    </div>
                  </div>

                  {/* Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-5xl font-mono font-black text-black mb-2">KARCHON</h1>
                    <p className="text-xl font-mono text-gray-700">Cybersecurity Learning Platform</p>
                    <div className="w-32 h-1 bg-black mx-auto mt-4" />
                  </div>

                  {/* Certificate Title */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-gray-800 mb-2">Certificate of Achievement</h2>
                    <p className="text-sm font-mono text-gray-600">This is to certify that</p>
                  </div>

                  {/* Name */}
                  <div className="text-center mb-8">
                    <div className="inline-block border-b-2 border-black px-12 py-2 min-w-[300px]">
                      <p className="text-3xl font-serif text-black">
                        {userName || 'Your Name Here'}
                      </p>
                    </div>
                  </div>

                  {/* Achievement Details */}
                  <div className="text-center mb-8 space-y-2">
                    <p className="text-base font-mono text-gray-700">
                      has successfully completed the <span className="font-bold">KARCHON Cybersecurity Labs</span>
                    </p>
                    <p className="text-sm font-mono text-gray-600">
                      by completing all {totalTutorials} hands-on interactive security tutorials
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="flex justify-center gap-6 mb-8 flex-wrap">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2 border-2 border-gray-800">
                        <Terminal className="w-8 h-8 text-black" />
                      </div>
                      <p className="text-xs font-mono text-gray-700">Linux Mastery</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2 border-2 border-gray-800">
                        <Shield className="w-8 h-8 text-black" />
                      </div>
                      <p className="text-xs font-mono text-gray-700">Security Skills</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2 border-2 border-gray-800">
                        <Award className="w-8 h-8 text-black" />
                      </div>
                      <p className="text-xs font-mono text-gray-700">CTF Expert</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-end pt-8 border-t-2 border-gray-300">
                    <div className="text-center">
                      <div className="border-t-2 border-black pt-2 w-48">
                        <p className="text-sm font-mono font-bold text-black">KYROS</p>
                        <p className="text-xs font-mono text-gray-600">Platform Founder</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-gray-600">Date of Completion</p>
                      <p className="text-sm font-mono font-bold text-black">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Certificate ID */}
                  <div className="text-center mt-6">
                    <p className="text-xs font-mono text-gray-500">
                      Certificate ID: KARCHON-{Date.now().toString(36).toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Input and Download */}
              <div className={`p-6 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name for the certificate"
                  className={`w-full px-4 py-3 rounded-lg border font-mono mb-4 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-black placeholder-gray-400'
                  }`}
                />
                <button
                  onClick={handleDownload}
                  disabled={generating}
                  className={`w-full py-3 rounded-lg font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                    generating
                      ? 'bg-gray-600 cursor-not-allowed'
                      : theme === 'dark'
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {generating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download Certificate (PDF)
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}