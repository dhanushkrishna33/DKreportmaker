import { GeneratedReport } from '../types';
import JSZip from 'jszip';
import { COLLEGE_LOGO_BASE64 } from '../assets/reportImages';

export async function exportReportToWord(report: GeneratedReport) {
  const { formData, abstract, acknowledgement, declaration, certificateText, chapters, listOfFigures, listOfTables } = report;
  const title = formData.projectName.toUpperCase().trim();
  const student = formData.studentName.toUpperCase().trim();
  const roll = formData.rollNo.toUpperCase().trim();
  const guide = formData.guideName.toUpperCase().trim();
  const year = (formData.academicYear || '2026-2027').trim();

  // Try to load the authentic template.docx and perform direct XML manipulation
  try {
    const templateRes = await fetch('./template.docx');
    if (templateRes.ok) {
      const templateBlob = await templateRes.blob();
      const zip = await JSZip.loadAsync(templateBlob);

      // 1. Modify word/document.xml
      let docXml = await zip.file('word/document.xml')?.async('string');
      if (docXml) {
        // Replace Project Title
        docXml = docXml.replace(/INVESTFLOW[^\n<"]*REACT AND TYPESCRIPT/g, title);
        docXml = docXml.replace(/INVESTFLOW – STOCK WATCHLIST AND PORTFOLIO TRACKER USING REACT AND TYPESCRIPT/g, title);

        // Replace Student Name
        docXml = docXml.replace(/U\.DHANUSH KRISHNA/g, student);
        docXml = docXml.replace(/DHANUSH KRISHNA/g, student);

        // Replace Roll Number
        docXml = docXml.replace(/23HP1A1233/g, roll);

        // Replace Guide Name
        docXml = docXml.replace(/VIJAY VAMSI/g, guide);

        // Replace Academic Year if present
        if (year !== '2026-2027') {
          docXml = docXml.replace(/2026-2027/g, year);
          docXml = docXml.replace(/2026-27/g, year);
        }

        // 2. Insert the student's uploaded certificate image into Page 3
        if (formData.certificateImage && formData.certificateImage.startsWith('data:image/')) {
          const match = formData.certificateImage.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
          if (match) {
            const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
            const base64Data = match[2];
            const imageFilename = `cert_uploaded.${ext}`;

            // Add image file to word/media/
            zip.file(`word/media/${imageFilename}`, base64Data, { base64: true });

            // Add relationship to word/_rels/document.xml.rels
            let relsXml = await zip.file('word/_rels/document.xml.rels')?.async('string');
            if (relsXml && !relsXml.includes('rIdCertUpload')) {
              const relEntry = `<Relationship Id="rIdCertUpload" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${imageFilename}"/>`;
              relsXml = relsXml.replace('</Relationships>', `${relEntry}</Relationships>`);
              zip.file('word/_rels/document.xml.rels', relsXml);
            }

            // Replace the dashed placeholder on the Certificate page with the drawing blip
            const drawingXml = `<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="120" w:after="120"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="5200000" cy="6500000"/><wp:docPr id="999" name="Internship Certificate"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="0" name="Internship Certificate"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:embed="rIdCertUpload"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="5200000" cy="6500000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
            
            docXml = docXml.replace(
              /<w:p>.*?\[ Insert the scanned internship \/ completion certificate here \].*?<\/w:p>/s,
              drawingXml
            );
          }
        }

        zip.file('word/document.xml', docXml);

        const generatedBlob = await zip.generateAsync({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          compression: 'DEFLATE',
        });

        const downloadUrl = URL.createObjectURL(generatedBlob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${student.replace(/\s+/g, '_')}_${roll}_Project_Report.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
        return;
      }
    }
  } catch (err) {
    console.warn('Native docx modification fallback to HTML doc:', err);
  }

  // Fallback to HTML-based Word document if template.docx could not be fetched
  let htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${formData.projectName} - Project Report</title>
<style>
  @page {
    size: 210mm 297mm;
    margin: 25.4mm 25.4mm 25.4mm 25.4mm;
  }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 12pt;
    line-height: 1.45;
    color: #000;
  }
  h1 { font-size: 14pt; font-weight: bold; text-align: center; margin-top: 18pt; margin-bottom: 12pt; text-transform: uppercase; }
  h2 { font-size: 14pt; font-weight: bold; text-align: center; margin-top: 16pt; margin-bottom: 10pt; text-transform: uppercase; }
  h3 { font-size: 12pt; font-weight: bold; text-align: left; margin-top: 12pt; margin-bottom: 4pt; }
  p { text-align: justify; margin-bottom: 8pt; text-indent: 24pt; line-height: 1.45; }
  .no-indent { text-indent: 0; }
  .center { text-align: center; }
  .right { text-align: right; }
  .page-break { page-break-before: always; }
  table { width: 100%; border-collapse: collapse; margin-top: 10pt; margin-bottom: 10pt; }
  th, td { border: 1px solid #000; padding: 5pt 7pt; font-size: 10.5pt; }
  th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
  .code-block { font-family: 'Courier New', monospace; font-size: 9.5pt; background: #f8f9fa; border: 1px solid #ccc; padding: 8pt; white-space: pre-wrap; margin: 10pt 0; }
  .sig-table { width: 100%; border: none; margin-top: 50pt; }
  .sig-table td { border: none; text-align: center; font-weight: bold; padding: 10pt; }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="center">
  <br/>
  <h1><b>${title}</b></h1>
  <p class="center no-indent" style="font-size: 12pt; margin-top: 16pt; margin-bottom: 14pt;">
    An Industrial Internship Report submitted in partial fulfillment of the academic requirements for the award of the degree of
  </p>
  <p class="center no-indent" style="font-size: 12pt; font-weight: bold; margin-bottom: 4pt;">
    BACHELOR OF TECHNOLOGY
  </p>
  <p class="center no-indent" style="font-size: 12pt; font-weight: bold; margin-bottom: 4pt;">
    IN
  </p>
  <p class="center no-indent" style="font-size: 12pt; font-weight: bold; margin-bottom: 14pt;">
    INFORMATION TECHNOLOGY
  </p>
  <p class="center no-indent" style="font-weight: bold; margin-bottom: 6pt;">
    BY
  </p>
  <p class="center no-indent" style="font-weight: bold; margin-bottom: 14pt;">
    ${student} (${roll})
  </p>
  <p class="center no-indent" style="margin-bottom: 4pt;">
    Under the Guidance of
  </p>
  <p class="center no-indent" style="font-weight: bold; margin-bottom: 14pt;">
    ${guide}
  </p>
  <div style="margin: 14pt 0;">
    <img src="${COLLEGE_LOGO_BASE64}" width="125" height="125" alt="ALIET College Logo" />
  </div>
  <p class="center no-indent" style="font-weight: bold; font-size: 12pt; line-height: 1.3;">
    DEPARTMENT OF INFORMATION TECHNOLOGY<br/>
    ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY<br/>
    (Approved By AICTE, Affiliated to JNTUK)<br/>
    Vijayawada-520008<br/>
    ${year}
  </p>
  <p class="center no-indent" style="font-size: 11pt; line-height: 1.3; margin-top: 10pt;">
    ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY<br/>
    (Approved By AICTE, Affiliated to JNTUK) Accredited by<br/>
    NAAC at "A+" and NBA (ECE, EEE, CSE, IT)<br/>
    An ISO 9001 : 2015 Certified Institution
  </p>
</div>

<div class="page-break"></div>

<!-- CERTIFICATE -->
<div class="center">
  <p class="center no-indent" style="font-size: 12pt; font-weight: bold; line-height: 1.3;">
    ANDHRA LOYOLA INSTITUTE OF ENGINEERING & TECHNOLOGY<br/>
    <span style="font-size: 11pt; font-weight: normal;">(Approved By AICTE, Affiliated to JNTUK) Accredited by<br/>NAAC at "A+" and NBA (ECE, EEE, CSE, IT)<br/>An ISO 9001 : 2015 Certified Institution</span>
  </p>
  <div style="margin: 10pt 0;">
    <img src="${COLLEGE_LOGO_BASE64}" width="95" height="95" alt="ALIET College Logo" />
  </div>
  <h2><b>CERTIFICATE</b></h2>
</div>
<p style="margin-top: 14pt;">${certificateText}</p>
<table class="sig-table">
  <tr>
    <td style="text-align: left; width: 50%;">${guide}<br/><span style="font-weight: normal;">Internship Guide</span></td>
    <td style="text-align: right; width: 50%;">${formData.hodName || 'Dr. M.CHINNARAO'}<br/><span style="font-weight: normal;">Head Of The Department</span></td>
  </tr>
</table>
<div class="center" style="margin-top: 50pt;">
  <p class="center no-indent" style="font-weight: bold;">EXTERNAL EXAMINER</p>
</div>

<div class="page-break"></div>

<!-- INTERNSHIP CERTIFICATE -->
<div class="center">
  <h2><b>INTERNSHIP CERTIFICATE</b></h2>
  <div style="margin-top: 16pt;">
    ${formData.certificateImage ? `
      <img src="${formData.certificateImage}" style="max-width: 600px; max-height: 750px;" alt="Scanned Internship Certificate" />
    ` : `
      <p class="center no-indent">[ Scanned internship certificate picture ]</p>
    `}
  </div>
</div>

<div class="page-break"></div>

<!-- DECLARATION -->
<h2><b>DECLARATION</b></h2>
<p style="margin-top: 16pt;">${declaration}</p>
<div style="margin-top: 40pt; text-align: right;">
  <p class="no-indent right"><b>${student}</b><br/>(${roll})</p>
</div>

<div class="page-break"></div>

<!-- ACKNOWLEDGEMENT -->
<h2><b>ACKNOWLEDGEMENT</b></h2>
${acknowledgement.split('\n\n').map(p => `<p>${p}</p>`).join('')}
<div style="margin-top: 30pt; text-align: right;">
  <p class="no-indent right"><b>${student}</b><br/>(${roll})</p>
</div>

<div class="page-break"></div>

<!-- ABSTRACT -->
<h2><b>ABSTRACT</b></h2>
<p style="margin-top: 16pt;">${abstract}</p>

<div class="page-break"></div>

<!-- LIST OF FIGURES & TABLES -->
<h2><b>LIST OF FIGURES</b></h2>
<table>
  <tr><th style="width: 15%;">S.NO</th><th style="text-align: left;">TITLE</th><th style="width: 20%;">PAGE NO</th></tr>
  ${listOfFigures.map(f => `<tr><td class="center">${f.number}</td><td>${f.title}</td><td class="center">${f.pageNo}</td></tr>`).join('')}
</table>

<br/>
<h2><b>LIST OF TABLES</b></h2>
<table>
  <tr><th style="width: 20%;">TABLE NO</th><th style="text-align: left;">TITLE</th><th style="width: 20%;">PAGE NO</th></tr>
  ${listOfTables.map(t => `<tr><td class="center">${t.number}</td><td>${t.title}</td><td class="center">${t.pageNo}</td></tr>`).join('')}
</table>

<div class="page-break"></div>

<!-- CHAPTERS -->
${chapters.map(c => `
  <h2><b>${c.id}. ${c.title}</b></h2>
  ${c.subsections.map(sub => `
    <h3><b>${sub.number} ${sub.title}</b></h3>
    ${sub.content.map(p => `<p>${p}</p>`).join('')}
    ${sub.table ? `
      <table>
        <caption style="font-weight: bold; text-align: left; margin-bottom: 4pt;">Table ${sub.number}: ${sub.table.caption}</caption>
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
      <div class="center" style="margin: 16pt 0;">
        ${sub.figure.imageSrc ? `
          <img src="${sub.figure.imageSrc}" style="max-width: 580px; max-height: 340px;" alt="${sub.figure.caption}" /><br/>
        ` : ''}
        <p class="no-indent center" style="margin-top: 6pt;"><b>${sub.figure.caption}</b></p>
        <p class="no-indent center" style="font-size: 10pt; color: #555;"><i>Description: ${sub.figure.description}</i></p>
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
  a.download = `${student.replace(/\s+/g, '_')}_${roll}_Project_Report.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
