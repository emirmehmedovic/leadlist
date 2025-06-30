'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLead, useUpdateLead, useDeleteLead } from '../../../hooks/useLeads';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  Building, 
  Calendar,
  DollarSign,
  Tag,
  User,
  AlertTriangle,
  CheckCircle,
  Save,
  Clock,
  Target,
  Activity,
  FileText,
  MessageCircle,
  Star,
  TrendingUp,
  Zap,
  Shield
} from 'lucide-react';

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;
  
  const { data: lead, isLoading } = useLead(leadId);
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    status: lead?.status || '',
    priority: lead?.priority || '',
    notes: lead?.notes || '',
    actions: lead?.actions || '',
  });

  const statusOptions = [
    { value: 'NEW', label: 'Novi', color: 'badge-apple-primary', icon: Target, bgColor: 'bg-blue-500' },
    { value: 'CONTACTED', label: 'Kontaktiran', color: 'badge-apple-warning', icon: Phone, bgColor: 'bg-yellow-500' },
    { value: 'QUALIFIED', label: 'Kvalificiran', color: 'badge-apple-success', icon: CheckCircle, bgColor: 'bg-green-500' },
    { value: 'PROPOSAL', label: 'Prijedlog', color: 'badge-apple-purple', icon: FileText, bgColor: 'bg-purple-500' },
    { value: 'WON', label: 'Završen', color: 'badge-apple-success', icon: Star, bgColor: 'bg-emerald-500' },
    { value: 'LOST', label: 'Izgubljen', color: 'badge-apple-error', icon: AlertTriangle, bgColor: 'bg-red-500' },
    { value: 'FOLLOW_UP', label: 'Praćenje', color: 'badge-apple-orange', icon: Activity, bgColor: 'bg-orange-500' },
  ];

  const priorityOptions = [
    { value: 'LOW', label: 'Niska', color: 'badge-apple-success', icon: Shield },
    { value: 'MEDIUM', label: 'Srednja', color: 'badge-apple-warning', icon: Clock },
    { value: 'HIGH', label: 'Visoka', color: 'badge-apple-orange', icon: TrendingUp },
    { value: 'URGENT', label: 'Hitno', color: 'badge-apple-error', icon: Zap },
  ];

  const getStatusInfo = (status: string) => {
    return statusOptions.find(s => s.value === status) || { 
      value: status, 
      label: status, 
      color: 'badge-apple-neutral',
      icon: Target,
      bgColor: 'bg-gray-500' 
    };
  };

  const getPriorityInfo = (priority: string) => {
    return priorityOptions.find(p => p.value === priority) || { 
      value: priority, 
      label: priority, 
      color: 'badge-apple-neutral',
      icon: Clock 
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('bs-BA', {
      style: 'currency',
      currency: 'BAM',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('bs-BA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleStatusUpdate = async (status: string) => {
    try {
      await updateLead.mutateAsync({
        id: leadId,
        data: { status: status as any }
      });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleQuickUpdate = async () => {
    try {
      await updateLead.mutateAsync({
        id: leadId,
        data: {
          status: formData.status as any,
          priority: formData.priority as any,
          notes: formData.notes,
          actions: formData.actions,
        }
      });
      setIsEditing(false);
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovog klijenta?')) {
      try {
        await deleteLead.mutateAsync(leadId);
        router.push('/leads');
      } catch (error) {
        // Error handled by hook
      }
    }
  };

  const startEditing = () => {
    setFormData({
      status: lead?.status || '',
      priority: lead?.priority || '',
      notes: lead?.notes || '',
      actions: lead?.actions || '',
    });
    setIsEditing(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen page-transition">
        <Navbar />
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 -z-10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-apple-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center py-12">
            <div className="glass-card p-8 rounded-apple-xl">
              <div className="loading-apple"></div>
              <p className="text-neutral-600 mt-4">Učitavam detalje...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen page-transition">
        <Navbar />
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 -z-10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-apple-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="glass-card p-12 rounded-apple-xl text-center">
            <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Klijent nije pronađen</h1>
            <p className="text-neutral-600 mb-6">Možda je klijent obrisan ili ne postoji.</p>
            <Link href="/leads" className="btn-apple-primary">
              Nazad na klijente
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const statusInfo = getStatusInfo(lead.status);
  const priorityInfo = getPriorityInfo(lead.priority);

  return (
    <div className="min-h-screen page-transition">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 -z-10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-apple-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-apple-purple rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-40 right-40 w-32 h-32 bg-apple-pink rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      
      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8 relative">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8 slide-up">
            <div className="flex items-center mb-6">
              <Link
                href="/leads"
                className="inline-flex items-center px-4 py-2 text-sm text-neutral-600 hover:text-primary-600 bg-white/30 hover:bg-white/50 rounded-apple transition-all duration-200 backdrop-blur-md"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Nazad na klijente
              </Link>
            </div>
            
            <div className="glass-card p-8 rounded-apple-xl">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 ${statusInfo.bgColor} rounded-apple-lg flex items-center justify-center shadow-apple`}>
                      <statusInfo.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gradient">{lead.title}</h1>
                      <p className="text-neutral-600 mt-1">
                        {lead.company && (
                          <span className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            {lead.company}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`${statusInfo.color} inline-flex items-center`}>
                      <statusInfo.icon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </span>
                    <span className={`${priorityInfo.color} inline-flex items-center`}>
                      <priorityInfo.icon className="h-3 w-3 mr-1" />
                      {priorityInfo.label}
                    </span>
                    {lead.value && (
                      <span className="text-lg font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-apple">
                        <DollarSign className="h-4 w-4 inline mr-1" />
                        {formatCurrency(lead.value)}
                      </span>
                    )}
                    {lead.category && (
                      <span className="badge-apple-purple">
                        <Tag className="h-3 w-3 mr-1" />
                        {lead.category.name}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/leads/${leadId}/edit`}
                    className="btn-apple-primary"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Izmijeni
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="btn-apple-error"
                    disabled={deleteLead.isLoading}
                  >
                    {deleteLead.isLoading ? (
                      <div className="loading-apple"></div>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Obriši
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 scale-in">
              {/* Contact Information */}
              <div className="glass-card p-6 rounded-apple-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="h-5 w-5 text-primary-600" />
                  <h3 className="text-xl font-semibold text-neutral-900">Kontakt informacije</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lead.email && (
                    <div className="flex items-start space-x-3 p-4 bg-white/30 rounded-apple backdrop-blur-sm">
                      <div className="w-10 h-10 bg-apple-blue rounded-apple flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Email adresa</p>
                        <a 
                          href={`mailto:${lead.email}`}
                          className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          {lead.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {lead.phone && (
                    <div className="flex items-start space-x-3 p-4 bg-white/30 rounded-apple backdrop-blur-sm">
                      <div className="w-10 h-10 bg-apple-green rounded-apple flex items-center justify-center">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Broj telefona</p>
                        <a 
                          href={`tel:${lead.phone}`}
                          className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          {lead.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {lead.description && (
                <div className="glass-card p-6 rounded-apple-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="h-5 w-5 text-primary-600" />
                    <h3 className="text-xl font-semibold text-neutral-900">Opis</h3>
                  </div>
                  <div className="prose prose-neutral max-w-none">
                    <p className="text-neutral-700 leading-relaxed">{lead.description}</p>
                  </div>
                </div>
              )}

              {/* Notes & Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lead.notes && (
                  <div className="glass-card p-6 rounded-apple-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <MessageCircle className="h-5 w-5 text-primary-600" />
                      <h3 className="text-lg font-semibold text-neutral-900">Napomene</h3>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">{lead.notes}</p>
                  </div>
                )}
                
                {lead.actions && (
                  <div className="glass-card p-6 rounded-apple-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <Activity className="h-5 w-5 text-primary-600" />
                      <h3 className="text-lg font-semibold text-neutral-900">Akcije</h3>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">{lead.actions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 scale-in" style={{ animationDelay: '0.2s' }}>
              {/* Quick Status Change */}
              <div className="glass-card p-6 rounded-apple-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-neutral-900">Brza promjena statusa</h3>
                </div>
                
                <div className="space-y-3">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusUpdate(option.value)}
                      disabled={updateLead.isLoading || lead.status === option.value}
                      className={`w-full flex items-center space-x-3 p-3 rounded-apple transition-all ${
                        lead.status === option.value
                          ? 'bg-white/50 border-2 border-primary-200'
                          : 'bg-white/20 hover:bg-white/30'
                      } ${updateLead.isLoading ? 'opacity-50' : ''}`}
                    >
                      <div className={`w-8 h-8 ${option.bgColor} rounded-apple flex items-center justify-center`}>
                        <option.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-neutral-700">{option.label}</span>
                      {lead.status === option.value && (
                        <CheckCircle className="h-4 w-4 text-primary-600 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Meta Information */}
              <div className="glass-card p-6 rounded-apple-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-neutral-900">Informacije</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">Kreiran:</span>
                    <span className="font-medium">{formatDate(lead.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">Posljednja izmjena:</span>
                    <span className="font-medium">{formatDate(lead.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Quick Edit */}
              {isEditing && (
                <div className="glass-card p-6 rounded-apple-xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <Edit className="h-5 w-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-neutral-900">Brze izmjene</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="select-apple"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Prioritet</label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                        className="select-apple"
                      >
                        {priorityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Napomene</label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        rows={3}
                        className="textarea-apple"
                        placeholder="Dodajte napomene..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Akcije</label>
                      <textarea
                        value={formData.actions}
                        onChange={(e) => setFormData({...formData, actions: e.target.value})}
                        rows={3}
                        className="textarea-apple"
                        placeholder="Dodajte akcije..."
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={handleQuickUpdate}
                        disabled={updateLead.isLoading}
                        className="btn-apple-success flex-1"
                      >
                        {updateLead.isLoading ? (
                          <div className="loading-apple"></div>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Sačuvaj
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-apple"
                      >
                        Otkaži
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 