// Quick update script for MySQL migration
// Run this in your IDE's find/replace with regex enabled

const replacements = [
  // User references
  { find: /user\._id/g, replace: 'user.id' },
  { find: /cat\._id/g, replace: 'cat.id' },
  { find: /category\._id/g, replace: 'category.id' },
  { find: /music\._id/g, replace: 'music.id' },
  { find: /type\._id/g, replace: 'type.id' },
  { find: /plan\._id/g, replace: 'plan.id' },
  { find: /term\._id/g, replace: 'term.id' },
  
  // Filter operations
  { find: /\.filter\(\(user\) => user\._id !== userId\)/g, replace: '.filter((user) => user.id !== userId)' },
  { find: /\.map\(\(cat\) => \(cat\._id === id \? res\.data : cat\)\)/g, replace: '.map((cat) => (cat.id === id ? res.data : cat))' },
  
  // Key props
  { find: /key=\{user\._id\}/g, replace: 'key={user.id}' },
  { find: /key=\{category\._id\}/g, replace: 'key={category.id}' },
  { find: /key=\{music\._id\}/g, replace: 'key={music.id}' },
  
  // Data attributes
  { find: /data-category-id=\{category\._id\}/g, replace: 'data-category-id={category.id}' },
  { find: /data-music-id=\{music\._id\}/g, replace: 'data-music-id={music.id}' },
];

console.log('MySQL Migration - ID Field Updates');
console.log('Apply these find/replace patterns in your IDE:');
console.log('=====================================');

replacements.forEach((r, i) => {
  console.log(`${i + 1}. Find: ${r.find}`);
  console.log(`   Replace: ${r.replace}`);
  console.log('');
});