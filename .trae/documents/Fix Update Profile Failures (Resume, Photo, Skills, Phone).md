## Why It Fails
- The backend now accepts two file fields (`resume`, `profilePhoto`) and handles them optionally, but if the server isn’t running or the auth cookie isn’t sent, the request fails and the frontend shows the generic "Something went wrong" toast.
- An existing port conflict (`PORT=8000` in .env) can crash the dev server (EADDRINUSE), causing the update call to fail.
- The profile dialog currently appends a string URL in `resume` when no new file is chosen; that is harmless but can confuse expectations since the backend only processes `req.files.resume` for uploads.

## Planned Fixes
1) Frontend FormData hygiene
- In `UpdateProfileDialog.jsx`, only append `resume` if it is a `File` (not a string URL). Only append `profilePhoto` if it is a `File`.
- Keep text fields (`fullname`, `email`, `phoneNumber`, `bio`, `skills`) as-is.

2) Backend resilience & clarity (already mostly done)
- Confirm route uses multi-field upload for `/profile/update` and controllers handle optional files and update metadata even when no files are provided.
- Ensure the centralized error handler returns clear messages for Multer errors and generic failures.

3) Environment and server stability
- Set `CLIENT_URL` in `.env` to the frontend origin (e.g., `http://localhost:5173` or your production domain).
- Ensure only one server instance is running; either change `PORT` or stop any process on that port to avoid EADDRINUSE.
- Verify cookies: login returns `httpOnly` cookie, CORS uses env origin with `credentials: true`.

## Implementation Steps
- Update `frontend/src/components/UpdateProfileDialog.jsx`:
  - Change FormData build to:
    - Append `resume` only if `input.resume instanceof File`.
    - Append `profilePhoto` only if `input.profilePhoto instanceof File`.
  - Leave the existing preview of uploaded resume URL.
- No backend changes necessary beyond already merged fixes.

## Validation
- Open the dialog and update only text fields (skills, phone, bio) with no files: request succeeds and values persist.
- Upload only resume (PDF <10MB): success, URL is returned and stored.
- Upload only photo (image <10MB): success, `profilePhoto` updates.
- Upload both: success and both fields update.
- Confirm `withCredentials: true` is set and cookies are present in the browser.

## Notes
- Resume accepts only `application/pdf`; images accept `image/*`; max size is 10MB.
- If deploying cross-site over HTTPS, set `CLIENT_URL`, and consider `sameSite`/`secure` settings for cookies depending on domain and deployment.

If approved, I will update the frontend FormData logic to only append files when they are selected and verify all flows end-to-end.