import crypto from "crypto";
import { loadLinks, saveLinks } from "../model/shortenerURLModel.js";

export const getshortURL = async (req, res) => {
    try {
        const links = await loadLinks();

        res.render("index", {
            links,
            protocol: req.protocol,
            host: req.get("host")
        });

    } catch (err) {
        res.status(404).send("404 page not found");
    }
};

export const shortenerURLController = async (req, res) => {
    try {
        const { url, shortUrl } = req.body;

        if (!url) {
            return res.status(400).send("URL is required");
        }

        const links = await loadLinks();

        const finalShortURL = (shortUrl || crypto.randomBytes(4).toString("hex"))
            .trim()
            .replace(/\s+/g, "-");

        let finalURL = url;
        if (!finalURL.startsWith("http://") && !finalURL.startsWith("https://")) {
            finalURL = "https://" + finalURL;
        }

        if (links[finalShortURL]) {
            return res.status(409).send("Short URL already exists");
        }

        links[finalShortURL] = finalURL;
        await saveLinks(links);

        res.redirect("/");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
};

export const redirectShortURL = async (req, res) => {
    const links = await loadLinks();
    const { shortURL } = req.params;

    if (links[shortURL]) {
        return res.redirect(links[shortURL]);
    }

    res.status(404).send("Short URL not found");
}

