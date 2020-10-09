import { Pool } from 'pg';

export const pool = new Pool({
    connectionString: 'postgres://tutaszdguqmevb:c4dc43d5b10989d371c952588109b01cbaf8439f584868946eb7b1e67baf7da7@ec2-52-86-73-86.compute-1.amazonaws.com:5432/dephhgggjbe7sf',
    ssl: { rejectUnauthorized: false }
})