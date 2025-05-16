import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {uploadToAzureBlob} from "@/app/api/util/blobService";


const prisma = new PrismaClient();

export async function GET() {
  try {
    const applications = await prisma.jobApplications.findMany({
      include: {
        jobOpportunity: true,
      },
    });

    const formatted = applications.map((app) => ({
      ...app,
      skills: app.skills ? app.skills.split(",").map((s) => s.trim()) : [],
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return NextResponse.json({ message: "Error fetching applications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const contact = formData.get("contact") as string;
    const experience = formData.get("experience") as string;
    const expected_salary = formData.get("expected_salary") as string;
    const cover_letter = "Auto-generated"; // Replace with actual if needed
    const jobOpportunityId = parseInt(formData.get("jobOpportunityId") as string);
    const skillsArray = JSON.parse(formData.get("skills") as string) as string[];
    const skills = skillsArray.join(", ");

    const cvFile = formData.get("cv") as File;

    if (!cvFile || !cvFile.name.endsWith(".pdf")) {
      return NextResponse.json({ message: "Only PDF files are allowed." }, { status: 400 });
    }

    const arrayBuffer = await cvFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Check MIME type using file-type (ESM import)
    const { fileTypeFromBuffer } = await import("file-type");
    const fileTypeResult = await fileTypeFromBuffer(buffer);

    if (!fileTypeResult || fileTypeResult.mime !== "application/pdf") {
      return NextResponse.json({ message: "Uploaded file must be a valid PDF." }, { status: 400 });
    }

    // Generate unique filename
    const randomPrefix = crypto.randomBytes(6).toString("hex");
    const newFileName = `${randomPrefix}_${cvFile.name}`;

    // Upload to Azure Blob Storage
    const blobUrl = await uploadToAzureBlob(buffer, newFileName, fileTypeResult.mime);

    // Save application to DB
    const newApplication = await prisma.jobApplications.create({
      data: {
        name,
        email,
        contact,
        experience,
        expected_salary: parseFloat(expected_salary),
        cv_name: blobUrl,
        cover_letter,
        jobOpportunityId,
        skills,
      },
    });

    return NextResponse.json(newApplication);
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json({ message: "Application submission failed." }, { status: 500 });
  }
}
