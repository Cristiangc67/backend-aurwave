import { config } from "dotenv";
config({ path: ".env" });

// Función de verificación simple (puedes hacerla más elaborada)
function getEnv(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Falta la variable de entorno: ${key}`);
    }
    return value;
}

export const PORT = getEnv("PORT");
export const JWT_SECRET = getEnv("JWT_SECRET");
