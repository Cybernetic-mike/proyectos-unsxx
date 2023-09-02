export const uploadFile = (req, res) => {
  if (req.file === null) {
    return;
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    //console.log(re.files)
    return res.status(400).send(req.files);
  }
  let file = req.files.archivo;
  let path = `${__dirname}/${file.name}`;
  file.mv(path, function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
};
