## Goal
Fix profile updates (skills, phoneNumber, resume, profilePhoto) by ensuring the frontend only sends actual File objects for `resume` and `profilePhoto`, while keeping text fields intact.

## Changes
- In `frontend/src/components/UpdateProfileDialog.jsx`, modify `SubmitHandler` to append:
  - `resume` only if `input.resume instanceof File`.
  - `profilePhoto` only if `input.profilePhoto instanceof File`.
- Keep appending text fields: `fullname`, `email`, `phoneNumber`, `bio`, `skills`.
- Leave Axios `withCredentials: true` as-is.

## Validation
- Update skills and phone without selecting files → succeeds.
- Upload only resume (PDF <10MB) → stored URL.
- Upload only photo (image <10MB) → stored URL.
- Upload both → both fields update.

I will implement the change and you can re-test the profile update dialog immediately.