const textRouter = require('express').Router();
const { Note, Text } = require('../db/models'); // Change here your Model

textRouter
  .route('/')

//   .get(async (req, res) => {
//     try {
//       // CODE HERE
//     } catch ({ message }) {
//       res.status(500).json({ err: message });
//     }
//   })

  .post(async (req, res) => {
    try {
      // CODE HERE

      const { body, noteID, userID } = req.body;

      if (body.trim() === '' || !userID || !noteID) {
        res.status(400).json('Empty field exists');
      }
      const data = await Text.create({ body, noteID, userID });

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

textRouter
  .route('/:id')

  .get(async (req, res) => {
    try {
      // CODE HERE
      const { id } = req.params;
      const data = await Text.findAll({
        where: { id },
      });

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })

  .put(async (req, res) => {
    try {
      // CODE HERE
      const { id } = req.params;

      const { body, noteID, userID } = req.body;

      const data = await Text.update(
        { body, noteID, userID },
        { where: { id } }
      );

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })

  .delete(async (req, res) => {
    try {
      // CODE HERE

      const { id } = req.params;

      const countDeletedNotes = await Text.destroy({ where: { id } });

      res.json({ countDeletedNotes });
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

module.exports = textRouter;
