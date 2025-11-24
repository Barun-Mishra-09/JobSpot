## Problems Suspected
- Phone number casting to Number can throw when sent as a string.
- Skills string contains spaces/empties; backend saves invalid entries and UI may mis-render.
- UI checks `user?.profile?.skills.length` without guarding `.length` when `skills` is undefined.
- Error messages may be generic; need clear 4xx for invalid input and 5xx only for unexpected errors.

## Changes To Implement
1) Backend `updateProfile` input sanitization
- Convert `phoneNumber` to Number safely; validate digits and length before assigning.
- Normalize `skills`: `skills.split(',').map(trim).filter(Boolean)`.
- Keep existing optional file uploads.
- Return 400 JSON for invalid phone/skills, 500 JSON for unexpected errors.

2) Frontend UI guard
- In `Profile.jsx`, change condition to `user?.profile?.skills?.length` to avoid accessing `.length` on undefined.

3) Error clarity
- Ensure `updateProfile` returns a message consistently on errors (already added catch -> 500); add 400 for bad input.

## Validation
- Update text-only fields: success and UI updates.
- Upload resume/photo individually and together.
- Invalid phone prompts a clear 400 message without crashing.

I will implement these changes now and you can re-test the dialog immediately.