import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api, formatApiErrorDetail } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import { LogOut, Plus, Pencil, Trash2, FileText, Inbox, X } from 'lucide-react';

const CATEGORIES = [
  'GST & Taxation',
  'Income Tax',
  'Business Advisory',
  'Compliance',
  'Audit Services',
  'Financial Advisory',
  'General',
];

const emptyPost = {
  title: '',
  excerpt: '',
  content: '',
  category: 'General',
  image: '',
  author: 'CA Raghav Mittal',
  read_time: '5 min read',
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState('blog');
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyPost);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const { data } = await api.post('/admin/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const fullUrl = data.url.startsWith('http')
        ? data.url
        : `${process.env.REACT_APP_BACKEND_URL}${data.url}`;
      setForm((prev) => ({ ...prev, image: fullUrl }));
      toast({ title: 'Image uploaded' });
    } catch (err) {
      toast({
        title: 'Upload failed',
        description: formatApiErrorDetail(err.response?.data?.detail) || 'Could not upload image',
      });
    } finally {
      setUploading(false);
    }
  };

  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const { data } = await api.get('/blog');
      setPosts(data);
    } catch (e) {
      toast({ title: 'Failed to load posts', description: formatApiErrorDetail(e.response?.data?.detail) });
    } finally {
      setLoadingPosts(false);
    }
  };

  const loadContacts = async () => {
    setLoadingContacts(true);
    try {
      const { data } = await api.get('/admin/contacts');
      setContacts(data);
    } catch (e) {
      toast({ title: 'Failed to load contacts', description: formatApiErrorDetail(e.response?.data?.detail) });
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (tab === 'contacts' && contacts.length === 0) {
      loadContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const openNew = () => {
    setForm(emptyPost);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (post) => {
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image || '',
      author: post.author || 'CA Raghav Mittal',
      read_time: post.read_time || '5 min read',
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/blog/${editingId}`, form);
        toast({ title: 'Post updated' });
      } else {
        await api.post('/admin/blog', form);
        toast({ title: 'Post created' });
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptyPost);
      loadPosts();
    } catch (e) {
      toast({
        title: 'Save failed',
        description: formatApiErrorDetail(e.response?.data?.detail) || 'Could not save post',
      });
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/admin/blog/${id}`);
      toast({ title: 'Post deleted' });
      loadPosts();
    } catch (e) {
      toast({ title: 'Delete failed', description: formatApiErrorDetail(e.response?.data?.detail) });
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this contact submission?')) return;
    try {
      await api.delete(`/admin/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast({ title: 'Contact deleted' });
    } catch (e) {
      toast({ title: 'Delete failed', description: formatApiErrorDetail(e.response?.data?.detail) });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-dashboard">
      {/* Header */}
      <header className="bg-blue-950 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admin Dashboard
            </h1>
            <p className="text-xs text-blue-200">{user?.email}</p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white hover:text-blue-900"
            data-testid="admin-logout-btn"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2">
            <button
              onClick={() => setTab('blog')}
              data-testid="tab-blog"
              className={`px-5 py-3 font-semibold text-sm border-b-2 transition-colors ${
                tab === 'blog' ? 'border-blue-900 text-blue-900' : 'border-transparent text-gray-600 hover:text-blue-900'
              }`}
            >
              <FileText className="inline w-4 h-4 mr-2" />
              Blog Posts ({posts.length})
            </button>
            <button
              onClick={() => setTab('contacts')}
              data-testid="tab-contacts"
              className={`px-5 py-3 font-semibold text-sm border-b-2 transition-colors ${
                tab === 'contacts' ? 'border-blue-900 text-blue-900' : 'border-transparent text-gray-600 hover:text-blue-900'
              }`}
            >
              <Inbox className="inline w-4 h-4 mr-2" />
              Contact Submissions ({contacts.length})
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {tab === 'blog' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-900">Manage Blog Posts</h2>
              <Button onClick={openNew} className="bg-green-700 hover:bg-green-800 text-white" data-testid="new-post-btn">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>
            {loadingPosts ? (
              <p className="text-gray-600">Loading...</p>
            ) : posts.length === 0 ? (
              <p className="text-gray-600">No posts yet. Create your first one!</p>
            ) : (
              <div className="grid gap-4">
                {posts.map((p) => (
                  <Card key={p.id} className="border bg-white">
                    <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
                            {p.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(p.published_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-bold text-blue-900">{p.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-1">{p.excerpt}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(p)}
                          data-testid={`edit-post-${p.id}`}
                        >
                          <Pencil className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deletePost(p.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          data-testid={`delete-post-${p.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'contacts' && (
          <>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Contact Submissions</h2>
            {loadingContacts ? (
              <p className="text-gray-600">Loading...</p>
            ) : contacts.length === 0 ? (
              <p className="text-gray-600">No contact submissions yet.</p>
            ) : (
              <div className="grid gap-4">
                {contacts.map((c) => (
                  <Card key={c.id} className="border bg-white">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-bold text-blue-900">{c.name}</span>
                            <a href={`mailto:${c.email}`} className="text-sm text-blue-700 hover:underline">
                              {c.email}
                            </a>
                            <a href={`tel:${c.phone}`} className="text-sm text-gray-600 hover:underline">
                              {c.phone}
                            </a>
                            <span className="text-xs text-gray-500 ml-auto">
                              {new Date(c.submitted_at).toLocaleString()}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-800 mb-1">{c.subject}</h4>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{c.message}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteContact(c.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          data-testid={`delete-contact-${c.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Post Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowForm(false)}
        >
          <Card
            className="w-full max-w-3xl my-8 max-h-[90vh] overflow-y-auto border-none shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            data-testid="post-form-modal"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-900">
                  {editingId ? 'Edit Post' : 'New Post'}
                </h3>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={submitForm} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Title</label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    data-testid="form-title"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                    <select
                      className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      data-testid="form-category"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Read Time</label>
                    <Input
                      value={form.read_time}
                      onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                      placeholder="e.g. 5 min read"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Featured Image</label>
                  <div className="flex flex-col sm:flex-row gap-3 items-start">
                    <div className="flex-1 w-full">
                      <Input
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        placeholder="Paste image URL or upload below..."
                        data-testid="form-image-url"
                      />
                      <div className="mt-2">
                        <label className="inline-flex items-center gap-2 cursor-pointer bg-green-50 text-green-800 border border-green-200 hover:bg-green-100 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            data-testid="form-image-upload"
                          />
                          {uploading ? 'Uploading...' : 'Upload Image'}
                        </label>
                      </div>
                    </div>
                    {form.image && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden border border-blue-100 flex-shrink-0 bg-gray-50">
                        <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Excerpt</label>
                  <Textarea
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    rows={2}
                    required
                    data-testid="form-excerpt"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Content (HTML supported)
                  </label>
                  <Textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={10}
                    required
                    data-testid="form-content"
                    className="font-mono text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white" data-testid="form-submit">
                    {editingId ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
