## Remaining Problem
- The backend now supports multi-file updates and metadata-only changes, but the frontend `UpdateProfileDialog` still appends `resume` even when it’s a string URL and may append `profilePhoto` when it’s not a File. The backend only processes files from `req.files`, so this causes the request to be malformed and can produce the generic "Something went wrong" toast.
- If the dev server is not actually running or another process is occupying the configured `PORT`, calls to `/profile/update` fail entirely.

## Changes to Implement (Frontend)
1) Update FormData building in `frontend/src/components/UpdateProfileDialog.jsx`:
- Append `resume` only when `input.resume instanceof File`.
- Append `profilePhoto` only when `input.profilePhoto instanceof File`.
- Keep appending text fields: `fullname`, `email`, `phoneNumber`, `bio`, `skills`.
- Optional: remove the manual `Content-Type: 'multipart/form-data'` header and let Axios set boundary automatically (both work, but letting Axios set it prevents boundary mismatches).

## Server Checks
- Ensure the backend is running and not crashing due to port conflict; stop any other process using `PORT` or change `PORT` in `.env`.
- Confirm `CLIENT_URL` in `.env` matches your frontend (e.g., `http://localhost:5173`) so cookies are accepted.

## Validation Steps
- Update only `skills` and `phoneNumber` with no files selected → succeeds and persists.
- Upload only resume (PDF <10MB) → Cloudinary `secure_url` stored in `profile.resume`.
- Upload only photo (image <10MB) → `profile.profilePhoto` updates.
- Upload both resume and photo → both fields update.
- If an error occurs, the server returns a specific message (e.g., unsupported file type or too large), which should appear in the toast.

## Deliverables
- Frontend patch to `UpdateProfileDialog.jsx` to guard file appends.
- Quick run-through to verify the four flows above and confirm cookies/CORS behave correctly.

If approved, I will update the frontend FormData logic and verify the end-to-end behavior immediately.