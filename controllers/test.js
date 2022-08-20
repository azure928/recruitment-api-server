const test = async (req, res) => {
  try {
    console.log('test working');

    res.status(200).send('hi!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { test };
