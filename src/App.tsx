import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StudentForm } from './components/StudentForm';
import { ReportPreview } from './components/ReportPreview';
import { ReportFormData, GeneratedReport } from './types';
import { fetchGitHubRepoData } from './utils/githubFetcher';
import { generateFullReport } from './utils/reportSynthesizer';
import { FileText, Sparkles, CheckCircle, ShieldAlert, GraduationCap } from 'lucide-react';

export const App: React.FC = () => {
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleGenerate = async (formData: ReportFormData) => {
    setIsLoading(true);
    setStatusMessage('Analyzing submission details...');

    try {
      let repoData = null;
      const isNoLink = formData.isNoLink || !formData.githubLink || formData.githubLink.trim().toLowerCase() === 'no link';

      if (!isNoLink) {
        setStatusMessage('Connecting to GitHub API to inspect repository...');
        try {
          repoData = await fetchGitHubRepoData(formData.githubLink);
        } catch (err) {
          console.warn('GitHub fetch failed, falling back to synthesis:', err);
        }
      } else {
        setStatusMessage('Performing domain analysis on project title...');
        // brief synthetic delay to simulate deep analysis
        await new Promise((r) => setTimeout(r, 600));
      }

      setStatusMessage('Structuring academic chapters, tables, and references...');
      await new Promise((r) => setTimeout(r, 400));

      const generated = generateFullReport(formData, repoData);
      setReport(generated);

      setTimeout(() => {
        const previewElement = document.querySelector('.report-paper-container');
        if (previewElement) {
          previewElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error('Failed to generate report:', err);
      alert('An error occurred during report generation. Please verify your details.');
    } finally {
      setIsLoading(false);
      setStatusMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* Banner Section */}
        <section className="no-print text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/60 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>ALIET • Department of Information Technology</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Academic Project Report Maker
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Generate an official, complete, and publication-ready B.Tech Industrial Internship Report tailored to the
            Andhra Loyola Institute of Engineering & Technology regulation guidelines. Enter your GitHub repo or choose
            <span className="text-amber-400 font-medium"> "no link"</span> to synthesize a comprehensive technical analysis automatically.
          </p>
        </section>

        {/* Input Form */}
        <StudentForm onGenerate={handleGenerate} isLoading={isLoading} statusMessage={statusMessage} />

        {/* Report Preview */}
        {report && <ReportPreview report={report} />}
      </main>

      {/* Footer */}
      <footer className="no-print bg-slate-900 border-t border-slate-800 py-8 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-400">
            DK Report Maker — Developed for Department of Information Technology, ALIET (Affiliated to JNTUK).
          </p>
          <p>
            Compliant with JNTUK R23 / Academic Guidelines • Cover Page, Certificate, Declaration, Acknowledgement, Index & 8 Chapters.
          </p>
          <p className="pt-2">
            Repository:{' '}
            <a
              href="https://github.com/dhanushkrishna33/DKreportmaker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              https://github.com/dhanushkrishna33/DKreportmaker
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
