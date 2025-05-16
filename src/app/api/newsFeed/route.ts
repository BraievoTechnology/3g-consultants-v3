// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { PrismaClient, NewsFeedStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { uploadToAzureBlob } from "@/app/api/util/blobService";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const feeds = await prisma.newsFeed.findMany();
    return NextResponse.json(feeds);
  } catch (error) {
    console.error("GET /newsFeed error:", error);
    return NextResponse.json(
      { message: "Failed to fetch news feeds" },
      { status: 500 }
    );
  }
}

/*
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const summary = formData.get('summary') as string;
        const status = formData.get('status') as string;
        const image = formData.get('image') as File;

        if (!title || !status || !image || !Object.values(NewsFeedStatus).includes(status as NewsFeedStatus)) {
            return NextResponse.json({ message: 'Missing or invalid fields' }, { status: 400 });
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${image.name.replace(/[^a-z0-9.-]/gi, '_')}`;
        const filePath = path.join(process.cwd(), 'public/assets/newsFeedImages', fileName);


        await writeFile(filePath, buffer);

        const imagePath = `/assets/newsFeedImages/${fileName}`;

        const newFeed = await prisma.newsFeed.create({
            data: {
                title,
                summary,
                status: status as NewsFeedStatus,
                images: imagePath,
            },
        });

        return NextResponse.json(newFeed);
    } catch (error) {
        console.error('Error creating news feed:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}*/
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const status = formData.get("status") as string;
    const image = formData.get("image") as File;

    if (
      !title ||
      !status ||
      !image ||
      !Object.values(NewsFeedStatus).includes(status as NewsFeedStatus)
    ) {
      return NextResponse.json(
        { message: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    // Convert image to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${image.name.replace(
      /[^a-z0-9.-]/gi,
      "_"
    )}`;
    const mimeType = image.type;

    // Upload to Azure Blob Storage
    const blobUrl = await uploadToAzureBlob(buffer, fileName, mimeType);

    // Save the blob URL to the database
    const newFeed = await prisma.newsFeed.create({
      data: {
        title,
        summary,
        status: status as NewsFeedStatus,
        images: blobUrl, // Azure Blob URL stored
        createTime: new Date(),
      },
    });

    return NextResponse.json(newFeed);
  } catch (error) {
    console.error("Error creating news feed:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
