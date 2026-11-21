import { GeneratedReport } from '../types';
import { COLLEGE_LOGO_BASE64 } from '../assets/reportImages';

export function exportReportToWord(report: GeneratedReport) {
  const { formData, abstract, acknowledgement, declaration, certificateText, chapters, listOfFigures, listOfTables } = report;
  const title = formData.projectName.toUpperCase();
  const student = formData.studentName.toUpperCase();
  const roll = formData.rollNo.toUpperCase();
  const guide = formData.guideName.toUpperCase();
  const year = formData.academicYear || '2026-2027';

  let htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${formData.projectName} - Project Report</title>
<style>
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #000;
  }
  h1 { font-size: 16pt; font-weight: bold; text-align: center; margin-top: 24pt; margin-bottom: 12pt; text-transform: uppercase; }
  h2 { font-size: 14pt; font-weight: bold; margin-top: 18pt; margin-bottom: 8pt; }
  h3 { font-size: 12pt; font-weight: bold; margin-top: 12pt; margin-bottom: 6pt; }
  p { text-align: justify; margin-bottom: 8pt; text-indent: 24pt; }
  .no-indent { text-indent: 0; }
  .center { text-align: center; }
  .page-break { page-break-before: always; }
  table { width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 12pt; }
  th, td { border: 1px solid #000; padding: 6pt 8pt; font-size: 10.5pt; }
  th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
  .code-block { font-family: 'Courier New', monospace; font-size: 9.5pt; background: #f8f9fa; border: 1px solid #ccc; padding: 8pt; white-space: pre-wrap; margin: 10pt 0; }
  .sig-table { width: 100%; border: none; margin-top: 60pt; }
  .sig-table td { border: none; text-align: center; font-weight: bold; padding: 12pt; }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="center">
  <br/>
  <h1><b>${title}</b></h1>
  <p class="center no-indent" style="font-size: 11pt; margin-top: 20pt;">
    An Industrial Internship Report submitted in partial fulfillment of the academic requirements for the award of the degree of
  </p>
  <p class="center no-indent" style="font-size: 13pt; font-weight: bold; margin-top: 10pt;">
    BACHELOR OF TECHNOLOGY<br/>IN<br/>INFORMATION TECHNOLOGY
  </p>
  <p class="center no-indent" style="margin-top: 16pt;">
    <b>BY</b><br/>
    <b>${student} (${roll})</b>
  </p>
  <p class="center no-indent" style="margin-top: 14pt;">
    <b>Under the Guidance of</b><br/>
    <b>${guide}</b>
  </p>
  <div style="margin: 20pt 0;">
    <img src="${COLLEGE_LOGO_BASE64}" width="140" height="140" alt="ALIET College Logo" />
  </div>
  <p class="center no-indent" style="font-weight: bold; font-size: 12pt; line-height: 1.4;">
    DEPARTMENT OF INFORMATION TECHNOLOGY<br/>
    ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY<br/>
    <span style="font-size: 10pt; font-weight: normal;">(Approved By AICTE, Affiliated to JNTUK)</span><br/>
    <span style="font-size: 10pt; font-weight: normal;">Accredited by NAAC at "A+" and NBA (ECE, EEE, CSE, IT) | An ISO 9001:2015 Certified Institution</span><br/>
    Vijayawada - 520008<br/>
    ${year}
  </p>
</div>

<div class="page-break"></div>

<!-- CERTIFICATE -->
<div class="center">
  <p class="center no-indent" style="font-size: 12pt; font-weight: bold;">
    ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY<br/>
    <span style="font-size: 9.5pt; font-weight: normal;">(Approved By AICTE, Affiliated to JNTUK) Accredited by NAAC at "A+" and NBA (ECE, EEE, CSE, IT)<br/>An ISO 9001 : 2015 Certified Institution</span>
  </p>
  <div style="margin: 12pt 0;">
    <img src="${COLLEGE_LOGO_BASE64}" width="100" height="100" alt="ALIET College Logo" />
  </div>
  <h2 class="center"><b>CERTIFICATE</b></h2>
</div>
<p style="margin-top: 18pt;">${certificateText}</p>
<table class="sig-table">
  <tr>
    <td>${guide}<br/><span style="font-weight: normal;">Internship Guide</span></td>
    <td>${formData.hodName || 'Dr. M.CHINNARAO'}<br/><span style="font-weight: normal;">Head Of The Department</span></td>
    <td>EXTERNAL EXAMINER</td>
  </tr>
</table>

<div class="page-break"></div>

<!-- MANDATORY INTERNSHIP CERTIFICATE PICTURE -->
<div class="center">
  <h2><b>INTERNSHIP CERTIFICATE</b></h2>
  <br/>
  ${formData.certificateImage ? `
    <img src="${formData.certificateImage}" style="max-width: 620px; max-height: 820px;" alt="Scanned Internship Certificate" />
  ` : `
    <p class="center no-indent">[ Scanned internship certificate picture ]</p>
  `}
</div>

<div class="page-break"></div>

<!-- DECLARATION -->
<h2 class="center"><b>DECLARATION</b></h2>
<p style="margin-top: 18pt;">${declaration}</p>
<br/><br/><br/>
<p style="text-align: right;" class="no-indent">
  <b>${student}</b><br/>
  (${roll})
</p>

<div class="page-break"></div>

<!-- ACKNOWLEDGEMENT -->
<h2 class="center"><b>ACKNOWLEDGEMENT</b></h2>
${acknowledgement.split('\n\n').map(p => `<p>${p}</p>`).join('')}
<br/><br/>
<p style="text-align: right;" class="no-indent">
  <b>${student}</b><br/>
  (${roll})
</p>

<div class="page-break"></div>

<!-- ABSTRACT -->
<h2 class="center"><b>ABSTRACT</b></h2>
<p style="margin-top: 18pt;">${abstract}</p>

<div class="page-break"></div>

<!-- LIST OF FIGURES & TABLES -->
<h2><b>LIST OF FIGURES</b></h2>
<table>
  <tr><th>S.NO</th><th>TITLE</th><th>PAGE NO</th></tr>
  ${listOfFigures.map(f => `<tr><td class="center">${f.number}</td><td>${f.title}</td><td class="center">${f.pageNo}</td></tr>`).join('')}
</table>

<br/>
<h2><b>LIST OF TABLES</b></h2>
<table>
  <tr><th>TABLE NO</th><th>TITLE</th><th>PAGE NO</th></tr>
  ${listOfTables.map(t => `<tr><td class="center">${t.number}</td><td>${t.title}</td><td class="center">${t.pageNo}</td></tr>`).join('')}
</table>

<div class="page-break"></div>

<!-- CHAPTERS -->
${chapters.map(c => `
  <h1><b>${c.id}. ${c.title}</b></h1>
  ${c.subsections.map(sub => `
    <h2><b>${sub.number} ${sub.title}</b></h2>
    ${sub.content.map(p => `<p>${p}</p>`).join('')}
    ${sub.table ? `
      <table>
        <caption><b>Table ${sub.number}: ${sub.table.caption}</b></caption>
        <tr>${sub.table.headers.map(h => `<th>${h}</th>`).join('')}</tr>
        ${sub.table.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
      </table>
    ` : ''}
    ${sub.codeListing ? `
      <div class="code-block">
        <b>${sub.codeListing.caption}</b><br/>
        ${sub.codeListing.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </div>
    ` : ''}
    ${sub.figure ? `
      <div class="center" style="margin: 18pt 0;">
        <p class="no-indent"><b>${sub.figure.caption}</b></p>
        <p class="no-indent" style="font-size: 10pt; color: #555;"><i>Description: ${sub.figure.description}</i></p>
      </div>
    ` : ''}
  `).join('')}
  <div class="page-break"></div>
`).join('')}

</body>
</html>
`;

  const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${formData.studentName.replace(/\s+/g, '_')}_${formData.rollNo}_Project_Report.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
