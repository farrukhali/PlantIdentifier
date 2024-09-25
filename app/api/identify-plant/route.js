import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { imageData } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Identify this plant and provide the following information in a structured format:
    Name: [Plant Name]
    Scientific Name: [Scientific Name]
    Type: [Type of Plant]
    Origin: [Origin of the Plant]
    Description: [Brief Description]
    Care Instructions: [Basic Care Instructions]
    
    Please ensure each piece of information is on a new line with the label, followed by a colon and the information. Do not use asterisks or other special characters for formatting.`;

    const result = await model.generateContent([{
      inlineData: {
        mimeType: "image/jpeg",
        data: imageData.split(',')[1] // Remove the data URL prefix
      }
    }, prompt]);

    const response = result.response;
    let text = response.text();

    // Clean the response
    text = text.replace(/\*/g, '').trim();

    // Parse the response
    const lines = text.split('\n');
    const name = lines[0].split(':')[1].trim();
    const info = lines.slice(1).join('\n');

    return NextResponse.json({ name, info });
  } catch (error) {
    console.error('Error in identifyPlant:', error);
    return NextResponse.json({ error: 'Failed to identify plant' }, { status: 500 });
  }
}