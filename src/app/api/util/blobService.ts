// lib/blobUpload.ts
import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const CONTAINER_NAME = "3g-blob";

export async function uploadToAzureBlob(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
    console.log("calling blob service")
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

    const blobClient = containerClient.getBlockBlobClient(fileName);
    await blobClient.uploadData(fileBuffer, {
        blobHTTPHeaders: {
            blobContentType: mimeType,
        },
    });

    return blobClient.url;
}