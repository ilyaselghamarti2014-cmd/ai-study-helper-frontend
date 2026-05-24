'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FolderKanban, 
  Plus, 
  Users, 
  Globe, 
  Lock,
  Trash2,
  Edit,
  Search,
  Filter
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { api } from '@/lib/api';

interface Workspace {
  id: number;
  name: string;
  description: string;
  type: string;
  visibility: string;
  memberCount: number;
  resourceCount: number;
  aiOrganized: boolean;
  createdAt: string;
}

export default function WorkspacesPage() {
  const [mounted, setMounted] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    description: '',
    type: 'PERSONAL',
    visibility: 'PRIVATE'
  });

  useEffect(() => {
    setMounted(true);
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const response = await api.getWorkspaces();
      setWorkspaces(response.data);
    } catch (err) {
      setError('Failed to load workspaces');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkspace = async () => {
    try {
      const response = await api.createWorkspace(newWorkspace);
      setWorkspaces([...workspaces, response.data]);
      setShowCreateModal(false);
      setNewWorkspace({
        name: '',
        description: '',
        type: 'PERSONAL',
        visibility: 'PRIVATE'
      });
    } catch (err) {
      setError('Failed to create workspace');
    }
  };

  const handleDeleteWorkspace = async (id: number) => {
    try {
      await api.deleteWorkspace(id);
      setWorkspaces(workspaces.filter(ws => ws.id !== id));
    } catch (err) {
      setError('Failed to delete workspace');
    }
  };

  const filteredWorkspaces = workspaces.filter(ws => {
    const matchesSearch = ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ws.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'ALL' || ws.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Workspaces
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Organize your study materials and collaborate with others
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Workspace
          </Button>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === 'ALL' ? 'default' : 'outline'}
              onClick={() => setFilterType('ALL')}
              className="dark:border-gray-700 dark:text-white"
            >
              All
            </Button>
            <Button
              variant={filterType === 'PERSONAL' ? 'default' : 'outline'}
              onClick={() => setFilterType('PERSONAL')}
              className="dark:border-gray-700 dark:text-white"
            >
              Personal
            </Button>
            <Button
              variant={filterType === 'TEAM' ? 'default' : 'outline'}
              onClick={() => setFilterType('TEAM')}
              className="dark:border-gray-700 dark:text-white"
            >
              Team
            </Button>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
          >
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Workspaces Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkspaces.map((workspace, index) => (
              <motion.div
                key={workspace.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg dark:text-white">
                          {workspace.name}
                        </CardTitle>
                        <CardDescription className="dark:text-gray-400">
                          {workspace.description}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className={
                        workspace.visibility === 'PUBLIC' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }>
                        {workspace.visibility === 'PUBLIC' ? (
                          <Globe className="w-3 h-3 mr-1" />
                        ) : (
                          <Lock className="w-3 h-3 mr-1" />
                        )}
                        {workspace.visibility}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        {workspace.memberCount} members
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FolderKanban className="w-4 h-4 mr-2" />
                        {workspace.resourceCount} resources
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div>
                      <Badge variant="outline" className="dark:border-gray-600 dark:text-white">
                        {workspace.type}
                      </Badge>
                      {workspace.aiOrganized && (
                        <Badge variant="secondary" className="ml-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                          AI Organized
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t dark:border-gray-700">
                      <Button variant="outline" size="sm" className="flex-1 dark:border-gray-600 dark:text-white">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteWorkspace(workspace.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredWorkspaces.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FolderKanban className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No workspaces found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first workspace to organize your study materials
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Workspace
            </Button>
          </motion.div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            >
              <h2 className="text-xl font-bold mb-4 dark:text-white">Create Workspace</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Name</label>
                  <Input
                    value={newWorkspace.name}
                    onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                    placeholder="Enter workspace name"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
                  <Input
                    value={newWorkspace.description}
                    onChange={(e) => setNewWorkspace({ ...newWorkspace, description: e.target.value })}
                    placeholder="Enter description"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Type</label>
                  <select
                    value={newWorkspace.type}
                    onChange={(e) => setNewWorkspace({ ...newWorkspace, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="PERSONAL">Personal</option>
                    <option value="TEAM">Team</option>
                    <option value="CLASSROOM">Classroom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Visibility</label>
                  <select
                    value={newWorkspace.visibility}
                    onChange={(e) => setNewWorkspace({ ...newWorkspace, visibility: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="PRIVATE">Private</option>
                    <option value="PUBLIC">Public</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 dark:border-gray-600 dark:text-white"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateWorkspace} className="flex-1">
                    Create Workspace
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
