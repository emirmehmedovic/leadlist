'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLead, useUpdateLead } from '../../../../hooks/useLeads';
import { useCategories } from '../../../../hooks/useCategories';
import Navbar from '../../../../components/Navbar';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Building, 
  Mail, 
  Phone, 
  Target, 
  DollarSign,
  Tag,
  FileText,
  Activity,
  AlertTriangle,
  Edit,
  Loader
} from 'lucide-react';

export default function EditLeadPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;
  
  const { data: lead, isLoading } = useLead(leadId);
  const { data: categoriesData } = useCategories();
  const categories = categoriesData || [];
  const updateLead = useUpdateLead();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
    phone: '',
    company: '',
    status: 'NEW',
    priority: 'MEDIUM',
    value: '',
    notes: '',
    actions: '',
    categoryId: '',
  });

  // Populate form when lead data is loaded
  useEffect(() => {
    if (lead) {
      setFormData({
        title: lead.title || '',
        description: lead.description || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        status: lead.status || 'NEW',
        priority: lead.priority || 'MEDIUM',
        value: lead.value ? lead.value.toString() : '',
        notes: lead.notes || '',
        actions: lead.actions || '',
        categoryId: lead.categoryId || '',
      });
    }
  }, [lead]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = {
        ...formData,
        value: formData.value ? parseFloat(formData.value) : undefined,
      };
      
      await updateLead.mutateAsync({
        id: leadId,
        data: data as any
      });
      
      router.push(`/leads/${leadId}`);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const statusOptions = [
    { value: 'NEW', label: 'Novi', color: 'text-blue-600', icon: Target },
    { value: 'CONTACTED', label: 'Kontaktiran', color: 'text-yellow-600', icon: Phone },
    { value: 'QUALIFIED', label: 'Kvalificiran', color: 'text-green-600', icon: User },
    { value: 'PROPOSAL', label: 'Prijedlog', color: 'text-purple-600', icon: FileText },
    { value: 'WON', label: 'Završen', color: 'text-emerald-600', icon: Target },
    { value: 'LOST', label: 'Izgubljen', color: 'text-red-600', icon: AlertTriangle },
    { value: 'FOLLOW_UP', label: 'Praćenje', color: 'text-orange-600', icon: Activity },
  ];

  const priorityOptions = [
    { value: 'LOW', label: 'Niska', color: 'text-green-600' },
    { value: 'MEDIUM', label: 'Srednja', color: 'text-yellow-600' },
    { value: 'HIGH', label: 'Visoka', color: 'text-orange-600' },
    { value: 'URGENT', label: 'Hitno', color: 'text-red-600' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen page-transition">
        <Navbar />
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 -z-10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-apple-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-apple-purple rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 relative">
          <div className="flex justify-center py-12">
            <div className="glass-card p-8 rounded-apple-xl">
              <div className="flex items-center space-x-3">
                <div className="loading-apple"></div>
                <p className="text-neutral-600">Učitavam podatke...</p>
              </div>
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
        
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 relative">
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

  return (
    <div className="min-h-screen page-transition">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 -z-10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-apple-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-apple-purple rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-40 right-40 w-32 h-32 bg-apple-pink rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 relative">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8 slide-up">
            <div className="flex items-center mb-6">
              <Link
                href={`/leads/${leadId}`}
                className="inline-flex items-center px-4 py-2 text-sm text-neutral-600 hover:text-primary-600 bg-white/30 hover:bg-white/50 rounded-apple transition-all duration-200 backdrop-blur-md"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Nazad na detalje
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-apple-blue rounded-apple-lg flex items-center justify-center shadow-apple-lg">
                <Edit className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">Uredi klijenta</h1>
                <p className="text-neutral-600 mt-1">Ažuriraj informacije o klijentu "{lead.title}"</p>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="space-y-8 scale-in">
            {/* Basic Information */}
            <div className="glass-card p-8 rounded-apple-xl">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-5 w-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-neutral-900">Osnovne informacije</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                    Naziv klijenta *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input-apple"
                    placeholder="Unesite naziv klijenta ili projekta"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                    <Building className="h-4 w-4 inline mr-1" />
                    Kompanija
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="input-apple"
                    placeholder="Naziv kompanije"
                  />
                </div>

                <div>
                  <label htmlFor="categoryId" className="block text-sm font-medium text-neutral-700 mb-2">
                    <Tag className="h-4 w-4 inline mr-1" />
                    Kategorija *
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="select-apple"
                    required
                  >
                    <option value="">Odaberite kategoriju</option>
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email adresa
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-apple"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Broj telefona
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-apple"
                    placeholder="+387 60 123 4567"
                  />
                </div>
              </div>
            </div>

            {/* Status & Priority */}
            <div className="glass-card p-8 rounded-apple-xl">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-5 w-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-neutral-900">Status i prioritet</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
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
                  <label htmlFor="priority" className="block text-sm font-medium text-neutral-700 mb-2">
                    Prioritet
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
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
                  <label htmlFor="value" className="block text-sm font-medium text-neutral-700 mb-2">
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    Vrijednost (BAM)
                  </label>
                  <input
                    type="number"
                    id="value"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    className="input-apple"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Description & Notes */}
            <div className="glass-card p-8 rounded-apple-xl">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-5 w-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-neutral-900">Dodatne informacije</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                    Opis klijenta
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="textarea-apple"
                    placeholder="Opišite klijenta, potrebe, zahtjeve..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-2">
                      Napomene
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="textarea-apple"
                      placeholder="Dodatne napomene o klijentu..."
                    />
                  </div>

                  <div>
                    <label htmlFor="actions" className="block text-sm font-medium text-neutral-700 mb-2">
                      Akcije
                    </label>
                    <textarea
                      id="actions"
                      name="actions"
                      value={formData.actions}
                      onChange={handleChange}
                      rows={3}
                      className="textarea-apple"
                      placeholder="Šta je urađeno ili planira se..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="glass-card p-6 rounded-apple-xl">
              <div className="flex items-center justify-end space-x-4">
                <Link
                  href={`/leads/${leadId}`}
                  className="btn-apple"
                >
                  Otkaži
                </Link>
                <button
                  type="submit"
                  disabled={updateLead.isLoading}
                  className="btn-apple-success flex items-center space-x-2"
                >
                  {updateLead.isLoading ? (
                    <div className="loading-apple"></div>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Sačuvaj promjene</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 