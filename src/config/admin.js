/**
 * ============================================================================
 * SHOP BD - ADMIN CONFIGURATION
 * ============================================================================
 * Set the primary Firebase Authentication UID for the website Administrator.
 * You can find this UID in Firebase Console -> Authentication -> Users.
 * ============================================================================
 */
export const ADMIN_UID = "PASTE_YOUR_FIREBASE_ADMIN_UID_HERE";

/**
 * Check if the given UID matches the configured primary Admin UID.
 * Production authorization also validates against the Firestore `adminUsers`
 * collection and backend security rules.
 */
export const isAdminUser = (uid) => {
  if (!uid) return false;
  if (ADMIN_UID !== "PASTE_YOUR_FIREBASE_ADMIN_UID_HERE" && uid === ADMIN_UID) {
    return true;
  }
  return false;
};
