import fs from 'fs/promises';

const db = './lib/com/utilities/db.json';

// Get temporary DB since we don't have a COM.
export async function getDB() {
  const raw = await fs.readFile(db, 'utf-8');
  const data = JSON.parse(raw);
  return data;
}

// Set temporary DB since we don't have a COM.
export async function setDB(data) {
  const raw = JSON.stringify(data, null, 4);
  await fs.writeFile(db, raw);
}
