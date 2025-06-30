import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Validation schemas
const createCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional()
});

const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional()
});

// Get all categories
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { leads: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json(categories.map(category => ({
      ...category,
      leadCount: category._count.leads
    })));
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch categories'
    });
  }
});

// Get category by ID
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        leads: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { leads: true }
        }
      }
    });

    if (!category) {
      return res.status(404).json({
        error: 'Category not found',
        message: 'The requested category does not exist'
      });
    }

    res.json({
      ...category,
      leadCount: category._count.leads
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch category'
    });
  }
});

// Create category
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const validatedData = createCategorySchema.parse(req.body);

    // Check if category name already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name: validatedData.name }
    });

    if (existingCategory) {
      return res.status(400).json({
        error: 'Category already exists',
        message: 'A category with this name already exists'
      });
    }

    const category = await prisma.category.create({
      data: validatedData
    });

    res.status(201).json(category);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        message: error.errors[0].message,
        details: error.errors
      });
    }

    console.error('Create category error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create category'
    });
  }
});

// Update category
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const validatedData = updateCategorySchema.parse(req.body);

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id }
    });

    if (!existingCategory) {
      return res.status(404).json({
        error: 'Category not found',
        message: 'The requested category does not exist'
      });
    }

    // Check if new name conflicts with existing category
    if (validatedData.name && validatedData.name !== existingCategory.name) {
      const nameConflict = await prisma.category.findUnique({
        where: { name: validatedData.name }
      });

      if (nameConflict) {
        return res.status(400).json({
          error: 'Category name already exists',
          message: 'A category with this name already exists'
        });
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data: validatedData
    });

    res.json(category);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        message: error.errors[0].message,
        details: error.errors
      });
    }

    console.error('Update category error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update category'
    });
  }
});

// Delete category
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { leads: true }
        }
      }
    });

    if (!existingCategory) {
      return res.status(404).json({
        error: 'Category not found',
        message: 'The requested category does not exist'
      });
    }

    // Check if category has leads
    if (existingCategory._count.leads > 0) {
      return res.status(400).json({
        error: 'Cannot delete category',
        message: `This category has ${existingCategory._count.leads} lead(s) associated with it. Please move or delete the leads first.`
      });
    }

    await prisma.category.delete({
      where: { id }
    });

    res.json({
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete category'
    });
  }
});

export default router; 