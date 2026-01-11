// Service areas configuration
// Add zip codes as needed - this is easily configurable

export const SERVICE_AREAS: string[] = [
    // Example: Phoenix Metro Area
    "85001", "85002", "85003", "85004", "85005", "85006", "85007", "85008",
    "85009", "85010", "85011", "85012", "85013", "85014", "85015", "85016",
    "85017", "85018", "85019", "85020", "85021", "85022", "85023", "85024",
    "85027", "85028", "85029", "85032", "85033", "85034", "85035",
    // Scottsdale
    "85250", "85251", "85252", "85253", "85254", "85255", "85256", "85257",
    "85258", "85259", "85260", "85261", "85262", "85263", "85264", "85266",
    // Tempe
    "85281", "85282", "85283", "85284", "85285", "85287",
    // Mesa
    "85201", "85202", "85203", "85204", "85205", "85206", "85207", "85208",
    "85209", "85210", "85211", "85212", "85213", "85214", "85215", "85216",
    // Gilbert
    "85233", "85234", "85295", "85296", "85297", "85298", "85299",
    // Chandler
    "85224", "85225", "85226", "85244", "85246", "85248", "85249",
];

export function isZipCodeValid(zipCode: string): boolean {
    // Must be exactly 5 digits
    return /^\d{5}$/.test(zipCode);
}

export function isZipCodeInServiceArea(zipCode: string): boolean {
    return SERVICE_AREAS.includes(zipCode);
}

export function getServiceAreaMessage(zipCode: string): {
    isValid: boolean;
    inServiceArea: boolean;
    message: string;
} {
    if (!isZipCodeValid(zipCode)) {
        return {
            isValid: false,
            inServiceArea: false,
            message: "Please enter a valid 5-digit zip code",
        };
    }

    if (isZipCodeInServiceArea(zipCode)) {
        return {
            isValid: true,
            inServiceArea: true,
            message: "Great news! We serve your area.",
        };
    }

    return {
        isValid: true,
        inServiceArea: false,
        message: "We don't currently serve your area, but you can join our waitlist.",
    };
}
