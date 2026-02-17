import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                navigate('/admin/dashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred during sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'radial-gradient(circle at top right, #1e293b, #0f172a 60%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background glow effects */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '30%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '30%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '420px',
                    zIndex: 10,
                }}
            >
                {/* Logo/Brand */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '14px',
                            marginBottom: '16px',
                        }}
                    >
                        <div
                            style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 24px rgba(6,182,212,0.25)',
                            }}
                        >
                            <Lock style={{ width: '28px', height: '28px', color: '#fff' }} />
                        </div>
                        <span
                            style={{
                                fontSize: '28px',
                                fontWeight: 700,
                                color: '#ffffff',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            Bubble Up Admin
                        </span>
                    </motion.div>
                    <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>
                        Sign in to access the dashboard
                    </p>
                </div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        background: 'rgba(30, 41, 59, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(71, 85, 105, 0.5)',
                        borderRadius: '20px',
                        padding: '36px',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Top accent bar */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
                        }}
                    />

                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div style={{ marginBottom: '24px' }}>
                            <label
                                style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: '#e2e8f0',
                                    marginBottom: '10px',
                                    paddingLeft: '4px',
                                }}
                            >
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail
                                    style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '20px',
                                        height: '20px',
                                        color: '#64748b',
                                    }}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@gmail.com"
                                    required
                                    style={{
                                        width: '100%',
                                        paddingLeft: '46px',
                                        paddingRight: '16px',
                                        paddingTop: '14px',
                                        paddingBottom: '14px',
                                        background: 'rgba(15, 23, 42, 0.6)',
                                        border: '1px solid rgba(71, 85, 105, 0.6)',
                                        borderRadius: '12px',
                                        color: '#ffffff',
                                        fontSize: '15px',
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxSizing: 'border-box',
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = '#f59e0b')}
                                    onBlur={(e) => (e.target.style.borderColor = 'rgba(71, 85, 105, 0.6)')}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div style={{ marginBottom: '28px' }}>
                            <label
                                style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: '#e2e8f0',
                                    marginBottom: '10px',
                                    paddingLeft: '4px',
                                }}
                            >
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock
                                    style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '20px',
                                        height: '20px',
                                        color: '#64748b',
                                    }}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    style={{
                                        width: '100%',
                                        paddingLeft: '46px',
                                        paddingRight: '16px',
                                        paddingTop: '14px',
                                        paddingBottom: '14px',
                                        background: 'rgba(15, 23, 42, 0.6)',
                                        border: '1px solid rgba(71, 85, 105, 0.6)',
                                        borderRadius: '12px',
                                        color: '#ffffff',
                                        fontSize: '15px',
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxSizing: 'border-box',
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = '#f59e0b')}
                                    onBlur={(e) => (e.target.style.borderColor = 'rgba(71, 85, 105, 0.6)')}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '12px 16px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.25)',
                                    borderRadius: '12px',
                                    color: '#f87171',
                                    fontSize: '14px',
                                    marginBottom: '24px',
                                }}
                            >
                                <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
                                color: '#ffffff',
                                fontSize: '16px',
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(6,182,212,0.3)',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 12px 32px rgba(6,182,212,0.4)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(6,182,212,0.3)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Info */}
                    <div
                        style={{
                            marginTop: '28px',
                            paddingTop: '20px',
                            borderTop: '1px solid rgba(71, 85, 105, 0.3)',
                            textAlign: 'center',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '11px',
                                color: '#64748b',
                                letterSpacing: '0.08em',
                                margin: 0,
                            }}
                        >
                            AUTHORIZED PERSONNEL ONLY • ACTIVITY MONITORED
                        </p>
                    </div>
                </motion.div>

                {/* Back to Homepage Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ textAlign: 'center', marginTop: '28px' }}
                >
                    <a
                        href="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            color: '#94a3b8',
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#06b6d4')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                    >
                        ← Back to Homepage
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}
