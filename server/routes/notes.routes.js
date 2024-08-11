const notesRouter = require('express').Router();
const { Op } = require('sequelize');

/////////////
const { Note, Text } = require('../db/models'); // Change here your Model
/////////////

// verifyAccessToken Использовать перед POST DELETE PUT
const verifyAccessToken = require('../middleware/verifyAccessToken');

/////////////

// AKA CRUD routes.js

notesRouter
  .route('/')

  .get(async (req, res) => {
    try {
      const notes = await Note.findAll({ order: [['id', 'ASC']] });

      res.status(200).json(notes);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })

  .post(async (req, res) => {
    try {
      const { title, description, userID, folderID } = req.body;

      if (title.trim() === '' || description.trim() === '' || !userID) {
        res.status(400).json('Empty field exists');
      }

      const data = (
        await Note.create({ title, description, userID, folderID })
      ).get();

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

notesRouter
  .route('/note/:id')

  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, folderID, userID } = req.body;

      const data = await Note.update(
        { title, description, folderID, userID },
        { where: { id } }
      );

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  })

  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const countDeletedNotes = await Note.destroy({ where: { id } });

      res.json({ countDeletedNotes });
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

notesRouter
  .route('/note/:id')

  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Note.findAll({
        where: { id },
        include: { model: Text },
        // SORT BY CREATE DATE
      });

      res.json(data);
    } catch ({ message }) {
      res.status(500).json({ err: message });
    }
  });

// notesRouter
//   .route('/')
//   .get(async (req, res) => {
//     try {
//       const data = await Aparts.findAll({ order: [['id', 'ASC']] });
//       res.status(200).json(data);
//     } catch ({ message }) {
//       res.status(500).json({ err: message });
//     }
//   })

//   .post(async (req, res) => {
//     try {
//       const { title, description, photo, price, typeOfApart, adress } =
//         req.body;

//       if (
//         title.trim() === '' ||
//         description.trim() === '' ||
//         price.trim() === '' ||
//         typeOfApart.trim() === '' ||
//         adress.trim() === ''
//       ) {
//         res.status(400).json('Empty field exists');
//       }

//       const data = (
//         await Aparts.create({
//           title,
//           description,
//           price,
//           photo,
//           typeOfApart,
//           adress,
//         })
//       ).get();

//       res.status(201).json(data);
//     } catch ({ message }) {
//       res.status(500).json({ err: message });
//     }
//   });

// notesRouter.get('/filter/', async (req, res) => {
//   try {
//     const { typeOfApart } = req.query;
//     const data = await Aparts.findAll({
//       where: {
//         typeOfApart,
//       },
//     });
//     res.status(200).json(data);
//   } catch ({ message }) {
//     res.status(500).json({ err: message });
//   }
// });

// notesRouter
//   .route('/:id')

//   .put(async (req, res) => {
//     try {
//       const { title, description, price, photo, typeOfApart, adress } =
//         req.body;

//       const { id } = req.params;

//       const [data] = await Aparts.update(
//         { title, description, price, typeOfApart, photo, adress },
//         { where: { id } }
//       );

//       data
//         ? res.status(200).json('Apart changed')
//         : res.status(400).json('Apart Not Found');
//     } catch ({ message }) {
//       res.status(500).json({ err: message });
//     }
//   })

//   .delete(async (req, res) => {
//     try {
//       const { id } = req.params;

//       const data = await Aparts.destroy({ where: { id } });

//       data
//         ? res.status(200).json('Apart deleted')
//         : res.status(400).json('Apart Not Found');
//     } catch ({ message }) {
//       res.status(500).json({ err: message });
//     }
//   });

module.exports = notesRouter;
