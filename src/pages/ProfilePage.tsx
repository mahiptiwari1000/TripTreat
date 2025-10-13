import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Clock, User, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import PlannedTours from '@/components/PlannedTours';
import ProtectedRoute from '@/components/ProtectedRoute';
import { UserIcon, PlaneTakeoff, SettingsIcon } from 'lucide-react';

const ProfilePage = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [bookings, setBookings] = useState<BookingWithListing[]>([]);
  const [hostApplications, setHostApplications] = useState<HostApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // Fetch user's bookings
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select(
          `
           *,
           listing:listings(
             title,
             description,
             location,
             price_per_night
           )
         `
        )
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (bookingError) throw bookingError;

      setBookings(bookingData.map(booking => ({
        ...booking,
        status: booking.status as BookingStatus,
      })) || []);

      // Fetch host applications
      const { data: hostData, error: hostError } = await supabase
        .from('host_applications')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (hostError) throw hostError;
      setHostApplications(hostData.map(host => ({
        ...host,
        host_type: host.host_type as HostType,
        status: host.status as HostApplicationStatus,
      })) || []);
    } catch (error: unknown) {
      // Log error for debugging in development
      if (import.meta.env.DEV) {
        console.error('Error fetching user data:', error);
      }
      toast.error('Failed to load your data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProfile = () => {
    // Navigate to edit profile page
    toast.info('Edit profile feature coming soon.');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500 hover:bg-green-500/90';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-500/90';
      case 'cancelled':
        return 'bg-red-500 hover:bg-red-500/90';
      case 'completed':
        return 'bg-blue-500 hover:bg-blue-500/90';
      case 'rejected':
        return 'bg-destructive';
      case 'approved':
        return 'bg-green-500';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="container mx-auto py-10 px-4 flex-grow">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                        {profile?.first_name?.[0]}
                        {profile?.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <h2 className="mt-4 text-xl font-bold">
                      {profile?.first_name} {profile?.last_name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>

                    <div className="mt-6 w-full">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => setActiveTab('profile')}
                      >
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start mt-2"
                        onClick={() => setActiveTab('bookings')}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>My Bookings</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start mt-2"
                        onClick={() => setActiveTab('plans')}
                      >
                        <PlaneTakeoff className="mr-2 h-4 w-4" />
                        <span>My Planned Tours</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start mt-2"
                        onClick={() => setActiveTab('settings')}
                      >
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bookings tab */}
            <div className="w-full md:w-3/4">
              {activeTab === 'profile' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Manage your personal information and account settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          First Name
                        </h3>
                        <p className="text-foreground">
                          {profile?.first_name || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Last Name
                        </h3>
                        <p className="text-foreground">
                          {profile?.last_name || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Email
                        </h3>
                        <p className="text-foreground">{user?.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Phone
                        </h3>
                        <p className="text-foreground">
                          {profile?.phone || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Account Type
                        </h3>
                        <p className="text-foreground">
                          <Badge variant="outline" className="capitalize">
                            {profile?.role || 'User'}
                          </Badge>
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Member Since
                        </h3>
                        <p className="text-foreground">
                          {profile?.created_at
                            ? format(new Date(profile.created_at), 'PPP')
                            : 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-2">Profile Settings</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleEditProfile}
                        >
                          <User className="h-4 w-4 mr-2" /> Update Profile
                        </Button>
                        <Button variant="outline" size="sm" disabled>
                          <Upload className="h-4 w-4 mr-2" /> Change Photo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'bookings' && (
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>
                      View and manage your booking history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex items-center justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : bookings.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-muted-foreground mb-4">
                          You don't have any bookings yet.
                        </p>
                        <Button onClick={() => navigate('/homestays')}>
                          Browse Homestays
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {bookings.map(booking => (
                          <div
                            key={booking.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex flex-col md:flex-row justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {booking.listing?.title}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                  {booking.listing?.location}
                                </p>
                              </div>
                              <Badge
                                className={getStatusBadgeColor(booking.status)}
                              >
                                {booking.status.charAt(0).toUpperCase() +
                                  booking.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Check-in
                                  </p>
                                  <p className="font-medium">
                                    {format(
                                      new Date(booking.check_in_date),
                                      'PP'
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Check-out
                                  </p>
                                  <p className="font-medium">
                                    {format(
                                      new Date(booking.check_out_date),
                                      'PP'
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Guests
                                  </p>
                                  <p className="font-medium">
                                    {booking.guests}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Total Price
                                </p>
                                <p className="font-semibold text-lg">
                                  ₹{booking.price_total}
                                </p>
                              </div>

                              <div className="flex gap-2">
                                {booking.status === 'pending' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-500"
                                  >
                                    Cancel
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    navigate(
                                      `/homestays/${booking.listing?.id}`
                                    )
                                  }
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === 'plans' && <PlannedTours />}

              {activeTab === 'settings' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>
                      Manage your account settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Email
                        </h3>
                        <p className="text-foreground">{user?.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Phone
                        </h3>
                        <p className="text-foreground">
                          {profile?.phone || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Account Type
                        </h3>
                        <p className="text-foreground">
                          <Badge variant="outline" className="capitalize">
                            {profile?.role || 'User'}
                          </Badge>
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                          Member Since
                        </h3>
                        <p className="text-foreground">
                          {profile?.created_at
                            ? format(new Date(profile.created_at), 'PPP')
                            : 'Unknown'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-2">Profile Settings</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleEditProfile}
                        >
                          <User className="h-4 w-4 mr-2" /> Update Profile
                        </Button>
                        <Button variant="outline" size="sm" disabled>
                          <Upload className="h-4 w-4 mr-2" /> Change Photo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
