import fetch from "node-fetch";

export default async (req, res) => {
  console.log(req.body);
  if (req.method === "POST") {
    const response = await fetch(
      `https://platform.vestaboard.com/subscriptions/${process.env.VESTABOARD_SUBSCRIPTION_ID}/message`,
      {
        method: "post",
        body: JSON.stringify({ characters: req.body.value }),
        headers: {
          "Content-Type": "application/json",
          "X-Vestaboard-Api-Key": process.env.VESTABOARD_API_KEY,
          "X-Vestaboard-Api-Secret": process.env.VESTABOARD_API_SECRET,
        },
      }
    );
    console.log(response);
    res.send();
    if (response.status === 200) {
      req.body;
      console.log(req.body.author.userName);
      let slackResponse = await fetch(process.env.SLACK_WEBHOOK, {
        method: "post",
        body: JSON.stringify({
          text: `${req.body.author.userName} sent the following message: ${req.body.text}`,
        }),
      });
      if (slackResponse.status === 200) {
        console.log("Message sent to Slack");
      }
      res.status(200).end();
    } else {
      res
        .status(response.status)
        .send("something happened on the vestaboard side");
    }
  }
};
