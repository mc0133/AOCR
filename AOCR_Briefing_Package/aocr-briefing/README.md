# AOCR Archive Review

Prepared for the October 21, 2026 interface-prototype briefing. This package demonstrates the archive review workflow using supplied historical scans and illustrative OCR excerpts. Live OCR and backend integration are pending.

## Start the demo

1. Extract this ZIP to a normal folder.
2. With Node.js available, open a terminal in the `prototype` folder.
3. Run `node server.mjs` (or `npm start`). No package installation is required.
4. Open **http://127.0.0.1:4173** in a browser. Keep the terminal open. Press Ctrl+C to stop it.

The server listens only on your computer. Use the same URL and browser to retain edits. If port 4173 is busy, stop the previous copy. No Python, PaddleOCR, PostgreSQL, credentials, or cloud account is required for this demonstration.

## Three-minute demonstration

1. Start from the two-document collection. Search **graduate**, then clear the search. Filter from September 1, 1966 to show only the November issue; clear filters.
2. Open the August 17 issue. Switch between **Scan** and **Text**, then return to Scan. Open the original PDF if useful.
3. In the first excerpt, compare **Fali Term** with the scan's **Fall Term**. Choose **Use suggestion**, then **Save changes**. The seeded error and confidence are illustrative.
4. Expand Revision history to show the saved correction. Original sample text remains available. Mark sample excerpts reviewed after checking both excerpts.
5. Return to the collection and search **Fall Term** to show that saved corrections are searchable. Reload the page to demonstrate persistence.
6. Choose **Add a PDF** and use `prototype/assets/Univala_19660817_001.pdf`. Enter a title and source. Show its local preview and the explicit pending-backend message.
7. Open Demo controls and reset before a fresh presentation. Reset removes local edits and document records.

## What works now

- Keyword search of current excerpt text, titles, source, location, and tags.
- Publication-date range, source, and location filtering, with empty results feedback.
- Original PDFs and all four scanned pages of each provided sample.
- Scan/text switching; manual text correction; suggestion acceptance or rejection; original text retention; browser-local revision history; review completion for sample excerpts.
- Metadata editing; local PDF validation and preview; corrected-excerpt text download.
- Browser persistence of metadata and edits; responsive layout and labeled keyboard-operable controls.

## Current boundary

OCR text is manually seeded from short first-page headings; the intentional typo, confidence scores, and suggestion are demo data. No OCR model ran. No full transcription or OCR accuracy claim is included. Locally added PDF bytes stay in memory and must be reselected after reload; their metadata remains in browser storage. The PDF page count for new files is unknown until backend processing. The server serves static files only. There is no real upload API, account/authentication, PostgreSQL, multi-user audit trail, OCR job execution, context engine, coordinate overlay, or global search index yet. Browser storage may be cleared or unavailable and is not an authoritative archive.

## Package map

- `prototype/`: runnable HTML/CSS/JavaScript demo and Node static server.
- `prototype/assets/`: two supplied historical PDFs and generated page previews.
- `handoff/API_CONTRACT.md`: proposed FastAPI interface, ownership, errors, and integration acceptance criteria.
- `handoff/sample-page.json`: stable page/block model with explicit illustrative data labeling.
- `handoff/BRIEFING_NOTES.md`: frontend update, demonstration script, decisions, and next sprint.
- `handoff/TEST_RESULTS.md`: checks actually performed and remaining verification work.
- `handoff/SOURCE_NOTES.md`: provenance and summer-work interpretation.

The DOCX briefing guide is supplied separately. Rehearse the demonstration before the meeting and present the current implementation status described above.

## Presenting in class

Before class, extract the package on the presentation laptop and rehearse using the browser you will use in the meeting. The supplied app and sample files run locally once Node.js is installed; an internet connection is unnecessary for the demonstration.

1. Open a terminal in the extracted `aocr-briefing` folder and run `bash start-demo.sh`.
2. Open http://127.0.0.1:4173 in your browser. Leave the terminal running.
3. Under Demo controls, reset the sample data if you want the correction example restored. This removes local edits and added document records.
4. Connect your laptop to the classroom display, or share the browser window in the meeting software. Increase browser zoom as needed for readability.
5. Follow the three-minute demonstration above. Introduce it as the archive review interface using sample OCR data.
6. Explain that the next integration step connects upload, processing status, extracted text and correction storage to the team API.
7. Press Ctrl+C in Terminal when the presentation is finished.

The localhost address opens the app on the computer running Node. For a classroom computer, copy the extracted folder there and confirm Node.js is installed before class. Keep the original PDF available as a fallback if the live app cannot be displayed.
