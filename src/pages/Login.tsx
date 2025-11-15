import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@marketingllm.com');
    setPassword('Demo123!');
    setIsLoggingIn(true);
    setError('');

    try {
      await login('demo@marketingllm.com', 'Demo123!');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            MarketingLLM
          </CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900 px-2 text-gray-400">Or</span>
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={handleDemoLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Try Demo Account
          </Button>
          
          <div className="text-center text-sm text-gray-400">
            Demo credentials: demo@marketingllm.com / Demo123!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;