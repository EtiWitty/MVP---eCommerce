exports.sayHi = (req, res) => {
  // export this method so to use in routes
  res.json({ message:'hello there' });
}; 