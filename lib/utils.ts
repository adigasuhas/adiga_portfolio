import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function renderFormattedText(text: string | undefined): React.ReactNode {
  if (!text) return null;
  
  // Split the text by double asterisks first for bold formatting
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return React.createElement(
    "span",
    null,
    ...parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return React.createElement("strong", { key: index }, boldText);
      }
      
      // Inside normal text, split by single asterisks or underscores for italics
      const italicParts = part.split(/(\*.*?\*|_.*?_)/g);
      return React.createElement(
        "span",
        { key: index },
        ...italicParts.map((subPart, subIndex) => {
          if ((subPart.startsWith("*") && subPart.endsWith("*")) || 
              (subPart.startsWith("_") && subPart.endsWith("_"))) {
            return React.createElement("em", { key: subIndex }, subPart.slice(1, -1));
          }
          return subPart;
        })
      );
    })
  );
}
