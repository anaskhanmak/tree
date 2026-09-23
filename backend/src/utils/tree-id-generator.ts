/**
 * Generates official human-readable, unique Tree IDs
 * Format: TREE-{CITY_CODE}-{YEAR}-{SEQUENCE_NUMBER}
 * Example: TREE-KHI-2026-00125
 */
export function generateTreeCode(city: string, sequenceNumber: number): string {
  const cityCodeMap: Record<string, string> = {
    karachi: "KHI",
    lahore: "LHR",
    islamabad: "ISB",
    rawalpindi: "RWP",
    faisalabad: "FSD",
    multan: "MLT",
    peshawar: "PSH",
    quetta: "QTA",
    hyderabad: "HYD",
    thatta: "THT",
    sukkur: "SKR",
  };

  const normalizedCity = city.trim().toLowerCase();
  const cityCode = cityCodeMap[normalizedCity] || "PAK";
  const year = new Date().getFullYear();
  const sequenceStr = String(sequenceNumber).padStart(5, "0");

  return `TREE-${cityCode}-${year}-${sequenceStr}`;
}

export function generateCertificateNumber(sequenceNumber: number): string {
  const year = new Date().getFullYear();
  const sequenceStr = String(sequenceNumber).padStart(6, "0");
  return `CERT-${year}-${sequenceStr}`;
}
