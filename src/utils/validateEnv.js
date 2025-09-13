export function validateAppwriteConfig(conf) {
  const issues = [];
  if (!conf.appwriteUrl || conf.appwriteUrl.includes('your_')) {
    issues.push('VITE_APPWRITE_URL');
  }
  if (!conf.appwriteProjectId || conf.appwriteProjectId.includes('your_')) {
    issues.push('VITE_APPWRITE_PROJECT_ID');
  }
  if (!conf.appwriteDatabaseId || conf.appwriteDatabaseId.includes('your_')) {
    issues.push('VITE_APPWRITE_DATABASE_ID');
  }
  if (!conf.appwriteCollectionId || conf.appwriteCollectionId.includes('your_')) {
    issues.push('VITE_APPWRITE_COLLECTION_ID');
  }
  if (!conf.appwriteBucketId || conf.appwriteBucketId.includes('your_')) {
    issues.push('VITE_APPWRITE_BUCKET_ID');
  }

  if (issues.length) {
    // eslint-disable-next-line no-console
    console.error(
      `Appwrite configuration is missing/placeholder for: ${issues.join(', ')}.\n` +
      'Update your .env file and restart the dev server.'
    );
    return false;
  }
  return true;
}


