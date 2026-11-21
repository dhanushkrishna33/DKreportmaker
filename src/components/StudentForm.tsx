import React, { useState, useRef } from 'react';
import { ReportFormData } from '../types';
import { Sparkles, FileText, AlertCircle, GitBranch, User, Hash, BookOpen, UserCheck, RefreshCw, Upload, Image as ImageIcon, CheckCircle, Trash2 } from 'lucide-react';

interface StudentFormProps {
  onGenerate: (data: ReportFormData) => void;
  isLoading: boolean;
  statusMessage: string;
}

// Default dummy certificate data URL for sample demo loads
const SAMPLE_CERTIFICATE_PREVIEW = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23fdfbf7" stroke="%231e3a8a" stroke-width="8"/><rect x="20" y="20" width="760" height="560" fill="none" stroke="%23d97706" stroke-width="2" stroke-dasharray="6,4"/><text x="400" y="110" font-family="serif" font-size="34" font-weight="bold" fill="%231e3a8a" text-anchor="middle">CERTIFICATE OF INTERNSHIP</text><text x="400" y="160" font-family="sans-serif" font-size="16" fill="%23475569" text-anchor="middle">THIS IS PROUDLY PRESENTED TO</text><text x="400" y="230" font-family="serif" font-size="28" font-weight="bold" fill="%230f172a" text-anchor="middle">U. DHANUSH KRISHNA</text><line x1="220" y1="245" x2="580" y2="245" stroke="%23cbd5e1" stroke-width="2"/><text x="400" y="290" font-family="sans-serif" font-size="15" fill="%23334155" text-anchor="middle">for successfully completing the Industrial Internship on</text><text x="400" y="325" font-family="sans-serif" font-size="18" font-weight="600" fill="%232563eb" text-anchor="middle">InvestFlow - Stock Watchlist &amp; Portfolio Tracker</text><text x="400" y="370" font-family="sans-serif" font-size="14" fill="%2364748b" text-anchor="middle">during the academic tenure 2026-2027 with exceptional performance.</text><line x1="120" y1="490" x2="280" y2="490" stroke="%23475569" stroke-width="1.5"/><text x="200" y="515" font-family="sans-serif" font-size="13" font-weight="600" fill="%23334155" text-anchor="middle">Industry Mentor</text><line x1="520" y1="490" x2="680" y2="490" stroke="%23475569" stroke-width="1.5"/><text x="600" y="515" font-family="sans-serif" font-size="13" font-weight="600" fill="%23334155" text-anchor="middle">Director / Authorized Signatory</text></svg>';

