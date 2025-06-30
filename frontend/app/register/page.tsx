'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, Check } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Lozinke se ne slažu');
      return;
    }

    try {
      await register(email, password, name);
    } catch (error) {
      // Error je već handled u useAuth hook-u
    }
  };

  const passwordRequirements = [
    { text: 'Najmanje 8 karaktera', met: password.length >= 8 },
    { text: 'Jedno veliko slovo', met: /[A-Z]/.test(password) },
    { text: 'Jedan broj', met: /\d/.test(password) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-apple-green rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-apple-pink rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-40 right-40 w-32 h-32 bg-apple-purple rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="relative w-full max-w-lg px-6 slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-apple-green rounded-apple-lg flex items-center justify-center shadow-apple-lg">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Pridružite se</h1>
          <p className="text-neutral-600">Kreirajte vaš LeadList račun</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-8 rounded-apple-xl">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  Ime i prezime
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-apple pl-10"
                    placeholder="Vaše ime i prezime"
                  />
                </div>
              </div>

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
                    placeholder="Kreirajte lozinku"
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

              {/* Password Requirements */}
              {password && (
                <div className="glass-card p-4 rounded-apple">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-medium text-neutral-700">Sigurnost lozinke</span>
                  </div>
                  <div className="space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          req.met ? 'bg-green-100' : 'bg-neutral-100'
                        }`}>
                          {req.met && <Check className="h-3 w-3 text-green-600" />}
                        </div>
                        <span className={`text-xs ${
                          req.met ? 'text-green-700' : 'text-neutral-500'
                        }`}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  Potvrdite lozinku
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`input-apple pl-10 pr-10 ${
                      confirmPassword && password !== confirmPassword 
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-200/50' 
                        : ''
                    }`}
                    placeholder="Ponovite lozinku"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-red-600 text-xs mt-1">Lozinke se ne slažu</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || password !== confirmPassword}
                className="btn-apple-success w-full flex items-center justify-center space-x-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="loading-apple"></div>
                ) : (
                  <>
                    <span>Kreiraj račun</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Terms */}
        <div className="mt-6 glass-card p-4 rounded-apple-lg">
          <p className="text-xs text-neutral-500 text-center">
            Kreiranjem računa, slažete se sa našim{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
              Uslovima korišćenja
            </a>{' '}
            i{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
              Politikom privatnosti
            </a>
          </p>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Već imate račun?{' '}
            <Link 
              href="/login" 
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              Prijavite se
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