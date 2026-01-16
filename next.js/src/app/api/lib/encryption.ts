import crypto from "crypto";

// Simple encryption for reservation links using AES-256-CBC
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "default-key-change-in-production";
const IV_LENGTH = 16;

function getKeyBuffer(key: string): Buffer {
    // Hash the key to ensure consistent 32-byte length for AES-256
    return crypto.createHash("sha256").update(key).digest();
}

/**
 * Encrypt a reservation ID or data to create a secure link token
 * @param data - The data to encrypt (e.g., reservation number or ID)
 * @returns Encrypted token as hex string
 */
export function encryptReservationToken(data: string): string {
    const key = getKeyBuffer(ENCRYPTION_KEY);
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    let encrypted = cipher.update(data, "utf-8", "hex");
    encrypted += cipher.final("hex");

    // Combine IV and encrypted data, separated by a colon
    return `${iv.toString("hex")}:${encrypted}`;
}

/**
 * Decrypt a reservation token back to the original data
 * @param token - The encrypted token from the link
 * @returns Decrypted original data
 */
export function decryptReservationToken(token: string): string {
    try {
        const key = getKeyBuffer(ENCRYPTION_KEY);
        const parts = token.split(":");
        if (parts.length !== 2) {
            throw new Error("Invalid token format");
        }

        const iv = Buffer.from(parts[0], "hex");
        const encrypted = parts[1];

        const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
        let decrypted = decipher.update(encrypted, "hex", "utf-8");
        decrypted += decipher.final("utf-8");

        return decrypted;
    } catch (error) {
        throw new Error("Failed to decrypt token");
    }
}
