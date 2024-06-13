const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.delete = async (req, res) => {
  console.log("delete plant route", req);
  const userIdFromToken = req.auth.userId;
  const plantId = parseInt(req.params.id);

  try {
    const userRolesFromToken = req.auth.userRole;
    const isAdmin = await prisma.role.findUnique({
      where: {
        id: userRolesFromToken,
        content: "admin",
      },
    });

    let plantToDelete;

    plantToDelete = await prisma.plant.findUnique({
      where: { id: plantId },
      include: {
        owner: true, // Utilisation de la relation correcte 'owner'
      },
    });

    if (!plantToDelete) {
      return res.status(404).json({ error: "Plant not found" });
    }

    const userWhoOwnsPlant = plantToDelete.owner.id;

    if (isAdmin || userIdFromToken === userWhoOwnsPlant) {
      await prisma.plant.delete({
        where: { id: plantId },
      });
      res.status(200).json({ message: "Plant deleted" });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting plant", details: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
