import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Validation schemas
const createLeadSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'FOLLOW_UP']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  value: z.number().positive().optional(),
  notes: z.string().optional(),
  actions: z.string().optional(),
  categoryId: z.string().min(1)
});

const updateLeadSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'FOLLOW_UP']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  value: z.number().positive().optional(),
  notes: z.string().optional(),
  actions: z.string().optional(),
  categoryId: z.string().min(1).optional()
});

// Get all leads with filtering and search
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const {
      page = '1',
      limit = '10',
      search,
      categoryId,
      status,
      priority,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {
      userId: req.user!.id
    };

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { company: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId as string;
    }

    if (status) {
      where.status = status as string;
    }

    if (priority) {
      where.priority = priority as string;
    }

    // Get total count
    const total = await prisma.lead.count({ where });

    // Get leads
    const leads = await prisma.lead.findMany({
      where,
      include: {
        category: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: {
        [sortBy as string]: sortOrder as 'asc' | 'desc'
      },
      skip,
      take: limitNum
    });

    res.json({
      data: leads,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch leads'
    });
  }
});

// Get lead by ID
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.findFirst({
      where: {
        id,
        userId: req.user!.id
      },
      include: {
        category: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!lead) {
      return res.status(404).json({
        error: 'Lead not found',
        message: 'The requested lead does not exist or you do not have access to it'
      });
    }

    res.json(lead);
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch lead'
    });
  }
});

// Create lead
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const validatedData = createLeadSchema.parse(req.body);

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: validatedData.categoryId }
    });

    if (!category) {
      return res.status(400).json({
        error: 'Invalid category',
        message: 'The specified category does not exist'
      });
    }

    const lead = await prisma.lead.create({
      data: {
        ...validatedData,
        userId: req.user!.id
      },
      include: {
        category: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json(lead);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        message: error.errors[0].message,
        details: error.errors
      });
    }

    console.error('Create lead error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create lead'
    });
  }
});

// Update lead
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const validatedData = updateLeadSchema.parse(req.body);

    // Check if lead exists and belongs to user
    const existingLead = await prisma.lead.findFirst({
      where: {
        id,
        userId: req.user!.id
      }
    });

    if (!existingLead) {
      return res.status(404).json({
        error: 'Lead not found',
        message: 'The requested lead does not exist or you do not have access to it'
      });
    }

    // Verify category exists if categoryId is provided
    if (validatedData.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: validatedData.categoryId }
      });

      if (!category) {
        return res.status(400).json({
          error: 'Invalid category',
          message: 'The specified category does not exist'
        });
      }
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: validatedData,
      include: {
        category: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json(lead);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        message: error.errors[0].message,
        details: error.errors
      });
    }

    console.error('Update lead error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update lead'
    });
  }
});

// Delete lead
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Check if lead exists and belongs to user
    const existingLead = await prisma.lead.findFirst({
      where: {
        id,
        userId: req.user!.id
      }
    });

    if (!existingLead) {
      return res.status(404).json({
        error: 'Lead not found',
        message: 'The requested lead does not exist or you do not have access to it'
      });
    }

    await prisma.lead.delete({
      where: { id }
    });

    res.json({
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete lead'
    });
  }
});

// Get lead statistics
router.get('/stats/overview', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const [
      totalLeads,
      statusStats,
      priorityStats,
      recentLeads,
      valueStats
    ] = await Promise.all([
      // Total leads count
      prisma.lead.count({
        where: { userId }
      }),
      
      // Status distribution
      prisma.lead.groupBy({
        by: ['status'],
        where: { userId },
        _count: { status: true }
      }),
      
      // Priority distribution
      prisma.lead.groupBy({
        by: ['priority'],
        where: { userId },
        _count: { priority: true }
      }),
      
      // Recent leads (last 7 days)
      prisma.lead.count({
        where: {
          userId,
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Total value and won value
      prisma.lead.aggregate({
        where: { userId },
        _sum: { value: true },
        _count: { value: true }
      })
    ]);

    // Calculate won value
    const wonValue = await prisma.lead.aggregate({
      where: {
        userId,
        status: 'WON'
      },
      _sum: { value: true }
    });

    // Initialize status counts
    const byStatus = {
      NEW: 0,
      CONTACTED: 0,
      QUALIFIED: 0,
      PROPOSAL: 0,
      WON: 0,
      LOST: 0,
      FOLLOW_UP: 0
    };

    // Initialize priority counts
    const byPriority = {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
      URGENT: 0
    };

    // Fill in actual counts
    statusStats.forEach(item => {
      byStatus[item.status as keyof typeof byStatus] = item._count.status;
    });

    priorityStats.forEach(item => {
      byPriority[item.priority as keyof typeof byPriority] = item._count.priority;
    });

    const totalValue = valueStats._sum.value || 0;
    const leadCount = valueStats._count.value || 0;

    res.json({
      total: totalLeads,
      byStatus,
      byPriority,
      totalValue,
      avgValue: leadCount > 0 ? totalValue / leadCount : 0,
      recent: recentLeads
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch statistics'
    });
  }
});

export default router; 