import fetch from "node-fetch";

export default async (req, res) => {
  console.log(req.body);
  if (req.method === "POST") {
    const response = await fetch(
      `https://platform.vestaboard.com/subscriptions/${process.env.VESTABOARD_SUBSCRIPTION_ID}/message`,
      {
        method: "post",
        body: JSON.stringify({ characters: req.body }),
        headers: {
          "Content-Type": "application/json",
          "X-Vestaboard-Api-Key": process.env.VESTABOARD_API_KEY,
          "X-Vestaboard-Api-Secret": process.env.VESTABOARD_API_SECRET,
        },
      }
    );
    res.send();
    if (response.status === 200) {
      res.status(200).end();
    } else {
      res
        .status(response.status)
        .send("something happened on the vestaboard side");
    }
  }
};
