import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { base44 } from '@/api/base44Client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from 'sonner'
import { Trophy, Music, Loader2, Eye, EyeOff, Smartphone, Mail, Lock, ShieldCheck } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isRecoveryMode = searchParams.get('type') === 'recovery'

  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(isRecoveryMode ? "login" : "login")
  const [showPassword, setShowPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [resetView, setResetView] = useState(isRecoveryMode ? 'update' : 'login') // login, forgot, update

  const [loginData, setLoginData] = useState({ email: '', password: '', otp: '', otpSent: false })
  const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '+254', password: '', confirmPassword: '' })
  const [newPassword, setNewPassword] = useState('')

  // Step 1: Login with Password OR Request OTP
  const handleLoginInitial = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await base44.auth.login(loginData.email, loginData.password)

      // Mock auth returns user directly, real auth returns { token, user } or { otpSent }
      if (res && (res.id || res.token)) {
        toast.success("Welcome back!")
        navigate('/')
      } else if (res && res.otpSent) {
        setLoginData(prev => ({ ...prev, otpSent: true }))
        toast.success("Code sent! Check your email.")
      }
    } catch (err) {
      toast.error(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleSendOtp = async () => {
    if (!loginData.email) {
      toast.error("Please enter email first");
      return;
    }
    setLoading(true);
    try {
      // Call login without password to trigger OTP
      await base44.auth.login(loginData.email, "");
      setLoginData(prev => ({ ...prev, otpSent: true }));
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Verify OTP
  const handleLoginVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await base44.auth.verifyOtp(loginData.email, loginData.otp)
      toast.success("Welcome back!")
      navigate('/')
    } catch (err) {
      toast.error(err.message || "Invalid code")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!loginData.email) return toast.error("Please enter your email")
    setLoading(true)
    try {
      await base44.auth.resetPassword(loginData.email)
      toast.success("Password reset link sent to your email!")
      setResetView('login')
    } catch (err) {
      toast.error(err.message || "Failed to send reset link")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    if (!newPassword) return toast.error("Please enter a new password")
    setLoading(true)
    try {
      await base44.auth.updatePassword(newPassword)
      toast.success("Password updated successfully! You can now log in.")
      setResetView('login')
      navigate('/login')
    } catch (err) {
      toast.error(err.message || "Failed to update password")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    if (!registerData.phone.startsWith('+254')) {
      toast.error("Phone number must start with +254")
      return
    }
    if (registerData.phone.length < 13) {
      toast.error("Please enter a valid phone number (e.g., +254 712 345678)")
      return
    }
    setLoading(true)
    try {
      await base44.auth.register({
        email: registerData.email,
        password: registerData.password,
        name: registerData.name,
        phone: registerData.phone
      })
      toast.success("Account created successfully!")
      navigate('/')
    } catch (err) {
      toast.error(err.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await base44.auth.loginWithGoogle();
    } catch (err) {
      toast.error(err.message || "Google sign-in failed");
      setLoading(false);
    }
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Branding */}
      <div className="hidden lg:flex h-full flex-col justify-center items-center bg-gradient-to-br from-red-600 to-amber-600 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv49ACLGJCpzQz9Ymws5mPoulJS0NGYvRRqA&s"
            alt="Festival Crowd"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 text-center space-y-6">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight">Kalenjin Music Festival</h1>
          <p className="text-xl text-white/90 max-w-md mx-auto">
            Join the community, vote for your favorite artists, and celebrate our culture.
          </p>
        </div>
      </div>

      {/* Right Side: Forms */}
      <div className="h-full flex items-center justify-center p-6 bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:hidden mb-8">
            <h1 className="text-3xl font-bold text-red-600">Kalenjin Music Festival</h1>
          </div>

          <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
              <CardDescription className="text-center">
                {activeTab === 'login'
                  ? 'Enter your credentials to access your account'
                  : 'Sign up to start voting for your favorites'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  {resetView === 'update' ? (
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Enter New Password</Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 6 characters"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700" type="submit" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Update Password
                      </Button>
                    </form>
                  ) : resetView === 'forgot' ? (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div className="space-y-2 text-center mb-6">
                        <Lock className="w-10 h-10 text-red-600 mx-auto mb-2" />
                        <h3 className="font-bold text-lg">Reset Password</h3>
                        <p className="text-sm text-slate-500">Enter your email and we'll send you a link to reset your password.</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">Email Address</Label>
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="you@example.com"
                          value={loginData.email}
                          onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Button className="w-full bg-red-600 hover:bg-red-700" type="submit" disabled={loading}>
                          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Send Reset Link
                        </Button>
                        <Button variant="ghost" type="button" onClick={() => setResetView('login')}>
                          Back to Login
                        </Button>
                      </div>
                    </form>
                  ) : !loginData.otpSent ? (
                    <form onSubmit={handleLoginInitial} className="space-y-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 h-11 border-slate-300 hover:bg-slate-50"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                      >
                        Sign in with Google
                      </Button>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-50 px-2 text-slate-500 font-medium">Or continue with email</span></div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={loginData.email}
                          onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                          required
                          disabled={loading}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <button
                            type="button"
                            className="text-xs text-red-600 hover:underline"
                            onClick={() => setResetView('forgot')}
                            disabled={loading}
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={loginData.password}
                            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                            placeholder="Enter your password"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <Button className="w-full bg-red-600 hover:bg-red-700" type="submit" disabled={loading}>
                          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Sign In
                        </Button>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-muted-foreground">Or</span></div>
                        </div>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={handleSendOtp}
                          disabled={loading || !loginData.email}
                        >
                          Email 6-digit Code (OTP)
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleLoginVerify} className="space-y-4">
                      <div className="mb-4 text-center">
                        <p className="text-sm text-slate-600">Enter the code sent to</p>
                        <p className="font-medium text-slate-900">{loginData.email}</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="otp">One-Time Password (OTP)</Label>
                        <div className="flex justify-center gap-2">
                          <Input
                            id="otp"
                            type="text"
                            placeholder="123456"
                            className="text-center text-2xl tracking-widest"
                            maxLength={6}
                            value={loginData.otp}
                            onChange={e => setLoginData({ ...loginData, otp: e.target.value })}
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <Button className="w-full bg-red-600 hover:bg-red-700" type="submit" disabled={loading}>
                          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Verify & Login
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          onClick={() => setLoginData({ ...loginData, otpSent: false, otp: '' })}
                          className="text-slate-500"
                        >
                          Back to Email
                        </Button>
                      </div>
                    </form>
                  )}
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={registerData.name}
                        onChange={e => setRegisterData({ ...registerData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        value={registerData.email}
                        onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-phone">Phone Number</Label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="register-phone"
                          placeholder="+254 712 345 678"
                          value={registerData.phone}
                          onChange={e => {
                            const val = e.target.value;
                            if (val.startsWith('+254') || val === '+' || val === '+2' || val === '+25') {
                              setRegisterData({ ...registerData, phone: val });
                            } else if (val === '') {
                              setRegisterData({ ...registerData, phone: '+254' });
                            }
                          }}
                          className="pl-10"
                          maxLength={13}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showRegisterPassword ? "text" : "password"}
                          value={registerData.password}
                          onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showRegisterPassword ? "text" : "password"}
                          value={registerData.confirmPassword}
                          onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          required
                          className="pr-10"
                        />
                      </div>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700" type="submit" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-xs text-slate-400 text-center">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login
