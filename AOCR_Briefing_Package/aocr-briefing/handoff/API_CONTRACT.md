# Frontend ↔ backend handoff — proposed contract v0.1

Prepared for Maggie Coonfare and Nathan, October 20, 2026. This proposal responds to the October 15–16 correspondence about PDF upload/viewing, search and metadata filters, corrections, document/page JSON, processing status, and OCR suggestions. The message proposes Python FastAPI and PostgreSQL. Their implementation and endpoint availability have not been verified. The shipped Node process serves the frontend only.

## Integration decision

Use plain browser JavaScript for this prototype, served with Node.js during development. Node.js is the runtime/tooling choice; it does not require a second production application backend. A future `api-client.js` should replace local data operations with `fetch` calls to FastAPI. Keep one base URL configuration. Agree same-origin deployment or an explicit CORS allowlist. Authentication, reviewer permissions, and credential transport need the backend/security team decision before deployment.

## Endpoints to agree

| Method / path | Request | Response / UI behavior |
|---|---|---|
| POST `/api/documents` | Multipart `file` plus `metadata` JSON string: title, publication_date, source, location, tags | 202 `{document,job}`; start polling job. Frontend does not claim processing completed. |
| GET `/api/documents` | `q`, `date_from`, `date_to`, `source`, `location`, `tag`, `page`, `page_size` | 200 `{items,total,page,page_size}`; results use saved current text plus metadata. |
| GET `/api/documents/{document_id}` | Stable document ID | 200 document metadata, revision, page count and ordered page summaries. |
| GET `/api/documents/{document_id}/original` | Authorized document ID | Original `application/pdf`; support browser viewing and authorized access. |
| GET `/api/documents/{document_id}/pages/{page_id}` | Stable page ID | 200 page, blocks, suggestions; see sample-page.json. |
| GET `/api/documents/{document_id}/pages/{page_id}/image` | Page ID | Rendered scan; dimensions match coordinate space. |
| GET `/api/jobs/{job_id}` | Job ID | 200 `{id,document_id,status,pages_completed,pages_total,error}`. |
| POST `/api/documents/{document_id}/jobs` | Request to retry a failed job | 202 new job; prevent duplicate active jobs. Retry is a user action. |
| PATCH `/api/documents/{document_id}` | `{expected_revision,metadata:{...}}` | 200 updated document; 409 if stale. Validate editable fields. |
| PATCH `/api/documents/{document_id}/pages/{page_id}/blocks/{block_id}` | `{expected_revision,corrected_text,suggestion_decisions:[{id,resolution}]}` | 200 updated block and revision; server records authenticated author, time and old/new text. |
| PATCH `/api/documents/{document_id}/pages/{page_id}/review` | `{expected_revision,review_status:"reviewed"}` | 200 page review state; require all outstanding suggestions resolved and all required text reviewed. |

`page` in collection requests is pagination, starting at 1; page numbering inside a document is `page_number`, also starting at 1. Default page size 20, proposed maximum 100. An omitted filter applies no restriction. Dates use ISO `YYYY-MM-DD`; date bounds are inclusive. Null dates do not match bounded date queries. Text matching is case-insensitive; `q` searches corrected text when it exists, otherwise original text. Search behavior across partial words/phrases and ranking must be agreed before implementation. The prototype uses simple substring matching.

## Data rules

- Document: opaque stable ID; title; publication_date (nullable); source; location; tags array; original filename; MIME type; byte size; page_count (nullable until known); processing_status; review_status; revision; created_at/updated_at UTC timestamps.
- Page: opaque stable ID, document_id, page_number, image URL, image_width_px, image_height_px, rotation_degrees, revision, review_status, ordered `blocks` array. IDs remain stable across edits; agree behavior for OCR reruns before reruns are enabled.
- Block: stable ID, reading_order integer, block_type, original_text (immutable OCR result for a run), corrected_text (nullable), engine_confidence (nullable 0–1), bounding_box (nullable), suggestions array, revision. Display corrected_text when non-null. Preserve all OCR segments rather than only array index zero from the summer example script.
- `bounding_box` uses `{x,y,width,height,unit:"image_px",origin:"top_left"}` relative to the stored page image, with page dimensions supplied. The summer export script uses `[x1,y1,x2,y2]`; convert width=x2−x1 and height=y2−y1. VIA/COCO uses width/height already. Validate image dimensions and rotation; never mix PDF points with image pixels.
- Suggestion: stable ID, proposed_text, reason, origin (`ocr_rule` or `context_model`), resolution (`pending`, `accepted`, `rejected`). Preserve the proposed text after a user decision. A context suggestion is advisory; no silent correction. Engine confidence and contextual uncertainty are separate concepts. Nullable confidence displays “unavailable,” never 0%.
- Audit record: server-created event ID, block/page ID, authenticated actor ID, UTC timestamp, old/new values and suggestion decisions. Browser-local demo history is not this authoritative audit trail.
- Distinguish publication date from ingestion timestamp. Never infer an exact publication date silently from a filename. The two demo dates are visible on the supplied scans.

