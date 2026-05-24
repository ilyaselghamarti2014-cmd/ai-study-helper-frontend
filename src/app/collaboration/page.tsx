'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  Share2, 
  FileText,
  Clock,
  CheckCircle,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { api } from '@/lib/api';

interface Workspace {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  resourceCount: number;
  lastActivity: string;
}

interface Activity {
  id: string;
  type: 'message' | 'file' | 'update';
  user: string;
  content: string;
  timestamp: string;
}

export default function CollaborationPage() {
  const [mounted, setMounted] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
    fetchCollaborationData();
  }, []);

  const fetchCollaborationData = async () => {
    try {
      setLoading(true);
      const [workspacesRes] = await Promise.all([
        api.getWorkspaces()
      ]);
      setWorkspaces(workspacesRes.data);
      
      // Mock activities data
      setActivities([
        {
          id: '1',
          type: 'message',
          user: 'John Doe',
          content: 'Added new study notes for Calculus',
          timestamp: '2 minutes ago'
        },
        {
          id: '2',
          type: 'file',
          user: 'Jane Smith',
          content: 'Uploaded practice problems PDF',
          timestamp: '15 minutes ago'
        },
        {
          id: '3',
          type: 'update',
          user: 'Mike Johnson',
          content: 'Updated study plan schedule',
          timestamp: '1 hour ago'
        }
      ]);
    } catch (err) {
      setError('Failed to load collaboration data');
    } finally {
      setLoading(false);
    }
  };

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
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Collaboration Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Work together with your team on study projects
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Invite Members
          </Button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search workspaces, members, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Workspaces Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Workspaces Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Team Workspaces
                  </h2>
                  <Badge variant="secondary" className="dark:bg-gray-700 dark:text-white">
                    {workspaces.length} active
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workspaces.map((workspace, index) => (
                    <motion.div
                      key={workspace.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-lg dark:text-white">
                            {workspace.name}
                          </CardTitle>
                          <CardDescription className="dark:text-gray-400">
                            {workspace.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {workspace.memberCount} members
                            </div>
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-1" />
                              {workspace.resourceCount} resources
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 dark:border-gray-600 dark:text-white">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Chat
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 dark:border-gray-600 dark:text-white">
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Recent Activity
                  </h2>
                  <Button variant="ghost" size="sm" className="dark:text-white">
                    View All
                  </Button>
                </div>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {activities.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-start gap-3 pb-4 border-b dark:border-gray-700 last:border-0 last:pb-0"
                        >
                          <div className={`p-2 rounded-full ${
                            activity.type === 'message' ? 'bg-blue-100 dark:bg-blue-900' :
                            activity.type === 'file' ? 'bg-green-100 dark:bg-green-900' :
                            'bg-purple-100 dark:bg-purple-900'
                          }`}>
                            {activity.type === 'message' && <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                            {activity.type === 'file' && <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />}
                            {activity.type === 'update' && <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">
                              <span className="font-semibold">{activity.user}</span> {activity.content}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {activity.timestamp}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:from-blue-600 dark:to-purple-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Start Collaborating
                      </h3>
                      <p className="text-sm opacity-90">
                        Create a new workspace and invite team members to start working together
                      </p>
                    </div>
                    <Button className="bg-white text-blue-600 hover:bg-gray-100">
                      <Plus className="w-4 h-4 mr-2" />
                      New Workspace
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
