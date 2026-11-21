# DK Report Maker (IT Department) 📄✨

> **Official B.Tech Project & Internship Report Generator**  
> Designed strictly according to the **Andhra Loyola Institute of Engineering & Technology (ALIET)**, Department of Information Technology (Affiliated to JNTUK) academic format.

🌐 **Public Live Link:** [https://dhanushkrishna33.github.io/DKreportmaker/](https://dhanushkrishna33.github.io/DKreportmaker/)

---

## 🎯 Overview

**DK Report Maker** allows Information Technology (IT) students to automatically generate a complete, publication-ready, and formatted B.Tech project report. 

Whether you provide your **GitHub repository link** or specify **"no link"**, the application performs a brief domain analysis on the project title and codebase to construct:
- Cover Page with official circular ALIET emblem
- College Certificate with designated signatures (Internship Guide, HOD Dr. M. Chinnarao, External Examiner)
- Scanned Internship Certificate placeholder frame
- Student Declaration & Acknowledgement
- Complete Index (Table of Contents) with page numbers
- List of Figures & List of Tables
- Comprehensive Abstract
- **Full Chapters 1 through 8** (Introduction, System Analysis, Design & Modelling, Implementation with code listings, Results & Output Screens, Testing with 15 functional test cases table, Conclusion & Future Scope, References)

---

## ✨ Features

- **GitHub Repository Analysis**: Automatically parses GitHub public repos (`README.md`, `package.json`, file structures, and dependencies) to customize the technical stack and system architecture.
- **"No Link" Domain Synthesis**: If no GitHub repository exists, enter `no link` (or check the box). The system performs deep domain classification (Web, AI/ML, Cloud, Security, IoT, Data Analytics) to synthesize realistic architecture, data models, formulas, and test cases.
- **Strict Format Compliance**: Designed exclusively for IT students (Roll number verification with branch code `12`).
- **Export to Microsoft Word (.doc)**: One-click download of fully formatted, editable Word documents.
- **Flawless A4 Print & PDF Export**: Pixel-perfect `@media print` styling respecting academic margins, page breaks, table borders, and Roman/Arabic page numbering.
- **Zero Backend / Serverless**: Runs completely in your browser on GitHub Pages.

---

## 🚀 Live Demo & Usage

1. Open [https://dhanushkrishna33.github.io/DKreportmaker/](https://dhanushkrishna33.github.io/DKreportmaker/)
2. Enter your details:
   - **Student Full Name** (e.g. `U.DHANUSH KRISHNA`)
   - **Roll Number** (e.g. `23HP1A1233` - branch code 12)
   - **Project Name** (e.g. `INVESTFLOW – STOCK WATCHLIST AND PORTFOLIO TRACKER`)
   - **Guide Name** (e.g. `VIJAY VAMSI`)
   - **GitHub Repo Link** (or click *"I don't have a link ("no link")"*)
3. Click **"Generate Complete Academic Report"**.
4. Preview the document, click **"Print / Save PDF (A4)"** or **"Download Word (.doc)"**.

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/dhanushkrishna33/DKreportmaker.git
cd DKreportmaker

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## 🏛️ Institution Details

- **College:** Andhra Loyola Institute of Engineering & Technology (Approved by AICTE, Affiliated to JNTUK)
- **Accreditation:** NAAC at "A+" and NBA (ECE, EEE, CSE, IT) • ISO 9001:2015 Certified
- **Department:** Department of Information Technology (IT)
- **Academic Year:** 2026–2027

---

Developed with ❤️ by **Dhanush Krishna** for IT Department students.