## Processing and review states

Backend processing: `queued → processing → completed` or `failed`. The backend returns actual page counts if known; otherwise return null and display indeterminate progress. Job completion means OCR extraction finished, not human review completed. A scanned PDF with no recognized text can complete with a no-text warning and remain available for manual review. Failures include a safe error message, request ID, and retryability flag.

Review: `pending`, `in_review`, `reviewed`, tracked per page and rolled up by the backend. Editing reviewed text returns the affected review scope to pending. An OCR rerun must not silently overwrite human corrections.

The prototype-only value `awaiting_backend` describes a locally added PDF; do not send it as a production API state. The prototype's “sample excerpts reviewed” action applies only to supplied excerpts and must not be interpreted as full-document review.

## Concurrency, validation, and errors

Use optimistic concurrency with an integer revision for each mutable resource. Every PATCH sends expected_revision; a mismatch returns 409 and current_revision. Preserve the user's draft and offer reload/compare rather than overwriting another reviewer. Never accept reviewer identity or audit timestamps from the browser as authoritative.

The prototype proposes a 25 MiB PDF limit for demonstration; Nathan must confirm the actual service limit. Validate file type, file signature, size, and parseability on the server. Client checks provide early feedback only. Store uploaded files outside public executable locations. Sanitize displayed errors and escape OCR/metadata text. Agree file access, retention, and authorization with Olivia before real deployment.

Use a consistent envelope:

```json
{"error":{"code":"revision_conflict","message":"This text was updated by another reviewer.","request_id":"req-example","retryable":false,"details":{"current_revision":4}}}
```

Handle 400 malformed request, 401 sign-in required, 403 denied, 404 missing resource, 409 revision conflict, 413 size limit, 415 unsupported type, 422 validation/extraction input failure, and 5xx temporary service failure. Preserve drafts on failed saves. A lost connection must never be reported as a successful upload or save. Retry polling with bounded backoff; do not automatically repeat non-idempotent uploads or writes without an agreed idempotency mechanism.

## Suggested integration split and acceptance

| Owner proposed from management plan | Next action / evidence |
|---|---|
| Maggie — frontend | Replace local adapter with agreed API calls; show upload/progress/error states; preserve drafts; confirm keyboard workflow. |
| Nathan — backend | Confirm contract, storage model, authentication and CORS; provide one real document/page response and upload→job→review test path. |
| Michael — OCR/test reviewer | Provide representative full OCR output, coordinates, confidence/null cases and expected reading order; review scan/text fidelity with Maggie. |
| Diana — contextual review | Confirm suggestion fields and accepted/rejected decision behavior for context output. |
| Olivia — security/requirements | Confirm role permissions, PDF limits, access rules and handling of reviewer data. |

For the October 27 internal milestone, demonstrate one agreed backend sample in the UI if the endpoint is ready. Test upload acceptance, authentic processing status, rendered original, ordered extracted text, persisted correction, corrected-text search, and a 409 conflict without lost draft. Record unavailable endpoints as blockers instead of marking integration complete. For November 3, target the integrated core workflow for the next day's briefing. All dates are planning targets, not claims of completion or owner approval.

## Mapping from the local demo model

The prototype keeps a compact local model rather than mimicking a database. At integration, map demo `date` to API `publication_date`, `archive` to `source`, numeric `pages` to `page_count`, and each block's `page` to a stable API page ID plus `page_number`. Map `confidence` to `engine_confidence`, the singular demo suggestion to the API suggestions array, and local history to server-returned audit events. Fetch page content on demand instead of assuming all blocks are embedded in the document. Replace local `file`/`base` asset paths and temporary object URLs with authorized original/image endpoints. Preserve server revisions on each resource instead of the demo's document-level counter.
