import React, { useState } from 'react';
import { GeneratedReport } from '../types';
import { COLLEGE_LOGO_BASE64 } from '../assets/reportImages';
import { getRelativeFiguresForProject } from '../utils/relativePictures';
import { exportReportToWord } from '../utils/docxExport';
import { Printer, Download, Copy, Check } from 'lucide-react';

interface ReportPreviewProps {
  report: GeneratedReport;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ report }) => {
  const { formData, abstract, acknowledgement, declaration, certificateText, chapters, listOfFigures, listOfTables } = report;
  const [activeTab, setActiveTab] = useState<'all' | 'prelim' | 'chapters'>('all');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const relativeFigures = getRelativeFiguresForProject(formData.projectName, formData.domain);

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = async () => {
    setIsExporting(true);
    try {
      await exportReportToWord(report);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyText = () => {
    let fullText = `${formData.projectName}\n\n`;
    fullText += `Student: ${formData.studentName} (${formData.rollNo})\n`;
    fullText += `Guide: ${formData.guideName}\n\n`;
    fullText += `ABSTRACT:\n${abstract}\n\n`;
    chapters.forEach((c) => {
      fullText += `\n${c.id}. ${c.title}\n`;
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
            Preliminary Pages (1 to 7)
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
            disabled={isExporting}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-md shadow-blue-900/30 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating .docx...' : 'Download Word (.docx)'}</span>
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

      {/* Strict A4 Document Paper Container */}
      <div className="report-paper-container mx-auto flex flex-col items-center space-y-8 print:space-y-0 print:m-0 print:p-0">
        
        {/* =========================================================================
            PAGE 1: COVER PAGE (Strictly Centered Alignment & 1-inch margins)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="a4-sheet bg-white text-black shadow-2xl border border-slate-200 print:border-none print:shadow-none flex flex-col justify-between">
            <div className="text-center">
              <h1 className="text-[15pt] font-bold uppercase tracking-wide leading-snug font-serif text-black mb-[5mm]">
                {formData.projectName}
              </h1>

              <p className="text-[12pt] font-serif text-black leading-snug max-w-[155mm] mx-auto mb-[5mm]">
                An Industrial Internship Report submitted in partial fulfillment of the academic requirements for the award of the degree of
              </p>

              <div className="text-[12pt] font-bold uppercase tracking-wider text-black font-serif leading-tight mb-[4mm]">
                BACHELOR OF TECHNOLOGY<br />
                IN<br />
                INFORMATION TECHNOLOGY
              </div>

              <div className="text-[12pt] font-bold font-serif uppercase mb-[4mm]">
                BY<br />
                <span className="mt-1 block">{formData.studentName} ({formData.rollNo})</span>
              </div>

              <div className="text-[12pt] font-serif mb-[4mm]">
                <span>Under the Guidance of</span><br />
                <span className="font-bold uppercase text-[12pt] mt-1 block">{formData.guideName}</span>
              </div>

              {/* Exact Centered College Emblem */}
              <div className="my-[4mm] flex justify-center">
                <img
                  src={COLLEGE_LOGO_BASE64}
                  alt="ALIET Logo"
                  className="w-[125px] h-[125px] object-contain"
                />
              </div>

              {/* Exact College Details (Strictly Unchanged) */}
              <div className="text-center font-serif text-[12pt] leading-tight space-y-1">
                <p className="font-bold uppercase tracking-wider">
                  DEPARTMENT OF INFORMATION TECHNOLOGY
                </p>
                <p className="font-bold uppercase">
                  ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY
                </p>
                <p className="font-bold">
                  (Approved By AICTE, Affiliated to JNTUK)
                </p>
                <p className="font-bold">
                  Vijayawada-520008
                </p>
                <p className="font-bold">
                  {formData.academicYear || '2026-2027'}
                </p>
                <p className="font-bold uppercase pt-2">
                  ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY
                </p>
                <p className="text-[11pt]">
                  (Approved By AICTE, Affiliated to JNTUK) Accredited by<br />
                  NAAC at "A+" and NBA (ECE, EEE, CSE, IT)<br />
                  An ISO 9001 : 2015 Certified Institution
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 2: CERTIFICATE PAGE (Exact Alignments: Header Center, Body Justified, Sigs Left/Right)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="a4-sheet bg-white text-black shadow-2xl border border-slate-200 print:border-none print:shadow-none flex flex-col justify-between page-break">
            <div>
              <div className="text-center font-serif">
                <p className="font-bold text-[12pt] uppercase leading-tight">
                  ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY
                </p>
                <p className="text-[11pt] leading-tight text-black mt-1">
                  (Approved By AICTE, Affiliated to JNTUK) Accredited by<br />
                  NAAC at "A+" and NBA (ECE, EEE, CSE, IT)<br />
                  An ISO 9001 : 2015 Certified Institution
                </p>

                {/* Centered College Logo */}
                <div className="my-[4mm] flex justify-center">
                  <img
                    src={COLLEGE_LOGO_BASE64}
                    alt="ALIET Logo"
                    className="w-[95px] h-[95px] object-contain"
                  />
                </div>

                <h2 className="text-[14pt] font-bold uppercase tracking-widest text-black font-serif my-[4mm]">
                  CERTIFICATE
                </h2>
              </div>

              {/* Justified Body Text */}
              <p className="text-justify font-serif text-[12pt] leading-[1.5] indent-[24pt] text-black mt-[4mm]">
                {certificateText}
              </p>
            </div>

            {/* Signature Blocks: Left = Guide, Right = HOD, Center = External Examiner */}
            <div className="pt-[15mm] font-serif">
              <div className="flex justify-between items-start text-[12pt] w-full">
                <div className="text-left">
                  <div className="h-[14mm]"></div>
                  <p className="font-bold uppercase">{formData.guideName}</p>
                  <p className="text-[11pt]">Internship Guide</p>
                </div>

                <div className="text-right">
                  <div className="h-[14mm]"></div>
                  <p className="font-bold uppercase">{formData.hodName || 'Dr. M.CHINNARAO'}</p>
                  <p className="text-[11pt]">Head Of The Department</p>
                </div>
              </div>

              <div className="mt-[18mm] text-center text-[12pt]">
                <div className="h-[10mm]"></div>
                <p className="font-bold uppercase inline-block border-t border-black px-[12mm] pt-1">
                  EXTERNAL EXAMINER
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 3: INTERNSHIP CERTIFICATE PAGE (Mandatory Uploaded Image Centered)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="a4-sheet bg-white text-black shadow-2xl border border-slate-200 print:border-none print:shadow-none flex flex-col justify-start items-center page-break">
            <h2 className="text-[14pt] font-bold uppercase tracking-widest text-black font-serif mb-[6mm] text-center">
              INTERNSHIP CERTIFICATE
            </h2>

            <div className="w-full h-[220mm] flex items-center justify-center p-2">
              <img
                src={formData.certificateImage}
                alt="Scanned Internship Certificate"
                className="max-w-full max-h-full object-contain rounded border border-slate-300 shadow-sm"
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 4: DECLARATION PAGE (Heading Center, Body Justified, Signature Right)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="a4-sheet bg-white text-black shadow-2xl border border-slate-200 print:border-none print:shadow-none flex flex-col justify-start page-break font-serif">
            <h2 className="text-center text-[14pt] font-bold uppercase tracking-widest text-black mb-[8mm]">
              DECLARATION
            </h2>

            <div className="space-y-[5mm]">
              <p className="text-justify text-[12pt] leading-[1.5] indent-[24pt] text-black">
                I hereby declare that the project report entitled "{formData.projectName}" is the work done by me and submitted during the academic year {formData.academicYear || '2026-27'} in partial fulfillment of the requirements for the award of degree of Bachelor of Technology in Information Technology.
              </p>
              <p className="text-justify text-[12pt] leading-[1.5] indent-[24pt] text-black">
                I further declare that this dissertation has not been submitted elsewhere for any degree.
              </p>
            </div>

            {/* Signature Strictly Right Aligned */}
            <div className="mt-[35mm] text-right font-serif">
              <div className="h-[12mm]"></div>
              <p className="font-bold text-[12pt] uppercase">{formData.studentName}</p>
              <p className="font-bold text-[12pt]">({formData.rollNo})</p>
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 5: ACKNOWLEDGEMENT PAGE (Heading Center, Body Justified, Signature Right)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="a4-sheet bg-white text-black shadow-2xl border border-slate-200 print:border-none print:shadow-none flex flex-col justify-start page-break font-serif">
            <h2 className="text-center text-[14pt] font-bold uppercase tracking-widest text-black mb-[6mm]">
              ACKNOWLEDGEMENT
            </h2>

            <div className="space-y-[4mm] text-justify text-[12pt] leading-[1.45] text-black">
              <p className="indent-[24pt]">
                The satisfaction that accompanies the successful completion of any task would be incomplete without mentioning the people who made it possible and whose constant guidance and encouragement helped me to complete my work successfully.
              </p>
              <p className="indent-[24pt]">
                I would like to take this opportunity to express my sincere gratitude to {formData.directorName || 'Rev. Fr. Dr. V. Antonysamy SJ.'}, Director of Andhra Loyola Institute of Engineering & Technology, Vijayawada, for allowing me to utilize the college resources and facilities for the successful completion of my project.
              </p>
              <p className="indent-[24pt]">
                I would like to express my sincere gratitude to {formData.hodName || 'Dr. M.CHINNARAO'}, Head of the Department, Information Technology, for his encouragement and support throughout the project and for providing all the required facilities.
              </p>
              <p className="indent-[24pt]">
                In particular, I am very grateful to my Project Guide {formData.guideName}, Department of IT, for the guidance and support given throughout the project. I am thankful for the support and cooperation.
              </p>
              <p className="indent-[24pt]">
                I gratefully acknowledge the support, encouragement and patience of my parents. I would also like to thank all the teaching and non-teaching staff members of the Department of IT, Andhra Loyola Institute of Engineering and Technology, Vijayawada, who supported me during my project and helped me in completing my project entitled "{formData.projectName}".
              </p>
            </div>

            {/* Signature Strictly Right Aligned */}
            <div className="mt-[25mm] text-right font-serif">
              <div className="h-[10mm]"></div>
              <p className="font-bold text-[12pt] uppercase">{formData.studentName}</p>
              <p className="font-bold text-[12pt]">({formData.rollNo})</p>
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 6: INDEX / TABLE OF CONTENTS (Exact Dot Leader Academic Alignment)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="a4-sheet bg-white text-black shadow-2xl border border-slate-200 print:border-none print:shadow-none flex flex-col justify-start page-break font-serif">
            <h2 className="text-center text-[14pt] font-bold uppercase tracking-widest text-black mb-[6mm]">
              INDEX
            </h2>

            {/* Header: CONTENTS on Left, PAGE NO on Right */}
            <div className="flex justify-between items-baseline font-bold text-[12pt] uppercase border-b-2 border-black pb-1 mb-3">
              <span>CONTENTS</span>
              <span>PAGE NO</span>
            </div>

            {/* Dot Leader Rows matching exactly the Word XML */}
            <div className="space-y-[1.8mm] text-[11pt]">
              {chapters.map((c) => {
                const chapterPage = c.id === 1 ? '1' : c.id === 2 ? '4' : c.id === 3 ? '9' : c.id === 4 ? '16' : c.id === 5 ? '21' : c.id === 6 ? '29' : c.id === 7 ? '32' : '33';
                return (
                  <div key={c.id} className="space-y-[1.2mm]">
                    <div className="flex items-baseline w-full font-bold uppercase text-[11.5pt]">
                      <span className="flex-shrink-0 pr-1">{c.id}. {c.title}</span>
                      <span className="flex-grow border-b border-dotted border-black mx-1 h-3"></span>
                      <span className="flex-shrink-0 pl-1 font-mono text-[11pt]">{chapterPage}</span>
                    </div>

                    {c.subsections.map((sub) => {
                      const subPage = sub.number === '1.1' ? '1' : sub.number === '1.2' ? '1' : sub.number === '1.3' ? '2' : sub.number === '1.4' ? '2' : sub.number === '1.5' ? '2' : sub.number === '1.6' ? '2' : sub.number === '1.7' ? '3' : sub.number === '1.8' ? '3' : sub.number === '1.9' ? '3' : sub.number === '2.1' ? '4' : sub.number === '2.2' ? '4' : sub.number === '2.3' ? '5' : sub.number === '2.4' ? '6' : sub.number === '2.5' ? '7' : sub.number === '3.1' ? '9' : sub.number === '3.2' ? '9' : sub.number === '3.3' ? '10' : sub.number === '3.4' ? '11' : sub.number === '3.5' ? '12' : sub.number === '3.6' ? '13' : sub.number === '3.7' ? '13' : sub.number === '3.8' ? '14' : sub.number === '4.1' ? '16' : sub.number === '4.2' ? '16' : sub.number === '4.3' ? '18' : sub.number === '4.4' ? '18' : sub.number === '4.5' ? '19' : sub.number === '4.6' ? '19' : sub.number === '4.7' ? '19' : sub.number === '4.8' ? '20' : sub.number === '4.9' ? '20' : sub.number === '5.1' ? '21' : sub.number === '5.2' ? '23' : sub.number === '5.3' ? '26' : sub.number === '6.1' ? '29' : sub.number === '6.2' ? '29' : sub.number === '6.3' ? '30' : sub.number === '6.4' ? '30' : sub.number === '6.5' ? '30' : sub.number === '7.1' ? '32' : sub.number === '7.2' ? '32' : '33';
                      return (
                        <div key={sub.number} className="flex items-baseline w-full pl-5 text-[11pt]">
                          <span className="flex-shrink-0 pr-1 text-black">{sub.number} {sub.title}</span>
                          <span className="flex-grow border-b border-dotted border-black mx-1 h-3"></span>
                          <span className="flex-shrink-0 pl-1 font-mono text-[10.5pt]">{subPage}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 7: LIST OF FIGURES & LIST OF TABLES (Exact Dot Leader Academic Alignment)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="a4-sheet bg-white text-black shadow-2xl border border-slate-200 print:border-none print:shadow-none flex flex-col justify-start page-break font-serif">
            <h2 className="text-center text-[14pt] font-bold uppercase tracking-widest text-black mb-[4mm]">
              LIST OF FIGURES
            </h2>

            <div className="flex justify-between items-baseline font-bold text-[11.5pt] uppercase border-b border-black pb-1 mb-2">
              <span className="w-[18mm]">S.NO</span>
              <span className="flex-1 px-2">TITLE</span>
              <span className="w-[20mm] text-right">PAGE NO</span>
            </div>

            <div className="space-y-[1.8mm] text-[11pt] mb-[8mm]">
              {listOfFigures.map((fig) => (
                <div key={fig.number} className="flex items-baseline w-full">
                  <span className="w-[18mm] flex-shrink-0 font-medium">{fig.number}.</span>
                  <span className="flex-shrink-0 pr-1">{fig.title}</span>
                  <span className="flex-grow border-b border-dotted border-black mx-1 h-3"></span>
                  <span className="w-[20mm] flex-shrink-0 text-right font-mono text-[10.5pt]">{fig.pageNo}</span>
                </div>
              ))}
            </div>

            <h2 className="text-center text-[14pt] font-bold uppercase tracking-widest text-black my-[4mm]">
              LIST OF TABLES
            </h2>

            <div className="flex justify-between items-baseline font-bold text-[11.5pt] uppercase border-b border-black pb-1 mb-2">
              <span className="w-[24mm]">TABLE NO</span>
              <span className="flex-1 px-2">TITLE</span>
              <span className="w-[20mm] text-right">PAGE NO</span>
            </div>

            <div className="space-y-[1.8mm] text-[11pt]">
              {listOfTables.map((tbl) => (
                <div key={tbl.number} className="flex items-baseline w-full">
                  <span className="w-[24mm] flex-shrink-0 font-medium">{tbl.number}</span>
                  <span className="flex-shrink-0 pr-1">{tbl.title}</span>
                  <span className="flex-grow border-b border-dotted border-black mx-1 h-3"></span>
                  <span className="w-[20mm] flex-shrink-0 text-right font-mono text-[10.5pt]">{tbl.pageNo}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE 8: ABSTRACT (Heading Center, Body Justified)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'prelim') && (
          <div className="a4-sheet bg-white text-black shadow-2xl border border-slate-200 print:border-none print:shadow-none flex flex-col justify-start page-break font-serif">
            <h2 className="text-center text-[14pt] font-bold uppercase tracking-widest text-black mb-[6mm]">
              ABSTRACT
            </h2>
            <div className="text-justify text-[12pt] leading-[1.5] space-y-[4mm] indent-[24pt] text-black">
              {abstract.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            CHAPTERS 1 TO 8 (Exact Headings Center, Subsections Left Bold, Body Justified)
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'chapters') && (
          <div className="w-full flex flex-col items-center space-y-8 print:space-y-0">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="a4-sheet bg-white text-black shadow-2xl border border-slate-200 print:border-none print:shadow-none flex flex-col justify-start page-break font-serif"
              >
                {/* Centered Chapter Heading matching the original docx */}
                <h2 className="text-center text-[14pt] font-bold uppercase tracking-wider text-black mb-[6mm]">
                  {chapter.id}. {chapter.title}
                </h2>

                {/* Subsections */}
                <div className="space-y-[5mm]">
                  {chapter.subsections.map((sub) => (
                    <div key={sub.number} className="space-y-[2.5mm]">
                      {/* Left-Aligned Subsection Heading */}
                      <h3 className="text-left text-[12pt] font-bold uppercase text-black">
                        {sub.number} {sub.title}
                      </h3>

                      {/* Justified Paragraphs with 24pt indent */}
                      <div className="text-justify text-[12pt] leading-[1.45] text-black space-y-[2.5mm]">
                        {sub.content.map((p, i) => (
                          <p key={i} className="indent-[24pt]">{p}</p>
                        ))}
                      </div>

                      {/* Tables matching exact format */}
                      {sub.table && (
                        <div className="my-[4mm]">
                          <p className="text-[11pt] font-bold text-black mb-1 text-left">
                            Table {sub.number}: {sub.table.caption}
                          </p>
                          <table className="w-full text-[10pt] border-collapse border border-black">
                            <thead>
                              <tr className="bg-slate-100 border-b border-black font-bold">
                                {sub.table.headers.map((h, hi) => (
                                  <th key={hi} className="border border-black px-2 py-1.5 text-center">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sub.table.rows.map((r, ri) => (
                                <tr key={ri} className="border-b border-black">
                                  {r.map((cell, ci) => (
                                    <td key={ci} className={`border border-black px-2 py-1.5 ${ci === 0 ? 'text-center font-medium' : 'text-left'}`}>
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Code Listing */}
                      {sub.codeListing && (
                        <div className="my-[4mm] bg-slate-50 text-black p-3 rounded font-mono text-[9.5pt] border border-slate-300">
                          <div className="font-bold pb-1 mb-1 border-b border-slate-300">
                            {sub.codeListing.caption}
                          </div>
                          <pre className="whitespace-pre overflow-x-auto leading-tight">{sub.codeListing.code}</pre>
                        </div>
                      )}

                      {/* Blueprint & Architecture Diagrams (Centered with exact captions) */}
                      {sub.figure && (
                        <div className="my-[5mm] text-center">
                          {sub.figure.imageSrc && (
                            <div className="flex justify-center mb-2">
                              <img
                                src={sub.figure.imageSrc}
                                alt={sub.figure.caption}
                                className="max-w-[90%] max-h-[380px] object-contain rounded border border-slate-300 shadow-sm"
                              />
                            </div>
                          )}
                          <p className="text-[11pt] font-bold text-black text-center font-serif">
                            {sub.figure.caption}
                          </p>
                          <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] font-serif max-w-[150mm] mx-auto mt-1">
                            Description: {sub.figure.description}
                          </p>
                        </div>
                      )}

                      {/* In Chapter 5: Output Screens */}
                      {chapter.id === 5 && sub.number === '5.1' && (
                        <div className="space-y-[5mm] pt-2">
                          <div className="text-center">
                            <img src={relativeFigures[5].imageSrc} alt="Figure 5" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[5].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[5].description}</p>
                          </div>
                          <div className="text-center">
                            <img src={relativeFigures[6].imageSrc} alt="Figure 6" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[6].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[6].description}</p>
                          </div>
                          <div className="text-center">
                            <img src={relativeFigures[7].imageSrc} alt="Figure 7" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[7].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[7].description}</p>
                          </div>
                          <div className="text-center">
                            <img src={relativeFigures[8].imageSrc} alt="Figure 8" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[8].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[8].description}</p>
                          </div>
                        </div>
                      )}

                      {chapter.id === 5 && sub.number === '5.2' && (
                        <div className="space-y-[5mm] pt-2">
                          <div className="text-center">
                            <img src={relativeFigures[9].imageSrc} alt="Figure 9" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[9].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[9].description}</p>
                          </div>
                          <div className="text-center">
                            <img src={relativeFigures[10].imageSrc} alt="Figure 10" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[10].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[10].description}</p>
                          </div>
                          <div className="text-center">
                            <img src={relativeFigures[11].imageSrc} alt="Figure 11" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[11].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[11].description}</p>
                          </div>
                          <div className="text-center">
                            <img src={relativeFigures[12].imageSrc} alt="Figure 12" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[12].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[12].description}</p>
                          </div>
                          <div className="text-center">
                            <img src={relativeFigures[13].imageSrc} alt="Figure 13" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[13].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[13].description}</p>
                          </div>
                          <div className="text-center">
                            <img src={relativeFigures[14].imageSrc} alt="Figure 14" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[14].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[14].description}</p>
                          </div>
                        </div>
                      )}

                      {chapter.id === 5 && sub.number === '5.3' && (
                        <div className="space-y-[5mm] pt-2">
                          <div className="text-center">
                            <img src={relativeFigures[15].imageSrc} alt="Figure 15" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[15].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[15].description}</p>
                          </div>
                          <div className="text-center">
                            <img src={relativeFigures[16].imageSrc} alt="Figure 16" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[16].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[16].description}</p>
                          </div>
                          <div className="text-center">
                            <img src={relativeFigures[17].imageSrc} alt="Figure 17" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[17].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[17].description}</p>
                          </div>
                          <div className="text-center">
                            <img src={relativeFigures[18].imageSrc} alt="Figure 18" className="max-w-[85%] mx-auto rounded border border-slate-300 shadow-sm" />
                            <p className="text-[11pt] font-bold text-black mt-2 font-serif">{relativeFigures[18].caption}</p>
                            <p className="text-[10pt] text-slate-700 italic text-justify indent-[24pt] max-w-[150mm] mx-auto mt-1">Description: {relativeFigures[18].description}</p>
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
