import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "very-secret-hris-jwt-secret";
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || "encryption_key_213";
const ALGORITHM = "AES-GCM";

// Fungsi untuk membuat token JWT
export function createToken(data: object) {
    return jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
}

// Fungsi untuk mengenkripsi token
export async function encryptToken(token: string): Promise<string> {
    const iv = crypto.getRandomValues(new Uint8Array(12)); // IV harus 12 byte untuk AES-GCM

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(ENCRYPTION_SECRET),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: new TextEncoder().encode("salt"),
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: ALGORITHM, length: 256 },
        false,
        ["encrypt"]
    );

    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: ALGORITHM, iv },
        key,
        new TextEncoder().encode(token)
    );

    // Gabungkan IV dan encrypted data menjadi string hex
    const ivHex = Array.from(iv)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    const encryptedHex = Array.from(new Uint8Array(encryptedBuffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

    return `${ivHex}:${encryptedHex}`;
}

// Fungsi untuk mendekripsi token
export async function decryptToken(encryptedToken: string): Promise<string> {
    const [ivHex, encryptedHex] = encryptedToken.split(':');
    if (!ivHex || !encryptedHex) throw new Error("Token format incorrect");

    const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const encryptedData = new Uint8Array(encryptedHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(ENCRYPTION_SECRET),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: new TextEncoder().encode("salt"),
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: ALGORITHM, length: 256 },
        false,
        ["decrypt"]
    );

    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: ALGORITHM, iv },
        key,
        encryptedData
    );

    return new TextDecoder().decode(decryptedBuffer); // Mengembalikan token terdekripsi sebagai string
}
