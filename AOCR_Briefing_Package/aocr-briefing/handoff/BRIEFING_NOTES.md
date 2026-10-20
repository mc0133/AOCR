# Maggie's frontend briefing notes

**Meeting:** October 21, 2026. **Internal milestone:** October 20. The supplied class schedule calls this Briefing #2; this is Maggie's first frontend demonstration package.

## Contribution ready for review

The local frontend prototype covers PDF selection and preview, metadata entry/editing, keyword and metadata search, scan/text comparison, editable excerpts, suggestion decisions, and saved browser-local corrections. The package includes a proposed document/page/block/job API contract and a sample JSON response. These artifacts are ready for team review; backend integration, full OCR, and team acceptance remain pending.

## Suggested spoken update

“My part is the frontend workflow for uploading documents, finding them, and reviewing OCR text. The prototype uses JavaScript with Node.js serving the app locally. It includes two PDFs from the summer layout project so we can review the interface with actual scanned material.

“I can search and filter the collection, open the scan and text views, edit document metadata, and save a correction while keeping the original text and a revision history. I’ll show the sample ‘Fali’ to ‘Fall’ correction. The text excerpts, confidence values, and suggestion are demo data; live OCR will come from the backend.

“I also prepared a proposed API contract for upload, processing status, page data, search, and correction saving. The next step is to agree on that format with Nathan and use a real OCR response from Michael to connect the interface. For the next sprint, I’m targeting a connected sample document and verified search and correction behavior, with any unavailable endpoints recorded as blockers.”

Use this after running the demo locally. Describe the artifact as prepared for review; do not claim production readiness, completed OCR training, or prior team approval.

## Short live walkthrough

1. Search “graduate”; clear it. Apply a September 1, 1966 start date; clear filters.
2. Open August 17, switch Scan/Text, and show the original PDF.
3. Compare the first excerpt to the scan. Use the suggestion, save changes, and open revision history.
4. Mark sample excerpts reviewed after checking both excerpts. Search “Fall Term” from the collection.
5. Add a supplied PDF with title/source and show the local preview plus pending-backend status.
6. End with the API handoff and the three decisions below.

## Decisions to get from the team

- Confirm vanilla JavaScript/Node for the frontend prototype and FastAPI as the proposed API service. Decide authentication and deployment origin with Nathan/Olivia.
- Confirm document/page/block IDs, coordinates, confidence/null values, suggestion fields and revision-conflict behavior. Request one representative full OCR response from Michael and the backend endpoint/base URL from Nathan.
- Confirm the first integrated acceptance test: upload → authentic job status → scan/text → human correction → persisted correction → search. Agree owner and due date for any blocked endpoint.

## Proposed next sprint and tracking

| Due | Maggie's deliverable | Done when | Dependency / reviewer |
|---|---|---|---|
| Oct 20 before Oct 21 briefing | Local interface prototype and handoff | Demo package and API proposal ready; limitations stated | Maggie runs the demo; Michael reviews scan/text workflow |
| Oct 27 before Oct 28 briefing | Search/filter and API connection pass | One real backend document loads if endpoint available; search finds its corrected text and metadata; failed saves preserve drafts | Nathan endpoint; Michael OCR sample |
| Nov 3 before Nov 4 briefing | Integrated frontend core workflow | Agreed end-to-end upload, status, view, correction, persistence and search test passes | Backend/OCR readiness; Michael review |
| Before assigned design review | Usability fixes and guide update | Feedback recorded and resolved or prioritized; accessible controls checked; demo script current | Team feedback and assigned presentation date |
| Dec 1 internal proof of concept target | Frontend evidence for team demonstration | Repeatable core workflow, evidence and remaining limits included in team proof of concept | Team acceptance criteria and integration |

Track these as backlog items with owner, reviewer, due date, acceptance criteria, blocked reason and evidence link. Use Ready → In progress → Review → Done. A feature is Done only after its acceptance check passes and a teammate reviews it. Keep a short Tuesday evidence snapshot for Wednesday reporting; track accepted tasks/committed tasks, open blocking defects, and elapsed blocker age. Do not report percentage complete from unfinished task counts or equate the local prototype with integration completion. Retain fixed reporting and proof-of-concept dates while reprioritizing weekly work.

## Maggie's remaining personal actions

- Extract the package, start it with `node server.mjs`, and rehearse the walkthrough on your own machine.
- Read the API proposal, choose the questions that need team answers, and bring them to the meeting. No message has been sent on your behalf.
- Ask Michael to review one correction/scan comparison and Nathan to confirm the JSON response. Log their feedback before marking the prototype accepted.
- The large missing training archives are unnecessary for this briefing. The actual backend and OCR response are the useful next inputs for integration.
