'use client';

import { useState } from 'react';
import { useLeads } from '../../hooks/useLeads';
import { useCategories } from '../../hooks/useCategories';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Eye, 
  Edit, 
  Building, 
  Mail, 
  Phone,
  Calendar,
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  Grid,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react';

export default function LeadsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categoriesData } = useCategories();
  const categories = categoriesData || [];

  const { data: leadsData, isLoading } = useLeads({
    search,
    categoryId: categoryFilter,
    status: statusFilter as any,
    priority: priorityFilter as any,
    sortBy,
    sortOrder,
    page: currentPage,
    limit: 12
  });

  const leads = leadsData?.data || [];
  const pagination = leadsData?.pagination;

  const statusOptions = [
    { value: 'NEW', label: 'Novi', color: 'badge-apple-info', icon: Clock },
    { value: 'CONTACTED', label: 'Kontaktiran', color: 'badge-apple-warning', icon: Activity },
    { value: 'QUALIFIED', label: 'Kvalificiran', color: 'badge-apple-success', icon: CheckCircle },
    { value: 'PROPOSAL', label: 'Prijedlog', color: 'badge-apple-primary', icon: Target },
    { value: 'WON', label: 'Završen', color: 'badge-apple-success', icon: CheckCircle },
    { value: 'LOST', label: 'Izgubljen', color: 'badge-apple-error', icon: AlertTriangle },
    { value: 'FOLLOW_UP', label: 'Praćenje', color: 'badge-apple-neutral', icon: Calendar },
  ];

  const priorityOptions = [
    { value: 'LOW', label: 'Niska', color: 'badge-apple-neutral' },
    { value: 'MEDIUM', label: 'Srednja', color: 'badge-apple-info' },
    { value: 'HIGH', label: 'Visoka', color: 'badge-apple-warning' },
    { value: 'URGENT', label: 'Hitno', color: 'badge-apple-error' },
  ];

  const getStatusInfo = (status: string) => {
    return statusOptions.find(s => s.value === status) || statusOptions[0];
  };

  const getPriorityInfo = (priority: string) => {
    return priorityOptions.find(p => p.value === priority) || priorityOptions[0];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('bs-BA', {
      style: 'currency',
      currency: 'BAM',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('bs-BA');
  };

  return (
    <div className="min-h-screen page-transition">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 -z-10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-apple-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-apple-purple rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-40 right-40 w-32 h-32 bg-apple-pink rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8 slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gradient mb-2">Klijenti</h1>
                <p className="text-neutral-600">Upravljajte svim vašim klijentima</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <div className="flex items-center bg-white/30 rounded-apple p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-apple transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-white/60 text-primary-600 shadow-soft' 
                        : 'text-neutral-600 hover:bg-white/30'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-apple transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-white/60 text-primary-600 shadow-soft' 
                        : 'text-neutral-600 hover:bg-white/30'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                
                <Link href="/leads/add" className="btn-apple-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj klijenta
                </Link>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8 glass-card p-6 rounded-apple-lg slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Pretraži klijente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-apple pl-10 text-sm"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="select-apple text-sm"
                >
                  <option value="">Sve kategorije</option>
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="select-apple text-sm"
                >
                  <option value="">Svi statusi</option>
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="select-apple text-sm"
                >
                  <option value="">Svi prioriteti</option>
                  {priorityOptions.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <div className="flex space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="select-apple text-sm flex-1"
                  >
                    <option value="createdAt">Datum kreiranja</option>
                    <option value="title">Naziv</option>
                    <option value="value">Vrijednost</option>
                    <option value="updatedAt">Posljednja izmjena</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="btn-apple p-2"
                  >
                    {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="loading-apple"></div>
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-12 scale-in">
              <div className="glass-card p-12 rounded-apple-lg">
                <Users className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Nema klijenata</h3>
                <p className="text-neutral-500 mb-6">
                  {search || categoryFilter || statusFilter || priorityFilter
                    ? 'Nema klijenata koji odgovaraju vašim filterima'
                    : 'Još uvijek nemate klijente. Dodajte vašeg prvog klijenta.'}
                </p>
                <Link href="/leads/add" className="btn-apple-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj prvog klijenta
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Grid/List View */}
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
              } scale-in`}>
                {leads.map((lead: any, index: number) => {
                  const statusInfo = getStatusInfo(lead.status);
                  const priorityInfo = getPriorityInfo(lead.priority);
                  const StatusIcon = statusInfo.icon;

                  if (viewMode === 'grid') {
                    return (
                      <div key={lead.id} className="lead-card">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                              {lead.title}
                            </h3>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className={`${statusInfo.color} inline-flex items-center`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusInfo.label}
                              </span>
                              <span className={priorityInfo.color}>
                                {priorityInfo.label}
                              </span>
                            </div>
                          </div>
                          {lead.value && (
                            <div className="text-right">
                              <span className="text-xl font-bold text-primary-600">
                                {formatCurrency(lead.value)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Lead Info */}
                        <div className="space-y-2 mb-4">
                          {lead.company && (
                            <div className="flex items-center text-sm text-neutral-600">
                              <Building className="h-4 w-4 mr-2 text-neutral-400" />
                              {lead.company}
                            </div>
                          )}
                          {lead.email && (
                            <div className="flex items-center text-sm text-neutral-600">
                              <Mail className="h-4 w-4 mr-2 text-neutral-400" />
                              {lead.email}
                            </div>
                          )}
                          {lead.phone && (
                            <div className="flex items-center text-sm text-neutral-600">
                              <Phone className="h-4 w-4 mr-2 text-neutral-400" />
                              {lead.phone}
                            </div>
                          )}
                          <div className="flex items-center text-sm text-neutral-500">
                            <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
                            {formatDate(lead.createdAt)}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/leads/${lead.id}`}
                            className="btn-apple flex-1 justify-center text-sm"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Vidi
                          </Link>
                          <Link
                            href={`/leads/${lead.id}/edit`}
                            className="btn-apple-primary text-sm p-2"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    );
                  } else {
                    // List view
                    return (
                      <div key={lead.id} className="glass-card p-4 rounded-apple hover:shadow-apple transition-all duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="w-12 h-12 bg-apple-blue rounded-apple flex items-center justify-center shadow-soft">
                              <Users className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-neutral-900">{lead.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-neutral-600">
                                {lead.company && (
                                  <span className="flex items-center">
                                    <Building className="h-4 w-4 mr-1" />
                                    {lead.company}
                                  </span>
                                )}
                                {lead.email && (
                                  <span className="flex items-center">
                                    <Mail className="h-4 w-4 mr-1" />
                                    {lead.email}
                                  </span>
                                )}
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {formatDate(lead.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`${statusInfo.color} text-xs`}>
                                  <StatusIcon className="h-3 w-3 mr-1 inline" />
                                  {statusInfo.label}
                                </span>
                                <span className={`${priorityInfo.color} text-xs`}>
                                  {priorityInfo.label}
                                </span>
                              </div>
                              {lead.value && (
                                <span className="text-lg font-bold text-primary-600">
                                  {formatCurrency(lead.value)}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Link
                                href={`/leads/${lead.id}`}
                                className="btn-apple text-sm"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Vidi
                              </Link>
                              <Link
                                href={`/leads/${lead.id}/edit`}
                                className="btn-apple-primary text-sm p-2"
                              >
                                <Edit className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="mt-8 flex justify-center scale-in">
                  <div className="glass-card p-2 rounded-apple-lg">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="btn-apple text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Prethodna
                      </button>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-apple text-sm transition-all duration-200 ${
                              page === currentPage
                                ? 'bg-primary-600 text-white shadow-apple'
                                : 'text-neutral-600 hover:bg-white/30'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                        disabled={currentPage === pagination.pages}
                        className="btn-apple text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sljedeća
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
} 