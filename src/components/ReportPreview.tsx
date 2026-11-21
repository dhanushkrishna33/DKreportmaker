import React, { useState } from 'react';
import { GeneratedReport } from '../types';
import { COLLEGE_LOGO_BASE64, REPORT_FIGURES } from '../assets/reportImages';
import { exportReportToWord } from '../utils/docxExport';
import { Printer, Download, Copy, Check, Award, Layers } from 'lucide-react';

interface ReportPreviewProps {
  report: GeneratedReport;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ report }) => {
  const { formData, abstract, acknowledgement, declaration, certificateText, chapters, listOfFigures, listOfTables } = report;
  const [activeTab, setActiveTab] = useState<'all' | 'prelim' | 'chapters'>('all');
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    exportReportToWord(report);
  };

  const handleCopyText = () => {
    let fullText = `${formData.projectName}\n\n`;
    fullText += `Student: ${formData.studentName} (${formData.rollNo})\n`;
    fullText += `Guide: ${formData.guideName}\n\n`;
    fullText += `ABSTRACT:\n${abstract}\n\n`;
    chapters.forEach((c) => {
      fullText += `\nCHAPTER ${c.id}: ${c.title}\n`;
      c.subsections.forEach((sub) => {
        fullText += `\n${sub.number} ${sub.title}\n`;
        fullText += sub.content.join('\n\n') + '\n';
      });
    });

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Action Toolbar */}
      <div className="no-print bg-slate-800/90 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 sticky top-20 z-40 backdrop-blur">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'all' ? 'bg-blue-600 text-white shadow' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Sections (Full Report)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('prelim')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'prelim' ? 'bg-blue-600 text-white shadow' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Preliminary Pages (Cover, Cert, TOC)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'chapters' ? 'bg-blue-600 text-white shadow' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Chapters 1 to 8
          </button>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={handleCopyText}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium px-3.5 py-2 rounded-xl transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportWord}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-md shadow-blue-900/30"
          >
            <Download className="w-4 h-4" />
            <span>Download Word (.doc)</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-5 py-2 rounded-xl transition-colors shadow-md shadow-emerald-900/30"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF (A4)</span>
          </button>
        </div>
      </div>

      {/* Printable Document Container */}
      <div className="report-paper-container max-w-4xl mx-auto space-y-8 print:space-y-0 print:m-0 print:p-0 print:max-w-none">
        
        {/* =========================================================================
            COVER PAGE (Exact ALIET Logo & Format)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="report-page bg-white text-slate-900 p-12 sm:p-16 rounded-xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 flex flex-col justify-between min-h-[1050px] relative">
            <div className="text-center space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide leading-snug font-serif text-slate-950">
                {formData.projectName}
              </h1>

              <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto font-serif">
                An Industrial Internship Report submitted in partial fulfillment of the academic requirements for the award of the degree of
              </p>

              <div className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 font-serif leading-tight">
                BACHELOR OF TECHNOLOGY<br />
                IN<br />
                INFORMATION TECHNOLOGY
              </div>

              <div className="pt-2 text-xs sm:text-sm font-serif">
                <span className="font-semibold text-slate-600">BY</span>
                <p className="font-bold text-sm sm:text-base text-slate-950 mt-1 uppercase">
                  {formData.studentName} ({formData.rollNo})
                </p>
              </div>

              <div className="text-xs sm:text-sm font-serif">
                <span className="font-semibold text-slate-600">Under the Guidance of</span>
                <p className="font-bold text-sm sm:text-base text-slate-950 mt-1 uppercase">
                  {formData.guideName}
                </p>
              </div>
            </div>

            {/* Exact College Emblem Photo */}
            <div className="my-5 flex justify-center">
              <img
                src={COLLEGE_LOGO_BASE64}
                alt="Andhra Loyola Institute of Engineering and Technology Logo"
                className="w-36 h-36 object-contain"
              />
            </div>

            {/* Department & College Details (Strictly Unchanged) */}
            <div className="text-center font-serif space-y-1 pb-2">
              <p className="font-bold text-sm sm:text-base uppercase tracking-wider text-slate-950">
                DEPARTMENT OF INFORMATION TECHNOLOGY
              </p>
              <p className="font-bold text-xs sm:text-sm uppercase text-slate-900">
                ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY
              </p>
              <p className="text-[11px] text-slate-700">
                (Approved By AICTE, Affiliated to JNTUK)
              </p>
              <p className="text-xs font-semibold text-slate-800">
                Vijayawada-520008
              </p>
              <p className="text-xs font-bold text-slate-900">
                {formData.academicYear || '2026-2027'}
              </p>
              <p className="text-[11px] text-slate-700 pt-1">
                ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY<br />
                (Approved By AICTE, Affiliated to JNTUK) Accredited by<br />
                NAAC at "A+" and NBA (ECE, EEE, CSE, IT)<br />
                An ISO 9001 : 2015 Certified Institution
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            CERTIFICATE PAGE (Exact ALIET Logo & Signatures)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="report-page bg-white text-slate-900 p-12 sm:p-16 rounded-xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 flex flex-col justify-between min-h-[1050px] relative page-break">
            <div>
              <div className="text-center space-y-2">
                <p className="font-bold text-xs sm:text-sm uppercase text-slate-900 font-serif leading-tight">
                  ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY<br />
                  <span className="text-[11px] font-normal text-slate-600">
                    (Approved By AICTE, Affiliated to JNTUK) Accredited by<br />
                    NAAC at "A+" and NBA (ECE, EEE, CSE, IT)<br />
                    An ISO 9001 : 2015 Certified Institution
                  </span>
                </p>

                {/* College Emblem */}
                <div className="my-3 flex justify-center">
                  <img
                    src={COLLEGE_LOGO_BASE64}
                    alt="ALIET Emblem"
                    className="w-24 h-24 object-contain"
                  />
                </div>

                <h2 className="text-lg font-bold uppercase tracking-widest text-slate-950 font-serif border-b-2 border-slate-900 pb-1 inline-block">
                  CERTIFICATE
                </h2>
              </div>

              <div className="mt-8 text-justify font-serif text-sm leading-relaxed text-slate-800 indent-8">
                {certificateText}
              </div>
            </div>

            {/* Signature Blocks */}
            <div className="mt-20 pt-8 font-serif">
              <div className="grid grid-cols-2 gap-8 text-center text-xs sm:text-sm">
                <div>
                  <div className="h-14"></div>
                  <p className="font-bold uppercase text-slate-950">{formData.guideName}</p>
                  <p className="text-slate-600 text-xs">Internship Guide</p>
                </div>
                <div>
                  <div className="h-14"></div>
                  <p className="font-bold uppercase text-slate-950">{formData.hodName || 'Dr. M.CHINNARAO'}</p>
                  <p className="text-slate-600 text-xs">Head Of The Department</p>
                </div>
              </div>

              <div className="mt-16 text-center text-xs sm:text-sm">
                <div className="h-10"></div>
                <p className="font-bold uppercase text-slate-900 border-t border-slate-400 inline-block px-12 pt-1.5">
                  EXTERNAL EXAMINER
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            INTERNSHIP CERTIFICATE PAGE (Mandatory Uploaded Picture)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="report-page bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 flex flex-col justify-center items-center min-h-[1050px] relative page-break">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-widest text-slate-950 font-serif mb-6 text-center">
              INTERNSHIP CERTIFICATE
            </h2>

            {formData.certificateImage ? (
              <div className="w-full flex-1 flex items-center justify-center p-2">
                <img
                  src={formData.certificateImage}
                  alt="Scanned Internship Certificate"
                  className="max-w-full max-h-[820px] object-contain rounded border border-slate-300 shadow-md"
                />
              </div>
            ) : (
              <div className="w-full max-w-xl h-96 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <Award className="w-12 h-12 text-slate-300 mb-3" />
                <p className="font-serif text-sm font-semibold text-slate-600">
                  [ Scanned internship certificate picture is mandatory ]
                </p>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            DECLARATION & ACKNOWLEDGEMENT
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="report-page bg-white text-slate-900 p-12 sm:p-16 rounded-xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 flex flex-col justify-between min-h-[1050px] relative page-break">
            <div>
              <h2 className="text-center text-base sm:text-lg font-bold uppercase tracking-widest text-slate-950 font-serif border-b border-slate-300 pb-2 mb-6">
                DECLARATION
              </h2>
              <div className="text-justify font-serif text-sm leading-relaxed text-slate-800 space-y-4 indent-8">
                {declaration.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-12 text-right font-serif text-sm">
                <div className="h-10"></div>
                <p className="font-bold text-slate-950 uppercase">{formData.studentName}</p>
                <p className="text-slate-600 text-xs">({formData.rollNo})</p>
              </div>

              <div className="my-10 border-t border-slate-200"></div>

              <h2 className="text-center text-base sm:text-lg font-bold uppercase tracking-widest text-slate-950 font-serif border-b border-slate-300 pb-2 mb-6">
                ACKNOWLEDGEMENT
              </h2>
              <div className="text-justify font-serif text-sm leading-relaxed text-slate-800 space-y-3 indent-8">
                {acknowledgement.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-8 text-right font-serif text-sm">
              <div className="h-10"></div>
              <p className="font-bold text-slate-950 uppercase">{formData.studentName}</p>
              <p className="text-slate-600 text-xs">({formData.rollNo})</p>
            </div>
          </div>
        )}

        {/* =========================================================================
            INDEX (TABLE OF CONTENTS)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="report-page bg-white text-slate-900 p-12 sm:p-16 rounded-xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 min-h-[1050px] relative page-break font-serif">
            <h2 className="text-center text-lg font-bold uppercase tracking-widest text-slate-950 border-b-2 border-slate-900 pb-2 mb-8">
              INDEX
            </h2>

            <div className="w-full text-xs sm:text-sm">
              <div className="flex justify-between font-bold border-b-2 border-slate-900 pb-2 uppercase text-slate-950">
                <span>CONTENTS</span>
                <span>PAGE NO</span>
              </div>

              <div className="divide-y divide-slate-100 text-slate-800">
                {chapters.map((c) => (
                  <div key={c.id} className="py-2.5">
                    <div className="flex justify-between font-bold text-slate-950 uppercase">
                      <span>{c.id}. {c.title}</span>
                      <span>{c.id === 1 ? '1' : c.id === 2 ? '4' : c.id === 3 ? '9' : c.id === 4 ? '16' : c.id === 5 ? '21' : c.id === 6 ? '29' : c.id === 7 ? '32' : '33'}</span>
                    </div>
                    <div className="space-y-1 mt-1 pl-4 text-slate-700 font-normal">
                      {c.subsections.map((sub) => (
                        <div key={sub.number} className="flex justify-between text-xs py-0.5">
                          <span>{sub.number} {sub.title}</span>
                          <span className="text-slate-500 font-mono">
                            {sub.number === '1.1' ? '1' : sub.number === '2.1' ? '4' : sub.number === '3.1' ? '9' : sub.number === '4.1' ? '16' : '...'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            LIST OF FIGURES & TABLES (Exact Matching Numbering & Titles)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="report-page bg-white text-slate-900 p-12 sm:p-16 rounded-xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 min-h-[1050px] relative page-break font-serif">
            <div>
              <h2 className="text-center text-lg font-bold uppercase tracking-widest text-slate-950 border-b-2 border-slate-900 pb-2 mb-6">
                LIST OF FIGURES
              </h2>
              <table className="w-full text-xs sm:text-sm border-collapse border border-slate-400 mb-12">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-400 font-bold text-slate-950">
                    <th className="border border-slate-400 px-3 py-2 text-center w-16">S.NO</th>
                    <th className="border border-slate-400 px-4 py-2 text-left">TITLE</th>
                    <th className="border border-slate-400 px-3 py-2 text-center w-24">PAGE NO</th>
                  </tr>
                </thead>
                <tbody>
                  {listOfFigures.map((fig) => (
                    <tr key={fig.number} className="border-b border-slate-300">
                      <td className="border border-slate-300 px-3 py-1.5 text-center">{fig.number}</td>
                      <td className="border border-slate-300 px-4 py-1.5">{fig.title}</td>
                      <td className="border border-slate-300 px-3 py-1.5 text-center">{fig.pageNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2 className="text-center text-lg font-bold uppercase tracking-widest text-slate-950 border-b-2 border-slate-900 pb-2 mb-6">
                LIST OF TABLES
              </h2>
              <table className="w-full text-xs sm:text-sm border-collapse border border-slate-400">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-400 font-bold text-slate-950">
                    <th className="border border-slate-400 px-3 py-2 text-center w-24">TABLE NO</th>
                    <th className="border border-slate-400 px-4 py-2 text-left">TITLE</th>
                    <th className="border border-slate-400 px-3 py-2 text-center w-24">PAGE NO</th>
                  </tr>
                </thead>
                <tbody>
                  {listOfTables.map((tbl) => (
                    <tr key={tbl.number} className="border-b border-slate-300">
                      <td className="border border-slate-300 px-3 py-1.5 text-center">{tbl.number}</td>
                      <td className="border border-slate-300 px-4 py-1.5">{tbl.title}</td>
                      <td className="border border-slate-300 px-3 py-1.5 text-center">{tbl.pageNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            ABSTRACT
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="report-page bg-white text-slate-900 p-12 sm:p-16 rounded-xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 min-h-[1050px] relative page-break font-serif">
            <h2 className="text-center text-lg font-bold uppercase tracking-widest text-slate-950 border-b-2 border-slate-900 pb-2 mb-8">
              ABSTRACT
            </h2>
            <div className="text-justify text-sm sm:text-base leading-relaxed text-slate-800 space-y-4 indent-8">
              {abstract.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            CHAPTERS 1 TO 8 (With Exact Blueprints & Screenshots)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'chapters') && (
          <div className="space-y-8 print:space-y-0">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="report-page bg-white text-slate-900 p-12 sm:p-16 rounded-xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 min-h-[1050px] relative page-break font-serif space-y-8"
              >
                {/* Chapter Heading */}
                <div className="border-b-2 border-slate-900 pb-3">
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-950">
                    {chapter.id}. {chapter.title}
                  </h2>
                </div>

                {/* Subsections */}
                <div className="space-y-6">
                  {chapter.subsections.map((sub) => (
                    <div key={sub.number} className="space-y-3">
                      <h3 className="text-sm sm:text-base font-bold uppercase text-slate-900">
                        {sub.number} {sub.title}
                      </h3>

                      <div className="text-justify text-xs sm:text-sm leading-relaxed text-slate-800 space-y-3 indent-8">
                        {sub.content.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>

                      {/* Optional SubSection Table */}
                      {sub.table && (
                        <div className="my-5 overflow-x-auto">
                          <p className="text-xs font-bold text-slate-900 mb-1 text-center">
                            Table {sub.number}: {sub.table.caption}
                          </p>
                          <table className="w-full text-xs border-collapse border border-slate-400">
                            <thead>
                              <tr className="bg-slate-100 border-b border-slate-400 font-bold text-slate-950">
                                {sub.table.headers.map((h, hi) => (
                                  <th key={hi} className="border border-slate-400 px-3 py-2 text-left">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sub.table.rows.map((r, ri) => (
                                <tr key={ri} className="border-b border-slate-300 hover:bg-slate-50">
                                  {r.map((cell, ci) => (
                                    <td key={ci} className="border border-slate-300 px-3 py-1.5 font-normal">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Optional Code Listing */}
                      {sub.codeListing && (
                        <div className="my-5 bg-slate-950 text-slate-100 p-4 rounded-lg font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 print:bg-slate-100 print:text-black print:border-slate-300">
                          <div className="text-[11px] font-bold text-blue-400 print:text-blue-700 pb-2 mb-2 border-b border-slate-800 print:border-slate-300">
                            {sub.codeListing.caption}
                          </div>
                          <pre className="whitespace-pre overflow-x-auto">{sub.codeListing.code}</pre>
                        </div>
                      )}

                      {/* Blueprint / Architecture Diagrams and Screenshots */}
                      {sub.figure && (
                        <div className="my-6 p-4 border border-slate-200 rounded-lg bg-slate-50 flex flex-col items-center justify-center text-center">
                          {sub.figure.imageSrc ? (
                            <img
                              src={sub.figure.imageSrc}
                              alt={sub.figure.caption}
                              className="max-w-full max-h-[500px] object-contain rounded border border-slate-300 shadow-sm"
                            />
                          ) : (
                            <div className="w-full max-w-md py-6 bg-white border border-slate-300 rounded shadow-sm flex flex-col items-center justify-center text-slate-600 gap-2 font-mono text-xs">
                              <Layers className="w-8 h-8 text-blue-600" />
                              <span className="font-bold text-slate-900 uppercase">Architecture Blueprint</span>
                              <span className="text-[11px] text-slate-500 px-4">{sub.figure.description}</span>
                            </div>
                          )}
                          <p className="text-xs font-bold text-slate-900 mt-2.5 font-serif">
                            {sub.figure.caption}
                          </p>
                          <p className="text-[11px] text-slate-600 italic font-serif mt-0.5">
                            Description: {sub.figure.description}
                          </p>
                        </div>
                      )}

                      {/* In Chapter 5, render Figures 5 to 18 */}
                      {chapter.id === 5 && sub.number === '5.1' && (
                        <div className="space-y-6 pt-4">
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[5].src} alt="Figure 5" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 5: Login Page</p>
                            <p className="text-[11px] text-slate-600 italic">Description: The login screen shows the brand, credentials form, and demo access.</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[6].src} alt="Figure 6" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 6: Signup Page</p>
                            <p className="text-[11px] text-slate-600 italic">Description: The sign-up form collects name, email, and validated password.</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[7].src} alt="Figure 7" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 7: Dashboard</p>
                            <p className="text-[11px] text-slate-600 italic">Description: Dashboard displays summary metrics, interactive chart, and ticker strip.</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[8].src} alt="Figure 8" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 8: Price chart with SMA, EMA and RSI</p>
                            <p className="text-[11px] text-slate-600 italic">Description: 3M range chart with SMA, EMA overlays, and 14-period RSI sub-panel.</p>
                          </div>
                        </div>
                      )}

                      {chapter.id === 5 && sub.number === '5.2' && (
                        <div className="space-y-6 pt-4">
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[9].src} alt="Figure 9" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 9: Watchlist</p>
                            <p className="text-[11px] text-slate-600 italic">Description: Watchlist table displays tracked symbols and real-time performance.</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[10].src} alt="Figure 10" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 10: Adding a Symbol to the Watchlist</p>
                            <p className="text-[11px] text-slate-600 italic">Description: Adding an asset appends the row with immediate toast feedback.</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[11].src} alt="Figure 11" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 11: Duplicate Symbol Validation</p>
                            <p className="text-[11px] text-slate-600 italic">Description: Duplicate asset addition is safely blocked with validation messaging.</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[12].src} alt="Figure 12" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 12: Portfolio</p>
                            <p className="text-[11px] text-slate-600 italic">Description: Portfolio table with invested cost basis, current value, and individual P/L.</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[13].src} alt="Figure 13" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 13: Add Holding Dialog</p>
                            <p className="text-[11px] text-slate-600 italic">Description: Dialog collects asset symbol, share quantity, and purchase price.</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[14].src} alt="Figure 14" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 14: Input Validation</p>
                            <p className="text-[11px] text-slate-600 italic">Description: Enforces non-negative inputs and prevents corrupt records.</p>
                          </div>
                        </div>
                      )}

                      {chapter.id === 5 && sub.number === '5.3' && (
                        <div className="space-y-6 pt-4">
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[15].src} alt="Figure 15" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 15: Settings Page</p>
                            <p className="text-[11px] text-slate-600 italic">Description: Controls for themes, chart indicators, and data mode options.</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[16].src} alt="Figure 16" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 16: Light Theme</p>
                            <p className="text-[11px] text-slate-600 italic">Description: The application executing under the light theme palette.</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[17].src} alt="Figure 17" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 17: Reset Demo Data Confirmation</p>
                            <p className="text-[11px] text-slate-600 italic">Description: Modal confirming restoration of the clean baseline sample dataset.</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <img src={REPORT_FIGURES[18].src} alt="Figure 18" className="max-w-xl w-full rounded border border-slate-300 shadow-sm" />
                            <p className="text-xs font-bold text-slate-900 mt-2">Figure 18: Empty State for a New Account</p>
                            <p className="text-[11px] text-slate-600 italic">Description: New user account initialized with empty state notices.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
