import { readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_FILE = path.join("data", "links.json");


/* -------------------- FILE HELPERS -------------------- */

const loadLinks = async () => {
    try {
        const data = await readFile(DATA_FILE, "utf-8");
        return data.trim() ? JSON.parse(data) : {};
    } catch (err) {
        if (err.code === "ENOENT") {
            await writeFile(DATA_FILE, "{}");
            return {};
        }
        throw err;
    }
};

const saveLinks = async (links) => {
    await writeFile(DATA_FILE, JSON.stringify(links, null, 2));
};

export { loadLinks, saveLinks };