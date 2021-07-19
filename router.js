import express from "express";
const router = express.Router();
import Schemadata from "./Schema.js";

router.post("/new/channel", (req, res) => {
  const dbData = req.body;
  Schemadata.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
router.post("/new/message", (req, res) => {
  const id = req.query.id;
  const newMessage = req.body;
  Schemadata.updateOne(
    { _id: id },
    { $push: { conversation: newMessage } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

router.get("/get/channelList", (req, res) => {
  Schemadata.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let channels = [];
      data.map((channelData) => {
        const channelInfo = {
          id: channelData._id,
          name: channelData.channelName,
        };
        channels.push(channelInfo);
      });
      res.status(200).send(channels);
    }
  });
});

router.get("/get/conversation", (req, res) => {
  const id = req.query.id;
  Schemadata.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

export default router;
