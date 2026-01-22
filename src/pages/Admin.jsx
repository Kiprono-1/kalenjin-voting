import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Users, Award, TrendingUp, Loader2, History, FileText, UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtistForm from '@/components/admin/ArtistForm';

export default function Admin() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(user => {
      if (user?.role !== 'admin') {
        if (user === null) {
          base44.auth.redirectToLogin();
        } else {
          // User is logged in but not admin, redirect home
          window.location.href = '/';
        }
      }
      setCurrentUser(user);
    }).catch(() => {
      base44.auth.redirectToLogin();
    });
  }, []);

  const { data: artists = [], isLoading: artistsLoading } = useQuery({
    queryKey: ['artists', 'approved'],
    queryFn: () => base44.entities.Artist.list('approved'),
  });

  const { data: applications = [], isLoading: applicationsLoading } = useQuery({
    queryKey: ['artists', 'pending'],
    queryFn: () => base44.entities.Artist.list('pending'),
  });

  const { data: votes = [], isLoading: votesLoading } = useQuery({
    queryKey: ['votes-detailed'],
    queryFn: () => base44.entities.Vote.list(),
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.auth.listUsers(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Artist.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
      setShowForm(false);
      toast.success('Artist created successfully!');
    },
    onError: (err) => toast.error('Failed to create artist: ' + err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Artist.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
      setShowForm(false);
      setEditingArtist(null);
      toast.success('Artist updated successfully!');
    },
    onError: (err) => toast.error('Failed to update artist: ' + err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Artist.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
      queryClient.invalidateQueries({ queryKey: ['artists', 'pending'] });
      toast.success('Artist deleted successfully!');
    },
    onError: (err) => toast.error('Failed to delete artist: ' + err.message),
  });

  const approveMutation = useMutation({
    mutationFn: (id) => base44.entities.Artist.updateStatus(id, 'approved'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists', 'approved'] });
      queryClient.invalidateQueries({ queryKey: ['artists', 'pending'] });
      toast.success('Artist approved successfully!');
    },
    onError: (err) => {
      console.error('Approve Error:', err);
      toast.error('Failed to approve artist: ' + err.message);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => base44.entities.Artist.updateStatus(id, 'rejected'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists', 'pending'] });
      toast.success('Application rejected');
    },
    onError: (err) => toast.error('Failed to reject application: ' + err.message),
  });

  const resetVotesMutation = useMutation({
    mutationFn: () => base44.entities.Vote.deleteAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['votes-detailed'] });
      queryClient.invalidateQueries({ queryKey: ['artists'] }); // Re-fetch artists to update vote counts
      toast.success('All votes have been reset successfully!');
    },
    onError: (err) => toast.error('Failed to reset votes: ' + err.message),
  });

  const handleResetVotes = () => {
    if (confirm('Are you SUPER SURE? This will delete ALL votes permanently! This action cannot be undone.')) {
      resetVotesMutation.mutate();
    }
  };

  const handleSave = (data) => {
    // Base44 expects: name, real_name, image_url, bio, song_title, category, region, gender
    // Send form data directly without transformation
    if (editingArtist) {
      updateMutation.mutate({ id: editingArtist.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (artist) => {
    setEditingArtist(artist);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this artist?')) {
      deleteMutation.mutate(id);
    }
  };

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => base44.entities.Category.list(),
  });

  const categoryMap = React.useMemo(() => {
    const map = {};
    categories.forEach(cat => map[cat.id] = cat.name);
    return map;
  }, [categories]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  const isLoading = artistsLoading || votesLoading || usersLoading;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Manage artists and monitor voting</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Applications</CardTitle>
              <FileText className="w-4 h-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Artists</CardTitle>
              <Users className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{artists.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Voters</CardTitle>
              <UserCheck className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Votes</CardTitle>
              <Award className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{votes.length}</div>
              <Button
                variant="destructive"
                size="sm"
                className="w-full text-xs"
                onClick={handleResetVotes}
                disabled={resetVotesMutation.isPending || votes.length === 0}
              >
                {resetVotesMutation.isPending ? 'Resetting...' : 'Reset All Votes'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Categories</CardTitle>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="artists" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="artists" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600">
              <Users className="w-4 h-4 mr-2" />
              Artists
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600">
              <FileText className="w-4 h-4 mr-2" />
              Applications
              {applications.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold bg-red-600 text-white rounded-full">
                  {applications.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600">
              <UserCheck className="w-4 h-4 mr-2" />
              Voters
            </TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600">
              <History className="w-4 h-4 mr-2" />
              Voting Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="artists" className="space-y-6">
            {/* Artist Form */}
            {showForm && (
              <ArtistForm
                artist={editingArtist}
                categories={categories.map(cat => ({ value: cat.id, label: cat.name }))}
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false);
                  setEditingArtist(null);
                }}
                isLoading={createMutation.isPending || updateMutation.isPending}
              />
            )}

            {/* Artists Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Artists Management</CardTitle>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Artist
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {artistsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Stage Name</TableHead>
                          <TableHead>Song</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Region</TableHead>
                          <TableHead>Votes</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {artists.map((artist) => (
                          <TableRow key={artist.id}>
                            <TableCell>
                              <img
                                src={artist.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop`}
                                alt={artist.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{artist.name}</TableCell>
                            <TableCell>{artist.song_title || '-'}</TableCell>
                            <TableCell>{categoryMap[artist.category_id] || artist.category || '-'}</TableCell>
                            <TableCell>{artist.region || '-'}</TableCell>
                            <TableCell>
                              <span className="font-bold text-red-600">
                                {votes.filter(v => v.artist_id === artist.id).length}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(artist)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(artist.id)}
                                  disabled={deleteMutation.isPending}
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Artist Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {applicationsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Artist</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Bio</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <img
                                  src={app.image_url}
                                  alt={app.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div>
                                  <div className="font-bold">{app.name}</div>
                                  <div className="text-xs text-slate-500">{app.real_name}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm space-y-1">
                                <div><span className="font-medium">Category:</span> {categoryMap[app.category_id] || app.category}</div>
                                <div><span className="font-medium">Region:</span> {app.region}</div>
                                <div><span className="font-medium">Song:</span> {app.song_title}</div>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="text-xs text-slate-600 line-clamp-3">{app.bio}</p>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                  onClick={() => approveMutation.mutate(app.id)}
                                  disabled={approveMutation.isPending}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={() => {
                                    if (confirm('Are you sure you want to reject this application?')) {
                                      rejectMutation.mutate(app.id);
                                    }
                                  }}
                                  disabled={rejectMutation.isPending}
                                >
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {applications.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-12 text-slate-500 italic">
                              No pending applications at the moment.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Registered Voters</CardTitle>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Joined</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name || '-'}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                                }`}>
                                {user.role?.toUpperCase()}
                              </span>
                            </TableCell>
                            <TableCell className="text-slate-500">
                              {new Date(user.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                        {users.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                              No voters registered yet.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Voting Audit Trail</CardTitle>
              </CardHeader>
              <CardContent>
                {votesLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Voter</TableHead>
                          <TableHead>Artist</TableHead>
                          <TableHead>Category</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {votes.map((vote) => (
                          <TableRow key={vote.id}>
                            <TableCell className="text-xs text-slate-500">
                              {new Date(vote.created_at).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{vote.user_name || 'Anonymous'}</span>
                                <span className="text-xs text-slate-400">{vote.user_email}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-red-600">
                              {vote.artist_name}
                            </TableCell>
                            <TableCell className="text-sm">
                              {vote.category_name}
                            </TableCell>
                          </TableRow>
                        ))}
                        {votes.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                              No activity logged yet.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
