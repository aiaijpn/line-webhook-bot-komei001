import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
  const events = req.body.events;

  if (events && events.length > 0) {
    const replyToken = events[0].replyToken;

    await axios.post(
      "https://api.line.me/v2/bot/message/reply",
      {
        replyToken: replyToken,
        messages: [{ type: "text", text: "Hello LINE" }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
        },
      }
    );
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server running");
});
