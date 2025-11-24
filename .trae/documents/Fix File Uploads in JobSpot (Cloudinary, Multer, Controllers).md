## Root Causes Found
- `multer` only accepts a single field named `file`, leaving `req.file` undefined when the frontend sends `resume` and `profilePhoto` together in profile updates (`backend/middlewares/multer.js:3-4`, `backend/routes/user.route.js:21-22`, `frontend/src/components/UpdateProfileDialog.jsx:65-70`).
- `updateProfile` always assumes a file exists and immediately uses it, causing errors when no file is provided (`backend/controllers/user.controller.js:195-201`). It also only uploads a resume and never updates `profilePhoto` (`backend/controllers/user.controller.js:223-227`).
- `updateCompany` assumes logo `req.file` always exists and uploads unconditionally, failing on metadata-only updates (`backend/controllers/company.controller.js:83-92`).
- Cloudinary is correctly configured and loaded (`backend/utils/cloudinary.js:6-10`). `getDataUri` expects a defined file and will throw if `file` is undefined (`backend/utils/datauri.js:5-9`).

## Fix Plan
1) Support multiple files in profile updates
- Add a `multer` configuration that accepts two fields: `resume` and `profilePhoto` using `.fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePhoto', maxCount: 1 }])`.
- Use this new upload middleware on `POST /api/v1/user/profile/update` (`backend/routes/user.route.js:21-22`).
- In `updateProfile`, read `req.files.resume?.[0]` and `req.files.profilePhoto?.[0]` safely. Only call Cloudinary when the corresponding file exists, and allow metadata-only updates.
- Upload resume with `resource_type: 'auto'` and a `folder: 'pdfs'`. Upload profile photo to `folder: 'profile_photos'`. Save `resumeOriginalName` and update `profile.profilePhoto` when provided (`backend/controllers/user.controller.js:195-247`).

2) Make company logo optional
- In `updateCompany`, check `req.file` before building a Data URI; only upload to Cloudinary if a logo was provided. Build `updateData` dynamically so `logo` changes only when a file exists (`backend/controllers/company.controller.js:83-109`).
- Optionally set image uploads to `folder: 'company_logos'` for organization.

3) Keep existing single-file uploads intact
- Continue using `single('file')` for signup profile photos and company logo when provided (`backend/middlewares/multer.js:3-4`, `backend/routes/user.route.js:16`, `backend/routes/company.route.js:19-20`).

4) Basic validation and safety
- Add MIME/size filtering in multer: allow `image/*` for photos and `application/pdf` for resumes.
- Add defensive null checks wherever `getDataUri(file)` is used.

## Implementation Changes
- `backend/middlewares/multer.js`
  - Export `uploadProfileFields = multer({ storage, fileFilter }).fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePhoto', maxCount: 1 }])`.
  - Keep and reuse `singleUpload = multer({ storage, fileFilter }).single('file')`.
- `backend/routes/user.route.js`
  - Replace `singleUpload` with `uploadProfileFields` on `POST /profile/update` (`backend/routes/user.route.js:21-22`).
- `backend/controllers/user.controller.js`
  - In `updateProfile`, guard `req.files` existence.
  - If `resume` present: `getDataUri(resumeFile)` → `cloudinary.uploader.upload(..., { folder: 'pdfs', resource_type: 'auto' })` → set `profile.resume` and `resumeOriginalName`.
  - If `profilePhoto` present: `getDataUri(photoFile)` → `cloudinary.uploader.upload(...)` → set `profile.profilePhoto`.
  - Leave other profile fields editable without requiring files.
- `backend/controllers/company.controller.js`
  - Guard `req.file` and only set `logo` in `updateData` when upload succeeds.

## Validation Plan
- Manual via frontend:
  - Signup: attach a profile image (`frontend/src/components/auth/Signup.jsx:131-140`) → user created with `profile.profilePhoto` (`backend/controllers/user.controller.js:70-73`).
  - Company Setup: update text fields without choosing a logo (`frontend/src/components/admin/CompanySetup.jsx:39-74`) → should succeed without upload errors; then update with a logo to verify Cloudinary URL saved.
  - Update Profile Dialog: upload only resume; only photo; and both together (`frontend/src/components/UpdateProfileDialog.jsx:65-70`) → controller handles all cases and does not crash when no files.
- API verification: inspect responses for Cloudinary `secure_url` presence and persisted values.

## Risks & Notes
- Ensure `.env` has `CLOUD_NAME`, `API_KEY`, `API_SECRET` loaded (already in `backend/utils/cloudinary.js:6-10`).
- `multer.memoryStorage()` keeps data in RAM; large files may need limits.
- If you prefer minimal backend change, an alternative is to change the frontend to send a single `file` under current contract, but this would limit updating both resume and photo in one request.

## Next Steps
- Implement the changes above and run local tests on the three flows (signup image, company setup, profile update). Once confirmed, we can add optional MIME/size guards and folders to keep Cloudinary assets organized.