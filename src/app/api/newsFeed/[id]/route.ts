// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { PrismaClient, NewsFeedStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { uploadToAzureBlob } from "@/app/api/util/blobService";

const prisma = new PrismaClient();

// Utility to extract ID from URL
function extractIdFromUrl(req: NextRequest): number | null {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const idStr = segments[segments.length - 1];
  const id = parseInt(idStr, 10);
  return isNaN(id) ? null : id;
}

// GET a news feed by ID
export async function GET(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) {
    return NextResponse.json(
      { message: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  const feed = await prisma.newsFeed.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!feed) {
    return NextResponse.json(
      { message: "News feed not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(feed);
}

// PUT update a news feed

export async function PUT(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) {
    return NextResponse.json(
      { message: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const status = formData.get("status") as string;

    if (!Object.values(NewsFeedStatus).includes(status as NewsFeedStatus)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }

    let imagePath: string | undefined;

    const image = formData.get("image") as File | null;
    if (image && typeof image === "object") {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${image.name.replace(
        /[^a-z0-9.-]/gi,
        "_"
      )}`;
      const mimeType = image.type;

      // Upload to Azure Blob Storage
      imagePath = await uploadToAzureBlob(buffer, fileName, mimeType);
    }

    const updated = await prisma.newsFeed.update({
      where: { id },
      data: {
        title,
        summary,
        status: status as NewsFeedStatus,
        ...(imagePath && { images: imagePath }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { message: "Failed to update news feed" },
      { status: 500 }
    );
  }
}
/*export async function PUT(req: NextRequest) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ message: 'Invalid or missing ID' }, { status: 400 });
    }

    try {
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const summary = formData.get('summary') as string;
        const status = formData.get('status') as string;

        if (!Object.values(NewsFeedStatus).includes(status as NewsFeedStatus)) {
            return NextResponse.json({ message: 'Invalid status value' }, { status: 400 });
        }

        let imagePath: string | undefined;

        const image = formData.get('image') as File | null;
        if (image && typeof image === 'object') {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${image.name}`;
            const filePath = path.join(process.cwd(), 'public/assets/newsFeedImages', fileName);

            await writeFile(filePath, buffer);
            imagePath = `/assets/newsFeedImages/${fileName}`;
        }

        const updated = await prisma.newsFeed.update({
            where: { id },
            data: {
                title,
                summary,
                status: status as NewsFeedStatus,
                ...(imagePath && { images: imagePath }),
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('PUT error:', error);
        return NextResponse.json({ message: 'Failed to update news feed' }, { status: 500 });
    }
}*/

// DELETE a news feed by ID
export async function DELETE(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) {
    return NextResponse.json(
      { message: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  try {
    await prisma.newsFeed.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Deleted error:", error);
    return NextResponse.json(
      { message: "Failed to delete news feed" },
      { status: 500 }
    );
  }
}
