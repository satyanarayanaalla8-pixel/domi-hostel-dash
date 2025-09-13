import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'student' | 'admin', userId: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin'>('student');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && password) {
      onLogin(selectedRole, userId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-info/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Hostel Management</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-3">
          <Button
            variant={selectedRole === 'student' ? 'default' : 'outline'}
            className="flex-1 h-12"
            onClick={() => setSelectedRole('student')}
          >
            <Users className="h-4 w-4 mr-2" />
            Student
          </Button>
          <Button
            variant={selectedRole === 'admin' ? 'default' : 'outline'}
            className="flex-1 h-12"
            onClick={() => setSelectedRole('admin')}
          >
            <Shield className="h-4 w-4 mr-2" />
            Admin
          </Button>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {selectedRole === 'student' ? 'STUDENT' : 'ADMIN'}
              </Badge>
              Login
            </CardTitle>
            <CardDescription>
              Enter your {selectedRole} credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">
                  {selectedRole === 'student' ? 'Student ID' : 'Admin ID'}
                </Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder={selectedRole === 'student' ? 'STU001' : 'ADM001'}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full h-11">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-sm space-y-2">
              <p className="font-medium text-muted-foreground">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-medium">Student:</p>
                  <p>ID: STU001</p>
                  <p>Pass: password</p>
                </div>
                <div>
                  <p className="font-medium">Admin:</p>
                  <p>ID: ADM001</p>
                  <p>Pass: admin123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;