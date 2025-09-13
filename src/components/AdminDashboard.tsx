import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Shield, 
  LogOut, 
  Home, 
  MessageSquare, 
  Bell, 
  Users, 
  Plus,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminDashboardProps {
  userId: string;
  onLogout: () => void;
}

const AdminDashboard = ({ userId, onLogout }: AdminDashboardProps) => {
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    content: '',
    priority: 'medium'
  });
  const [isNoticeDialogOpen, setIsNoticeDialogOpen] = useState(false);
  const { toast } = useToast();

  const stats = [
    { title: 'Total Rooms', value: '124', change: '+2', icon: Home, color: 'text-primary' },
    { title: 'Occupied', value: '98', change: '+5', icon: Users, color: 'text-success' },
    { title: 'Available', value: '20', change: '-3', icon: CheckCircle, color: 'text-info' },
    { title: 'Under Maintenance', value: '6', change: '+1', icon: Clock, color: 'text-warning' },
  ];

  const rooms = [
    { id: 'R101', type: 'Single', status: 'available', floor: 1, student: null },
    { id: 'R102', type: 'Double', status: 'occupied', floor: 1, student: 'STU001, STU002' },
    { id: 'R201', type: 'Single', status: 'available', floor: 2, student: null },
    { id: 'R202', type: 'Triple', status: 'maintenance', floor: 2, student: null },
    { id: 'R301', type: 'Double', status: 'occupied', floor: 3, student: 'STU003, STU004' },
  ];

  const complaints = [
    { id: 1, student: 'STU001', type: 'Maintenance', description: 'AC not working in room R102', status: 'pending', date: '2024-01-15', priority: 'high' },
    { id: 2, student: 'STU003', type: 'Cleaning', description: 'Bathroom needs deep cleaning', status: 'in-progress', date: '2024-01-14', priority: 'medium' },
    { id: 3, student: 'STU005', type: 'Electrical', description: 'Power outlet not working', status: 'resolved', date: '2024-01-13', priority: 'high' },
  ];

  const notices = [
    { id: 1, title: 'Hostel Fees Due', content: 'Please pay your hostel fees before January 31st', date: '2024-01-10', priority: 'high' },
    { id: 2, title: 'WiFi Maintenance', content: 'WiFi will be down for maintenance on January 20th', date: '2024-01-12', priority: 'medium' },
  ];

  const handleNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noticeForm.title && noticeForm.content) {
      toast({
        title: "Notice Published",
        description: "The notice has been published successfully.",
      });
      setNoticeForm({ title: '', content: '', priority: 'medium' });
      setIsNoticeDialogOpen(false);
    }
  };

  const handleComplaintUpdate = (complaintId: number, newStatus: string) => {
    toast({
      title: "Complaint Updated",
      description: `Complaint status updated to ${newStatus}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      available: 'bg-success/10 text-success border-success/20',
      occupied: 'bg-destructive/10 text-destructive border-destructive/20',
      maintenance: 'bg-warning/10 text-warning border-warning/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      'in-progress': 'bg-info/10 text-info border-info/20',
      resolved: 'bg-success/10 text-success border-success/20',
      high: 'bg-destructive/10 text-destructive border-destructive/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-info/10 text-info border-info/20'
    };
    return variants[status as keyof typeof variants] || 'bg-muted text-muted-foreground';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-info';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="rooms" className="gap-2">
              <Home className="h-4 w-4" />
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

          {/* Rooms Management */}
          <TabsContent value="rooms">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Room Management</h2>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Room
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <Card key={room.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{room.id}</CardTitle>
                        <Badge className={getStatusBadge(room.status)}>
                          {room.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {room.type} • Floor {room.floor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {room.student && (
                          <div>
                            <p className="text-sm font-medium">Occupants:</p>
                            <p className="text-sm text-muted-foreground">{room.student}</p>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Select>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="occupied">Occupied</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Complaints Management */}
          <TabsContent value="complaints">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Complaint Management</h2>
              
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <Card key={complaint.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{complaint.type}</CardTitle>
                            <Badge className={getStatusBadge(complaint.priority)}>
                              {complaint.priority}
                            </Badge>
                          </div>
                          <CardDescription>
                            Student: {complaint.student} • {complaint.date}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusBadge(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">{complaint.description}</p>
                        <div className="flex gap-2">
                          <Select onValueChange={(value) => handleComplaintUpdate(complaint.id, value)}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Notices Management */}
          <TabsContent value="notices">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Notice Management</h2>
                <Dialog open={isNoticeDialogOpen} onOpenChange={setIsNoticeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Post Notice
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Post New Notice</DialogTitle>
                      <DialogDescription>
                        Create a new notice for all students
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleNoticeSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={noticeForm.title}
                          onChange={(e) => setNoticeForm(prev => ({...prev, title: e.target.value}))}
                          placeholder="Notice title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={noticeForm.priority} onValueChange={(value) => setNoticeForm(prev => ({...prev, priority: value}))}>
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
                      <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          value={noticeForm.content}
                          onChange={(e) => setNoticeForm(prev => ({...prev, content: e.target.value}))}
                          placeholder="Notice content"
                          rows={4}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Publish Notice
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
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
                      <p className="text-muted-foreground mb-4">{notice.content}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;