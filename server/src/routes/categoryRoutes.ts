import express, {Request, Response} from 'express'
import CategorySchema from '../mongodb/models/category';

const router = express.Router();



// Get all Categories
router.get('/', async (req: Request, res: Response) => {
    try{
        const categories = await CategorySchema.find();
        res.json(categories)
    } catch(error) {
        res.status(500).json({ message: "Api request failed" });
    }
});



// Create a category
router.post('/', async (req: Request, res: Response) => {
    try{
        const newCategory = new CategorySchema({
            name : req.body.name,
            description : req.body.description
        });

        const savedCategory = await newCategory.save();
        res.json(savedCategory)
    } catch(error) {
        res.status(400).json({ message: "Api request failed" });
    }
});



// Update a specific category by ID
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
  
    try {
        const updatedCategory = await CategorySchema.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: "Api request failed" });
    }
});



// Delete a specific Category by ID
router.delete('/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
  
    try {
        const deletedCategory = await CategorySchema.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: "Api request failed" });
    }
  });
  
  
  export default router;
  