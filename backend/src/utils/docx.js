import AdmZip from "adm-zip";

export const extractPlainTextFromDocx = (docxPath) => {
  const zip = new AdmZip(docxPath);
  const entry = zip.getEntry("word/document.xml");

  if (!entry) {
    return "";
  }

  const xml = entry.getData().toString("utf8");

  return xml
    .replace(/<w:tab[^>]*\/>/g, " ")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#[0-9]+;/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
};
