'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      // Error je već handled u useAuth hook-u
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-apple-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-apple-purple rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-40 right-40 w-32 h-32 bg-apple-pink rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="relative w-full max-w-md px-6 slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-apple-blue rounded-apple-lg flex items-center justify-center shadow-apple-lg">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Dobrodošli nazad</h1>
          <p className="text-neutral-600">Prijavite se u vaš LeadList račun</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-8 rounded-apple-xl">
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email adresa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-apple pl-10"
                    placeholder="vaš@email.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Lozinka
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-apple pl-10 pr-10"
                    placeholder="Unesite lozinku"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-apple-primary w-full flex items-center justify-center space-x-2 relative overflow-hidden group"
              >
                {loading ? (
                  <div className="loading-apple"></div>
                ) : (
                  <>
                    <span>Prijavite se</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Quick Login */}
        <div className="mt-6 glass-card p-6 rounded-apple-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-neutral-700">Brza prijava</span>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => {
                setEmail('admin@leadlist.com');
                setPassword('admin123');
              }}
              className="btn-apple w-full text-left"
            >
              <div>
                <div className="font-medium text-sm">Admin račun</div>
                <div className="text-xs text-neutral-500">admin@leadlist.com</div>
              </div>
            </button>
            <button
              onClick={() => {
                setEmail('user@leadlist.com');
                setPassword('user123');
              }}
              className="btn-apple w-full text-left"
            >
              <div>
                <div className="font-medium text-sm">Test korisnik</div>
                <div className="text-xs text-neutral-500">user@leadlist.com</div>
              </div>
            </button>
          </div>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Nemate račun?{' '}
            <Link 
              href="/register" 
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              Registrujte se
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-neutral-400">
            © 2024 LeadList. Sva prava zadržana.
          </p>
        </div>
      </div>
    </div>
  );
} 