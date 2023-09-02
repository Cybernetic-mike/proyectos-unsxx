import Author from "../models/author.model.js";

export const getAuthors = async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
};

export const createAuthor = async(req,res)=>{
  const {registration, firstname, lastname, area, career, email, date}=req.body

    try{

        const emailFound = await Author.findOne({email});
        if(emailFound)
        return res.status(400).json(["El correo ya existe"]);

        const registrationFound = await Author.findOne({registration});
        if(registrationFound)
        return res.status(500).json(["Matricula ya registrada"]);

        const newAuthor = new Author({
          registration,
          firstname,
          lastname,
          area,
          career,
          email,
          date,
          user: req.user.id
        });
        const authorSaved= await newAuthor.save();
        res.json(authorSaved);
        
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const getAuthor = async(req,res)=>{
  const author = await Author.findById(req.params.id).populate('user');
  if(!author) return res.status(404).json({message: 'Autor no funciona'})
  res.json(author)
};

export const deleteAuthor = async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author)
    return res.status(404).json({ message: "No se pudo eliminar el proyecto" });
  return res.sendStatus(204);
};

export const updateAuthor = async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log(author);
  if (!author)
    return res
      .status(404)
      .json({ message: "No se pudo actualizar los datos del autor" });
  res.json(author);
};