'use client';

import { useAuth } from '../../hooks/useAuth';
import { useLeads } from '../../hooks/useLeads';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { 
  Users, 
  Target, 
  TrendingUp, 
  DollarSign, 
  Plus,
  ArrowRight,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  Calendar,
  Activity
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<any>;
  color: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

function StatCard({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) {
  return (
    <div className="stat-card group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${color} rounded-apple-lg flex items-center justify-center shadow-apple group-hover:shadow-apple-lg transition-all duration-300`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-600">{title}</p>
              <p className="text-2xl font-bold text-neutral-900">{value}</p>
              {subtitle && (
                <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
            trend.isPositive 
              ? 'bg-green-100/80 text-green-700' 
              : 'bg-red-100/80 text-red-700'
          }`}>
            <TrendingUp className={`h-3 w-3 ${trend.isPositive ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: { data: leads = [], stats } = {}, isLoading } = useLeads({ limit: 5 });

  const quickActions = [
    {
      title: 'Dodaj klijenta',
      description: 'Kreiraj novi lead',
      href: '/leads/add',
      icon: Plus,
      color: 'bg-apple-blue',
    },
    {
      title: 'Vidi sve klijente',
      description: 'Upravljaj svim lead-ovima',
      href: '/leads',
      icon: Users,
      color: 'bg-apple-purple',
    },
    {
      title: 'Upravljaj kategorijama',
      description: 'Organizuj kategorije',
      href: '/categories',
      icon: Target,
      color: 'bg-apple-green',
    },
  ];

  const recentLeads = leads.slice(0, 5);

  const getStatusInfo = (status: string) => {
    const statusMap = {
      'NEW': { label: 'Novi', color: 'badge-apple-info', icon: Clock },
      'CONTACTED': { label: 'Kontaktiran', color: 'badge-apple-warning', icon: Activity },
      'QUALIFIED': { label: 'Kvalificiran', color: 'badge-apple-success', icon: CheckCircle },
      'PROPOSAL': { label: 'Prijedlog', color: 'badge-apple-primary', icon: Target },
      'WON': { label: 'Završen', color: 'badge-apple-success', icon: CheckCircle },
      'LOST': { label: 'Izgubljen', color: 'badge-apple-error', icon: AlertTriangle },
      'FOLLOW_UP': { label: 'Praćenje', color: 'badge-apple-neutral', icon: Calendar },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap['NEW'];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('bs-BA', {
      style: 'currency',
      currency: 'BAM',
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen page-transition">
        <Navbar />
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 -z-10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-apple-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-apple-purple rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-center h-64">
            <div className="loading-apple"></div>
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
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8 slide-up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gradient">
                  Dobrodošli nazad, {user?.name}! 👋
                </h1>
                <p className="mt-2 text-neutral-600">
                  Evo pregleda vaših aktivnosti danas
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <div className="glass-card px-4 py-2 rounded-apple">
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date().toLocaleDateString('bs-BA', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 slide-up">
            <StatCard
              title="Ukupno klijenata"
              value={stats?.total || 0}
              subtitle="Svi lead-ovi"
              icon={Users}
              color="bg-apple-blue"
              trend={{ value: '+12%', isPositive: true }}
            />
            <StatCard
              title="Novi klijenti"
              value={stats?.byStatus?.NEW || 0}
              subtitle="Ovaj mjesec"
              icon={Clock}
              color="bg-apple-purple"
              trend={{ value: '+8%', isPositive: true }}
            />
            <StatCard
              title="Završeni"
              value={stats?.byStatus?.WON || 0}
              subtitle="Uspješno zatvoreni"
              icon={CheckCircle}
              color="bg-apple-green"
              trend={{ value: '+15%', isPositive: true }}
            />
            <StatCard
              title="Ukupna vrijednost"
              value={formatCurrency(
                Object.values(stats?.byStatus || {}).reduce((acc: number, count: any) => acc + (count * 1000), 0)
              )}
              subtitle="Procjenjena vrijednost"
              icon={DollarSign}
              color="bg-apple-pink"
              trend={{ value: '+23%', isPositive: true }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1 space-y-6 scale-in">
              <div className="glass-card rounded-apple-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Zap className="h-5 w-5 text-primary-600" />
                  <h2 className="text-lg font-semibold text-neutral-900">Brze akcije</h2>
                </div>
                
                <div className="space-y-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={action.title}
                        href={action.href}
                        className="block group hover-lift"
                      >
                        <div className="flex items-center p-4 glass-card rounded-apple hover:shadow-apple-lg transition-all duration-200">
                          <div className={`w-10 h-10 ${action.color} rounded-apple flex items-center justify-center shadow-soft group-hover:shadow-apple transition-all duration-200`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="text-sm font-medium text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
                              {action.title}
                            </h3>
                            <p className="text-xs text-neutral-500">{action.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="lg:col-span-2 scale-in">
              <div className="glass-card rounded-apple-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-primary-600" />
                    <h2 className="text-lg font-semibold text-neutral-900">Nedavni klijenti</h2>
                  </div>
                  <Link
                    href="/leads"
                    className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
                  >
                    <span>Vidi sve</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {recentLeads.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">Nema klijenata</h3>
                    <p className="text-neutral-500 mb-6">Počnite dodavanjem vašeg prvog klijenta</p>
                    <Link href="/leads/add" className="btn-apple-primary inline-flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Dodaj klijenta
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentLeads.map((lead: any) => {
                      const statusInfo = getStatusInfo(lead.status);
                      const StatusIcon = statusInfo.icon;
                      
                      return (
                        <div
                          key={lead.id}
                          className="flex items-center justify-between p-4 glass-card rounded-apple hover:shadow-apple transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center shadow-soft">
                              <Users className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
                                {lead.title}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`${statusInfo.color} inline-flex items-center`}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {statusInfo.label}
                                </span>
                                {lead.value && (
                                  <span className="text-xs text-neutral-500">
                                    • {formatCurrency(lead.value)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Link
                              href={`/leads/${lead.id}`}
                              className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-white/20 rounded-apple transition-all duration-200"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              href={`/leads/${lead.id}/edit`}
                              className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-white/20 rounded-apple transition-all duration-200"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 