export const StudentForm: React.FC<StudentFormProps> = ({ onGenerate, isLoading, statusMessage }) => {
  const [formData, setFormData] = useState<ReportFormData>({
    studentName: '',
    rollNo: '',
    projectName: '',
    guideName: '',
    guideDesignation: 'Assistant Professor, Department of IT',
    hodName: 'Dr. M.CHINNARAO',
    directorName: 'Rev. Fr. Dr. V. Antonysamy SJ.',
    collegeName: 'ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY',
    departmentName: 'DEPARTMENT OF INFORMATION TECHNOLOGY',
    academicYear: '2026-2027',
    githubLink: '',
    isNoLink: false,
    domain: 'Auto-detect',
    projectDescription: '',
    certificateImage: '',
  });

  const [certificateFileName, setCertificateFileName] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError(null);
  };

  const handleNoLinkToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      isNoLink: checked,
      githubLink: checked ? 'no link' : '',
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setValidationError('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFormData((prev) => ({ ...prev, certificateImage: result }));
      setCertificateFileName(file.name);
      if (validationError) setValidationError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCertificate = () => {
    setFormData((prev) => ({ ...prev, certificateImage: '' }));
    setCertificateFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentName.trim()) {
      setValidationError('Student Name is mandatory.');
      return;
    }
    if (!formData.rollNo.trim()) {
      setValidationError('Roll Number is mandatory.');
      return;
    }
    if (!formData.projectName.trim()) {
      setValidationError('Project Title / Name is mandatory.');
      return;
    }
    if (!formData.guideName.trim()) {
      setValidationError('Project Guide Name is mandatory.');
      return;
    }

    // MANDATORY CERTIFICATE CHECK
    if (!formData.certificateImage || !formData.certificateImage.trim()) {
      setValidationError('Picture of Internship Certificate is MANDATORY. Please upload your scanned certificate image below.');
      return;
    }

    // Verify IT student (Roll number standard format in JNTUK: e.g. 23HP1A1233 where 12 denotes IT)
    const rollUpper = formData.rollNo.toUpperCase();
    if (!rollUpper.includes('12') && !rollUpper.includes('IT')) {
      const confirmProceed = window.confirm(
        `Notice: This tool is exclusively designed for Information Technology (IT) department students (Branch code 12). Your roll number "${formData.rollNo}" does not appear to contain branch code "12". Do you want to proceed as an IT student?`
      );
      if (!confirmProceed) return;
    }

    onGenerate(formData);
  };

  const loadSampleInvestFlow = () => {
    setFormData({
      studentName: 'U.DHANUSH KRISHNA',
      rollNo: '23HP1A1233',
      projectName: 'INVESTFLOW – STOCK WATCHLIST AND PORTFOLIO TRACKER USING REACT AND TYPESCRIPT',
      guideName: 'VIJAY VAMSI',
      guideDesignation: 'Assistant Professor, Department of IT',
      hodName: 'Dr. M.CHINNARAO',
      directorName: 'Rev. Fr. Dr. V. Antonysamy SJ.',
      collegeName: 'ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY',
      departmentName: 'DEPARTMENT OF INFORMATION TECHNOLOGY',
      academicYear: '2026-2027',
      githubLink: 'https://github.com/dhanushkrishna33/groww-intern',
      isNoLink: false,
      domain: 'Stock & Financial Analytics',
      projectDescription: 'Stock watchlist and portfolio tracker built with React 19, TypeScript, and Vite. Features Demo Mode with IndexedDB and optional Firebase integration.',
      certificateImage: SAMPLE_CERTIFICATE_PREVIEW,
    });
    setCertificateFileName('InvestFlow_Certificate_DK.png');
    setValidationError(null);
  };

  const loadSampleNoLink = () => {
    setFormData({
      studentName: 'K. SAI CHARAN',
      rollNo: '23HP1A1215',
      projectName: 'SECURE CLOUD FILE STORAGE WITH AES-256 GCM ENCRYPTION',
      guideName: 'Dr. B. KAVITHA',
      guideDesignation: 'Associate Professor, Department of IT',
      hodName: 'Dr. M.CHINNARAO',
      directorName: 'Rev. Fr. Dr. V. Antonysamy SJ.',
      collegeName: 'ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY',
      departmentName: 'DEPARTMENT OF INFORMATION TECHNOLOGY',
      academicYear: '2026-2027',
      githubLink: 'no link',
      isNoLink: true,
      domain: 'Cyber Security & Cryptography',
      projectDescription: 'Encrypted cloud document vault implementing client-side AES-256 GCM encryption, SHA-256 HMAC integrity checks, and zero-knowledge storage architecture.',
      certificateImage: SAMPLE_CERTIFICATE_PREVIEW,
    });
    setCertificateFileName('CyberSecurity_Certificate.png');
    setValidationError(null);
  };

  return (
    <div className="no-print bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span>Generate IT Project Report</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Fill in your details below according to the ALIET Department of Information Technology format.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadSampleInvestFlow}
            className="text-xs bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Load InvestFlow Demo</span>
          </button>
          <button
            type="button"
            onClick={loadSampleNoLink}
            className="text-xs bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-800 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test "No Link" Demo</span>
          </button>
        </div>
      </div>

      {validationError && (
        <div className="mt-4 p-3.5 bg-rose-950/70 border border-rose-800/80 text-rose-300 rounded-xl text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Student Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Student Full Name *</span>
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              placeholder="e.g. U.DHANUSH KRISHNA"
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-blue-400" />
              <span>Roll Number (IT Dept) *</span>
            </label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleInputChange}
              placeholder="e.g. 23HP1A1233"
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 uppercase focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">Branch code 12 identifies Information Technology</p>
          </div>

          {/* Project Title */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Project Title / Name *</span>
            </label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="e.g. INVESTFLOW – STOCK WATCHLIST AND PORTFOLIO TRACKER USING REACT AND TYPESCRIPT"
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 uppercase focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Guide Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Project Guide Name *</span>
            </label>
            <input
              type="text"
              name="guideName"
              value={formData.guideName}
              onChange={handleInputChange}
              placeholder="e.g. VIJAY VAMSI"
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 uppercase focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Academic Year */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Academic Year
            </label>
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleInputChange}
              placeholder="2026-2027"
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* MANDATORY CERTIFICATE PICTURE UPLOAD */}
          <div className="md:col-span-2 bg-slate-900/90 border-2 border-dashed border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all hover:border-blue-400">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
              <div>
                <label className="block text-sm font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Picture of Internship Certificate *</span>
                  <span className="bg-rose-600/30 text-rose-400 border border-rose-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    MANDATORY
                  </span>
                </label>
                <p className="text-xs text-slate-400 mt-1">
                  Upload your scanned company completion certificate. This picture will be inserted on the official Certificate page.
                </p>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleFileChange}
                className="hidden"
                id="cert-file-input"
              />

              {!formData.certificateImage ? (
                <label
                  htmlFor="cert-file-input"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow transition-colors flex items-center gap-2 flex-shrink-0"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Certificate Image</span>
                </label>
              ) : (
                <button
                  type="button"
                  onClick={handleRemoveCertificate}
                  className="bg-rose-900/60 hover:bg-rose-800 text-rose-300 border border-rose-700 text-xs font-medium px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Picture</span>
                </button>
              )}
            </div>

            {/* Certificate Preview Card */}
            {formData.certificateImage ? (
              <div className="mt-3 p-3 bg-slate-950/90 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-700 bg-white flex-shrink-0">
                    <img
                      src={formData.certificateImage}
                      alt="Certificate Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Certificate Attached Successfully</span>
                    </p>
                    <p className="text-xs text-slate-300 truncate mt-0.5">{certificateFileName || 'Uploaded_Certificate.jpg'}</p>
                    <p className="text-[11px] text-slate-500">Ready for report inclusion</p>
                  </div>
                </div>

                <label
                  htmlFor="cert-file-input"
                  className="cursor-pointer text-xs text-blue-400 hover:text-blue-300 underline flex-shrink-0 px-2"
                >
                  Change picture
                </label>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 py-6 border border-slate-800 rounded-xl bg-slate-950/40 text-center cursor-pointer hover:bg-slate-950/80 transition-colors"
              >
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-300">Click to browse or drop certificate image here</p>
                <p className="text-[11px] text-slate-500 mt-1">PNG, JPG, or WEBP (Max 15MB)</p>
              </div>
            )}
          </div>

          {/* GitHub Repository Link */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-blue-400" />
                <span>GitHub Repository Link (or type "no link")</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-amber-300 hover:text-amber-200">
                <input
                  type="checkbox"
                  checked={formData.isNoLink}
                  onChange={handleNoLinkToggle}
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900 h-4 w-4"
                />
                <span>I don't have a link ("no link")</span>
              </label>
            </div>

            <input
              type="text"
              name="githubLink"
              disabled={formData.isNoLink}
              value={formData.githubLink}
              onChange={handleInputChange}
              placeholder="e.g. https://github.com/dhanushkrishna33/groww-intern or no link"
              className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none ${
                formData.isNoLink ? 'opacity-50 border-slate-800' : 'border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              }`}
            />
            {formData.isNoLink ? (
              <p className="text-xs text-amber-400/90 mt-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>"No Link" selected: A brief domain analysis will synthesize realistic technical architecture, tables, and code.</span>
              </p>
            ) : (
              <p className="text-xs text-slate-400 mt-1">
                If provided, we will automatically fetch the README, package dependencies, and file structure from GitHub.
              </p>
            )}
          </div>

          {/* Domain Selection */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Technology Domain (Optional Classification)
            </label>
            <select
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="Auto-detect">Auto-detect from Title & Codebase</option>
              <option value="Stock & Financial Analytics">Stock & Financial Analytics (React, Vite, Recharts, IndexedDB)</option>
              <option value="Machine Learning & AI">Machine Learning & AI (FastAPI, PyTorch, Scikit-Learn)</option>
              <option value="Full-Stack Web & Cloud Systems">Full-Stack Web & Cloud Systems (React, Node.js, PostgreSQL)</option>
              <option value="Cyber Security & Cryptography">Cyber Security & Cryptography (AES-256, HMAC, Auth Vault)</option>
              <option value="IoT & Smart Automation">IoT & Smart Automation (MQTT, Time-Series Telemetry)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Exclusive for <span className="text-blue-400 font-semibold">IT Dept Students</span> (Andhra Loyola Institute of Engineering & Technology)
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{statusMessage || 'Analyzing & Synthesizing Report...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Complete Academic Report</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
