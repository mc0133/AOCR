# Evidence and provenance

| Supplied material | How it informed this package |
|---|---|
| Correspondence screenshot, October 15–16 | Requests frontend/backend alignment on PDF upload and viewing, keyword and metadata search, correction saving, document/page JSON, status and suggestions. Maggie expresses a likely Node.js choice; FastAPI/PostgreSQL are proposed. |
| AOCR_Project_Management_Plan_Updated.docx | Assigns Maggie frontend/upload/metadata/scan-text/corrections/usability and Michael as reviewer; sets October 20 interface milestone before October 21 briefing, October 27 search milestone, November 3 core integration milestone. |
| OCR Research Overview.pptx | Historical page challenges include columns, fonts, fading, spacing and character ambiguity; motivates scan comparison and human correction. |
| paddle_ocr_test.py | Local image test using PaddleOCR; prints first text/score entry per result. It is not a document service, persistence layer, or complete UI contract. The backend should preserve full OCR segment output. |
| Complex Layout Project ZIP | Supplies original four-page Univala PDFs and layout experiments. Its guide uses Tesseract for layout prototyping; this does not establish a team-wide OCR engine decision. export_layout.py uses corner coordinates, while VIA/COCO uses width/height. |
| Training PaddleOCR.docx and Summer Tasks Overview.docx | Describe prior exploration/training and historical scan difficulties; used as background, not evidence of current model performance. |
| Tested Results files | Historical test output. No new accuracy, timing or training claims are inferred. The two Part 4 uploads have identical content. |
| Inventory screenshot | Shows additional original/training datasets, Useful_Resources.docx and Task One_ Literature Review.docx. These are not prerequisites for the frontend briefing prototype. |

## Included sample assets

Original PDFs come from `Complex Layout Project/_data/pdfs/Univala_19660817_001.pdf` and `Univala_19661109_001.pdf` in the user's supplied ZIP. Their four-page PNG previews were generated locally for this demo. Publication dates and Huntsville location appear on the source scans. “Summer intern sample collection” identifies the supplied collection, not a verified archival repository name. Original archive URLs and reuse terms were not supplied; establish provenance before public distribution.

The demo's short first-page headings are manually seeded excerpts. “Fali” is an intentionally introduced error to illustrate correction to “Fall”; it is not attributed to a measured OCR run. Confidence numbers and the correction suggestion are illustrative. Other page images are available, with explicit no-demo-transcription messages.

The console script and supplied guides were read, not executed to train or benchmark OCR. Older installation instructions have not been adopted as current environment requirements.

## Additional material needed later

For live integration: Nathan's backend repository or endpoint/base URL, actual document/page/job JSON, authentication approach, and an agreed representative output from Michael's OCR pipeline. The large training archives are unnecessary for this frontend milestone. Useful_Resources and the literature review may help future research/provenance, but do not block this package.
