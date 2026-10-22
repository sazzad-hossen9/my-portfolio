import fs from 'fs';
import path from 'path';
import { PortfolioData } from '@/types/portfolio';

export function getLocalDbData(): PortfolioData {
  const dbPath = path.join(process.cwd(), 'db.json');
  try {
    const fileContents = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (err) {
    console.error('Error reading db.json:', err);
    throw err;
  }
}
