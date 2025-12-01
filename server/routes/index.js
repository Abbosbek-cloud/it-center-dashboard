import express from 'express';
import { readFileSync } from 'fs';
import path from 'path';

// process.cwd() har doim proyekt root'ini qaytaradi
const packageJson = JSON.parse(readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    version: packageJson.version,
    apiVersion: `v${packageJson.version.split('.')[0]}`,
    endpoints: {
      auth: `/api/v${packageJson.version.split('.')[0]}/auth`,
      tutors: `/api/v${packageJson.version.split('.')[0]}/tutors`,
      interviews: `/api/v${packageJson.version.split('.')[0]}/interviews`,
      users: `/api/v${packageJson.version.split('.')[0]}/users`,
    },
  });
});

export default router;
