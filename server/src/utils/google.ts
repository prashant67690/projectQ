import { google } from "googleapis";
import path from "path";
import stream from "stream";

const KEYFILEPATH = path.join(__dirname, "secrets/cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

export const getDriveService = () => {
  const driveService = google.drive({ version: "v3", auth });
  return driveService;
};

export const uploadFile = async (fileObject: any) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["1mhdlKEjdoUjnOy8nt-5MBA1ihoUod7XS"],
    },
    fields: "id,name",
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
  return data;
};

export const getFile = async (fileId: string) => {
  const drive = google.drive({ version: "v3", auth });
  const { data } = await drive.files.get({
    fileId,
    fields: "name, mimeType",
  });

  return data.name;
};

export const downloadFile = async (fileId: string) => {
  const drive = google.drive({ version: "v3", auth });
  const { data } = await drive.files.get({
    fileId,
    fields: "name, mimeType,webContentLink",
  });

  return data;
};

export const deleteFile = async (fileId: string) => {
  const drive = google.drive({ version: "v3", auth });
  await drive.files.delete({ fileId });
  console.log(`File ${fileId} deleted successfully`);
};
