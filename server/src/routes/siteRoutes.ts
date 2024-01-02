import express, { Request, Response } from 'express';
import SiteSchema from '../mongodb/models/site';

const router = express.Router();



// Get all touristic sites
router.get('/', async (req: Request, res: Response) => {
  try {
    const sites = await SiteSchema.find();
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: "Api request failed" });
  }
});



// Add a new touristic site
router.post('/', async (req: Request, res: Response) => {
  const newSiteSchema = new SiteSchema({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    category: req.body.category,
    images: req.body.images
  });

  try {
    const savedSiteSchema = await newSiteSchema.save();
    res.status(201).json(savedSiteSchema);
  } catch (error) {
    res.status(400).json({ message: "Api request failed" });
  }
});



// Update a specific touristic site by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, location } = req.body;

  try {
    const updatedSite = await SiteSchema.findByIdAndUpdate(id, { name, description, location }, { new: true });
    if (!updatedSite) {
      return res.status(404).json({ message: 'Touristic site not found' });
    }
    res.json(updatedSite);
  } catch (error) {
    res.status(500).json({ message: "Api request failed" });
  }
});



// Delete a specific touristic site by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedSite = await SiteSchema.findByIdAndDelete(id);
    if (!deletedSite) {
      return res.status(404).json({ message: 'Touristic site not found' });
    }
    res.json({ message: 'Touristic site successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: "Api request failed" });
  }
});


export default router;
