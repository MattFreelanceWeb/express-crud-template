const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  console.log("create comment route", req);
  try {
    const userId = parseInt(req.params.id);
    const plantId = parseInt(req.params.plantId);

    const commentData = {
      content: req.body.content,
      Plant: {
        connect: {
          id: plantId,
        },
      },
      User: {
        connect: {
          id: userId,
        },
      },
    };

    // Vérification et ajout de byteImage si présent
    if (req.body.byteImage) {
      commentData.byteImage = req.body.byteImage;
    }

    const newComment = await prisma.comment.create({
      data: commentData,
    });

    res.status(201).json({ message: "Comment created", data: newComment });
  } catch (error) {
    console.error(
      "Error creating comment:",
      error.message || "Internal Server Error"
    );
    res
      .status(500)
      .json({ error: "Error creating comment", details: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
