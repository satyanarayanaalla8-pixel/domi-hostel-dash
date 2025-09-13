import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  MessageSquare, 
  Bell, 
  LogOut, 
  CheckCircle, 
  XCircle, 
  Clock,
  Bed,
  Users,
  Wifi,
  Coffee
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentDashboardProps {
  userId: string;
  onLogout: () => void;
}

const StudentDashboard = ({ userId, onLogout }: StudentDashboardProps) => {
  const [complaintForm, setComplaintForm] = useState({
    type: '',
    description: '',
    priority: 'medium'
  });
  const { toast } = useToast();

  const rooms = [
    { id: 'R101', type: 'Single', status: 'available', floor: 1, amenities: ['Bed', 'Desk', 'WiFi'] },
    { id: 'R102', type: 'Double', status: 'occupied', floor: 1, amenities: ['Bed', 'Desk', 'WiFi', 'AC'] },
    { id: 'R201', type: 'Single', status: 'available', floor: 2, amenities: ['Bed', 'Desk', 'WiFi'] },
    { id: 'R202', type: 'Triple', status: 'maintenance', floor: 2, amenities: ['Bed', 'Desk', 'WiFi'] },
  ];

  const complaints = [
    { id: 1, type: 'Maintenance', description: 'AC not working', status: 'pending', date: '2024-01-15' },
    { id: 2, type: 'Cleaning', description: 'Bathroom needs cleaning', status: 'resolved', date: '2024-01-14' },
  ];

  const notices = [
    { id: 1, title: 'Hostel Fees Due', content: 'Please pay your hostel fees before January 31st', date: '2024-01-10', priority: 'high' },
    { id: 2, title: 'WiFi Maintenance', content: 'WiFi will be down for maintenance on January 20th', date: '2024-01-12', priority: 'medium' },
  ];

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (complaintForm.type && complaintForm.description) {
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been submitted successfully.",
      });
      setComplaintForm({ type: '', description: '', priority: 'medium' });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'occupied': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'maintenance': return <Clock className="h-4 w-4 text-warning" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      available: 'bg-success/10 text-success border-success/20',
      occupied: 'bg-destructive/10 text-destructive border-destructive/20',
      maintenance: 'bg-warning/10 text-warning border-warning/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      resolved: 'bg-success/10 text-success border-success/20'
    };
    return variants[status as keyof typeof variants] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Home className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {userId}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="rooms" className="gap-2">
              <Bed className="h-4 w-4" />
              Rooms
            </TabsTrigger>
            <TabsTrigger value="complaints" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Complaints
            </TabsTrigger>
            <TabsTrigger value="notices" className="gap-2">
              <Bell className="h-4 w-4" />
              Notices
            </TabsTrigger>
          </TabsList>

          {/* Rooms Tab */}
          <TabsContent value="rooms">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Room Availability</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rooms.map((room) => (
                    <Card key={room.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{room.id}</CardTitle>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(room.status)}
                            <Badge className={getStatusBadge(room.status)}>
                              {room.status}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription>
                          {room.type} • Floor {room.floor}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {room.amenities.map((amenity) => (
                              <Badge key={amenity} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                          {room.status === 'available' && (
                            <Button className="w-full" size="sm">
                              Request Allocation
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Complaints Tab */}
          <TabsContent value="complaints">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit New Complaint</CardTitle>
                  <CardDescription>Report issues or request maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleComplaintSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Complaint Type</Label>
                        <Select value={complaintForm.type} onValueChange={(value) => setComplaintForm(prev => ({...prev, type: value}))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="cleaning">Cleaning</SelectItem>
                            <SelectItem value="electrical">Electrical</SelectItem>
                            <SelectItem value="plumbing">Plumbing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={complaintForm.priority} onValueChange={(value) => setComplaintForm(prev => ({...prev, priority: value}))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the issue in detail..."
                        value={complaintForm.description}
                        onChange={(e) => setComplaintForm(prev => ({...prev, description: e.target.value}))}
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full md:w-auto">
                      Submit Complaint
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>My Complaints</CardTitle>
                  <CardDescription>Track your submitted complaints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {complaints.map((complaint) => (
                      <div key={complaint.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{complaint.description}</p>
                          <p className="text-sm text-muted-foreground">{complaint.type} • {complaint.date}</p>
                        </div>
                        <Badge className={getStatusBadge(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notices Tab */}
          <TabsContent value="notices">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Important Notices</h2>
              {notices.map((notice) => (
                <Card key={notice.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{notice.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusBadge(notice.priority)}>
                          {notice.priority}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{notice.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{notice.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;