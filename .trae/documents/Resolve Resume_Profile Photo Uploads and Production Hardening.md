## Issues Identified
- Field name mismatch on profile updates: backend expects `req.file` via `multer.single('file')`, while frontend sends `resume` and `profilePhoto` (`frontend/src/components/UpdateProfileDialog.jsx:65-70`). This leaves `req.file` undefined and causes Cloudinary errors in `updateProfile` (`backend/controllers/user.controller.js:195-201`).
- `updateProfile` never handles `profilePhoto` and assumes a file is always present (`backend/controllers/user.controller.js:195-227`).
- `updateCompany` unconditionally uploads a logo and fails when no file is provided (`backend/controllers/company.controller.js:83-92`).
- No MIME/size validation; unsupported files may reach Cloudinary. 
- Production settings: hardcoded CORS origin (`backend/index.js:25-29`); an incorrect cookie option (`httpsOnly`) in login (`backend/controllers/user.controller.js:164-168`).

## Planned Fixes
1) Multer multi-field support and validation
- Add `fileFilter` to accept only `image/*` and `application/pdf`.
- Add reasonable file size limits (e.g., 8MB for images, 10MB for resumes).
- Export `uploadProfileFields = multer({ storage, fileFilter, limits }).fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePhoto', maxCount: 1 }])`.
- Keep `singleUpload = multer({ storage, fileFilter, limits }).single('file')` for signup and company logo.
- Files to change: `backend/middlewares/multer.js`.

2) Route alignment
- Switch `POST /api/v1/user/profile/update` to use `uploadProfileFields` instead of `singleUpload`.
- File to change: `backend/routes/user.route.js:21-22`.

3) Update profile controller logic
- Read both files safely from `req.files`.
- Conditionally upload each: 
  - Resume → `cloudinary.uploader.upload(resumeUri, { folder: 'pdfs', resource_type: 'auto' })`, then set `profile.resume` and `resumeOriginalName`.
  - Photo → `cloudinary.uploader.upload(photoUri, { folder: 'profile_photos' })`, then set `profile.profilePhoto`.
- Allow metadata-only updates when no files are provided.
- File to change: `backend/controllers/user.controller.js:195-247`.

4) Make company logo optional
- Guard `req.file` and only upload when a logo is present; use `folder: 'company_logos'`.
- File to change: `backend/controllers/company.controller.js:83-109`.

5) Production hardening
- Replace hardcoded CORS origin with `process.env.CLIENT_URL` and keep `credentials: true` (`backend/index.js:25-29`).
- Fix login cookie option to `httpOnly: true` (replace incorrect `httpsOnly`) (`backend/controllers/user.controller.js:164-168`).
- Optionally set `sameSite` and `secure` based on `NODE_ENV` and cross-site needs.
- Optionally add `cloudinary.config({ secure: true })` while still using `secure_url` (`backend/utils/cloudinary.js:6-10`).
- Add a centralized error handler to catch Multer errors with friendly JSON responses.

## Verification
- Signup with a photo: stores `profile.profilePhoto` (`backend/controllers/user.controller.js:45-55, 70-73`).
- Company Setup: update without logo and then with logo; both succeed.
- Profile Update: 
  - Upload only resume, only photo, and both; controller updates each independently and returns success.
- Confirm Cloudinary returns `secure_url` for all uploads; verify the updated fields in responses.
- Confirm CORS and cookies behave correctly in local and production environments.

## Deliverables
- Updated multer middleware with validation and multi-field support.
- Routes aligned with frontend field names.
- Controllers updated to handle optional and multiple files safely.
- Production-ready CORS and cookie configuration.
- Error handling that prevents crashes on missing or invalid files.

## Risk & Mitigation
- Larger files in memory: enforce file size limits; optionally move to disk storage if needed later.
- Cross-site cookies: configure `sameSite` and `secure` per deployment domain; document env vars.

If approved, I will implement these changes, run the server locally, and validate all three flows end-to-end.