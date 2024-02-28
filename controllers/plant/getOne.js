const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getOne = async (req, res) => {
  console.log("get one plant ", req);

  const plantId = parseInt(req.params.plantId);

  try {
    const plants = await prisma.plant.findUnique({
      where: {
        id: plantId,
      },
      include : {
        comment:true,
        owner:true
      }
    });

    res.status(200).json({ message: "Plants retrieved", data: plants });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving plants", details: error.message });
  } finally {
    console.log(res);
    await prisma.$disconnect();
  }
};
