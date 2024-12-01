import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello");
});
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const getUrl = await prisma.url.findFirst({
    where: {
      shorturl: id,
    },
  });
  if (getUrl) {
    return res.redirect(getUrl.redirecturl);
  }
  return res.json({ message: `no url matching` });
});
app.post("/api/shorturl/", async (req, res) => {
  const body = req.body;
  if (body.customUrl) {
    const existingUrl = await prisma.url.findFirst({
      where: {
        shorturl: body.customUrl,
      },
    });
    if (existingUrl) {
      return res.send("Url taken");
    }
  }

  var url = body.url;
  if (!url.includes(".com")) {
    url = url + ".com";
  }
  if (!url.includes("www.")) {
    url = "www." + url;
  }
  if (!url.includes("https://")) {
    url = "https://" + url;
  }
  if (!body.customUrl) {
    const uniqueID = nanoid(5);
    await prisma.url.create({
      data: {
        shorturl: uniqueID,
        redirecturl: url,
      },
    });
    res.send(`https://localhost:5000/${uniqueID}`);
  } else {
    await prisma.url.create({
      data: {
        shorturl: body.customUrl,
        redirecturl: url,
      },
    });
    res.send(`https://localhost:5000/${body.customUrl}`);
  }

  //   res.send(url);
});
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
