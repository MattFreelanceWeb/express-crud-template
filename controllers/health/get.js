

exports.get = async (req, res) => {
  console.log("getOne heatl route")
  
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
};

try {
    res.status(200).send(healthCheck);
} catch (error) {
    healthCheck.message = error;
    res.status(503).send();
}
};