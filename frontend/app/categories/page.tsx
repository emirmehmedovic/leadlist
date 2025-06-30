'use client';

import { useState } from 'react';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../../hooks/useCategories';
import Navbar from '../../components/Navbar';
import { 
  Plus, 
  Edit, 
  Trash2, 
  FolderOpen, 
  Save, 
  X, 
  Target,
  Palette,
  Hash,
  Users,
  Search,
  Calendar
} from 'lucide-react';

interface CategoryFormProps {
  category?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

function CategoryForm({ category, onSubmit, onCancel, isLoading }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || '');
  const [description, setDescription] = useState(category?.description || '');
  const [color, setColor] = useState(category?.color || '#3b82f6');

  const colorOptions = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
    '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16',
    '#f97316', '#6366f1', '#14b8a6', '#eab308'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, color });
  };

  return (
    <div className="glass-card p-6 rounded-apple-lg">
      <h3 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center">
        <FolderOpen className="h-5 w-5 mr-2 text-primary-600" />
        {category ? 'Uredi kategoriju' : 'Nova kategorija'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Naziv kategorije
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-apple"
            placeholder="Unesite naziv kategorije"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Opis (opcionalno)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="textarea-apple"
            placeholder="Opišite kategoriju..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            <Palette className="h-4 w-4 inline mr-1" />
            Boja kategorije
          </label>
          <div className="grid grid-cols-6 gap-3">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                onClick={() => setColor(colorOption)}
                className={`w-10 h-10 rounded-apple shadow-apple transition-all duration-200 hover:scale-110 ${
                  color === colorOption ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                }`}
                style={{ backgroundColor: colorOption }}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <div
              className="w-6 h-6 rounded-apple shadow-soft"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-neutral-600">{color}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-apple-primary flex-1"
          >
            {isLoading ? (
              <div className="loading-apple"></div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {category ? 'Sačuvaj izmjene' : 'Kreiraj kategoriju'}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-apple"
          >
            <X className="h-4 w-4 mr-2" />
            Otkaži
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CategoriesPage() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const { data: categoriesData, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const categories = categoriesData || [];
  const filteredCategories = categories.filter((category: any) =>
    category.name.toLowerCase().includes(search.toLowerCase()) ||
    category.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateSubmit = async (data: any) => {
    try {
      await createCategory.mutateAsync(data);
      setShowForm(false);
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleUpdateSubmit = async (data: any) => {
    if (!editingCategory) return;
    
    try {
      await updateCategory.mutateAsync({
        id: editingCategory.id,
        data
      });
      setEditingCategory(null);
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleDelete = async (category: any) => {
    if (window.confirm(`Da li ste sigurni da želite da obrišete kategoriju "${category.name}"?`)) {
      try {
        await deleteCategory.mutateAsync(category.id);
      } catch (error) {
        // Error handled by hook
      }
    }
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
      
      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8 relative">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8 slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gradient mb-2">Kategorije</h1>
                <p className="text-neutral-600">Organizujte klijente prema kategorijama</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-apple-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova kategorija
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6 glass-card p-4 rounded-apple-lg slide-up">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Pretraži kategorije..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-apple pl-10"
              />
            </div>
          </div>

          {/* Form */}
          {(showForm || editingCategory) && (
            <div className="mb-8 scale-in">
              <CategoryForm
                category={editingCategory}
                onSubmit={editingCategory ? handleUpdateSubmit : handleCreateSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingCategory(null);
                }}
                isLoading={createCategory.isLoading || updateCategory.isLoading}
              />
            </div>
          )}

          {/* Categories Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="loading-apple"></div>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-12 scale-in">
              <div className="glass-card p-12 rounded-apple-lg">
                <FolderOpen className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {search ? 'Nema rezultata' : 'Nema kategorija'}
                </h3>
                <p className="text-neutral-500 mb-6">
                  {search 
                    ? 'Nema kategorija koje odgovaraju vašoj pretrazi'
                    : 'Kreirajte vašu prvu kategoriju za organizaciju klijenata'
                  }
                </p>
                {!search && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-apple-primary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Kreiraj prvu kategoriju
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scale-in">
              {filteredCategories.map((category: any) => (
                <div key={category.id} className="glass-card p-6 rounded-apple-lg hover:shadow-apple-lg transition-all duration-300 group">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 rounded-apple-lg flex items-center justify-center shadow-apple group-hover:shadow-apple-lg transition-all duration-300"
                        style={{ backgroundColor: category.color }}
                      >
                        <FolderOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
                          {category.name}
                        </h3>
                        <div className="flex items-center text-sm text-neutral-500">
                          <Hash className="h-3 w-3 mr-1" />
                          {category.color}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-white/20 rounded-apple transition-all duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category)}
                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50/50 rounded-apple transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  {category.description && (
                    <div className="mb-4">
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-neutral-600">
                        <Users className="h-4 w-4 mr-2" />
                        Klijenti
                      </div>
                      <span className="font-semibold text-primary-600">
                        {category.leadCount || 0}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-neutral-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Kreirana
                      </div>
                      <span className="text-neutral-500">
                        {formatDate(category.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Color Preview */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">Boja kategorije</span>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-6 h-6 rounded-apple shadow-soft"
                          style={{ backgroundColor: category.color }}
                        />
                        <code className="text-xs text-neutral-400 bg-neutral-50/50 px-2 py-1 rounded">
                          {category.color}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 