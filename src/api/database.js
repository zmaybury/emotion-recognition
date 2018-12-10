import sqlite from 'sqlite';
import SQL from 'sql-template-strings';
const path = require('path')

const dbPath = path.resolve(process.cwd(), 'src', 'api', 'casme2.db');
const connectionTypes = {
  OPEN_READONLY: 1,
  OPEN_READWRITE: 2,
};

const openConnection = async (write = false) => {
  let connectionType = write ? connectionTypes.OPEN_READWRITE : connectionTypes.OPEN_READONLY;
  return await sqlite.open(dbPath, { mode: connectionType, promise: Promise });
}

const closeConnection = (connection) => { 
  connection.close();
}

const genericQuery = async (query) => {
  if (!query) return;
  const connection = await openConnection();
  const data = await connection.all(query);
  closeConnection(connection);
  return data;
}

export const getAllSamples = () => {
  const query = SQL`SELECT * FROM annotations`;
  return genericQuery(query);
}

export const getSamplesByEmotionId = (emotionId) => {
  const query = SQL`SELECT * FROM annotations WHERE emotionId=${emotionId}`;
  return genericQuery(query);
}

export const getAllEmotions = () => {
  const query = SQL`SELECT * FROM emotions`;
  return genericQuery(query);
}