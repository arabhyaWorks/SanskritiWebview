import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import abstract from '../assets/abstract.png';
import Footer from './Footer';
import backgroundImage from '../assets/VibhgaBG.avif';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-[#FFF8F8] z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          background: `url(${backgroundImage}) center/cover no-repeat`,
          backgroundAttachment: 'fixed',
          zIndex: -1
        }}
      />
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 shadow-sm">
        <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
          <button
            onClick={onClose}
            className="p-1 bg-black/20 hover:bg-black/60 rounded-full transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-brown-500 group-hover:scale-110 transition-transform" />
          </button>
          <TranslatableText
            text="Privacy Policy"
            className="text-[#5A1616] text-2xl font-bold font-['Inter'] ml-2"
            as="h1"
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#5A1616]/10">
          <img
            src={abstract}
            alt="Abstract Design"
            className="w-40 mx-auto mb-6"
          />
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                Introduction
              </h2>
              <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                This Privacy Policy outlines how the Culture Department Government of Uttar Pradesh, India ("we," "our," or "us") handles user data. We are committed to preserving user privacy and maintaining transparency in all aspects of our digital services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                Information We Collect
              </h2>
              <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                We do not collect any personal data or sensitive user information. The application is built to operate without requiring personal identifiers such as names, phone numbers, email addresses, or device-specific data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                Use of Information
              </h2>
              <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                As no personal information is collected, we do not use, process, or analyze any user data for profiling, analytics, or marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                Third-Party Services
              </h2>
              <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                The app does not use or integrate with third-party services that gather, track, or analyze user information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                Data Security
              </h2>
              <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                While personal data is not collected, we implement robust security measures to protect the app from unauthorized access, misuse, or vulnerabilities. Our systems are secured using industry-standard protocols to ensure a safe and reliable experience for all users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                Children's Privacy
              </h2>
              <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                The app does not knowingly collect information from children under the age of 13. Given the app's data-free design, it fully complies with child data protection norms and digital safety regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                Changes to This Privacy Policy
              </h2>
              <p className="text-[#5A1616] text-justify font-['Inter'] leading-relaxed">
                We may update this Privacy Policy from time to time to reflect regulatory changes or improvements. Updates will be available within the app and on our official website. Users are encouraged to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#903603] mb-4 font-['Baloo_2']">
                Contact Us
              </h2>
              <div className="bg-[#903603]/5 rounded-lg p-6">
                <p className="text-[#5A1616] font-['Inter'] leading-relaxed">
                  If you have any questions or concerns regarding this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 space-y-2 text-[#5A1616] font-['Inter']">
                  <p><strong>Email:</strong> directorcultureup@gmail.com</p>
                  <p><strong>Phone:</strong> 0522-2286672</p>
                  <p><strong>Address:</strong> Directorate of Culture, 9th Floor, Jawahar Bhawan, Lucknow</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;