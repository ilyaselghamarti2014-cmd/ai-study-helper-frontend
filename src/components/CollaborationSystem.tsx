'use client';

import { useState, useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/featureFlags';
import apiClient from '@/lib/apiClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Workspace {
  id: number;
  name: string;
  description: string;
  members: number;
  resources: number;
  isOwner: boolean;
}

interface WorkspaceMember {
  id: number;
  userId: number;
  username: string;
  role: string;
  joinedAt: string;
}

interface WorkspaceResource {
  id: number;
  title: string;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
}

export default function CollaborationSystem() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [resources, setResources] = useState<WorkspaceResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'list' | 'detail' | 'create'>('list');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isFeatureEnabled('collaboration')) {
      loadWorkspaces();
    }
  }, []);

  const loadWorkspaces = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getWorkspaces();
      setWorkspaces(response.data);
    } catch (error) {
      console.error('Failed to load workspaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const createWorkspace = async () => {
    try {
      setLoading(true);
      const response = await apiClient.createWorkspace({ name, description });
      await loadWorkspaces();
      setName('');
      setDescription('');
      setMode('list');
    } catch (error) {
      console.error('Failed to create workspace:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadWorkspaceDetails = async (workspaceId: number) => {
    try {
      setLoading(true);
      // In production, would load members and resources
      setMembers([]);
      setResources([]);
    } catch (error) {
      console.error('Failed to load workspace details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isFeatureEnabled('collaboration')) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Collaboration</h2>
        <div className="flex gap-2">
          <Button
            variant={mode === 'list' ? 'default' : 'outline'}
            onClick={() => setMode('list')}
          >
            My Workspaces
          </Button>
          <Button
            variant={mode === 'create' ? 'default' : 'outline'}
            onClick={() => setMode('create')}
          >
            New Workspace
          </Button>
        </div>
      </div>

      {mode === 'list' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Workspaces</h3>
          {loading ? (
            <p>Loading...</p>
          ) : workspaces.length === 0 ? (
            <p className="text-gray-500">No workspaces yet. Create your first one!</p>
          ) : (
            <div className="space-y-3">
              {workspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setCurrentWorkspace(workspace);
                    loadWorkspaceDetails(workspace.id);
                    setMode('detail');
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{workspace.name}</h4>
                      <p className="text-sm text-gray-500">{workspace.description}</p>
                      <p className="text-sm text-gray-400">
                        {workspace.members} members • {workspace.resources} resources
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      {workspace.isOwner && <Badge>Owner</Badge>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {mode === 'create' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Create Workspace</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Workspace Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Study Group 2024, Math Club"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the purpose of this workspace..."
                className="w-full p-2 border rounded min-h-[100px]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={createWorkspace}
                disabled={!name || loading}
                className="flex-1"
              >
                {loading ? 'Creating...' : 'Create Workspace'}
              </Button>
              <Button
                onClick={() => setMode('list')}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {mode === 'detail' && currentWorkspace && (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{currentWorkspace.name}</h3>
                <p className="text-gray-500">{currentWorkspace.description}</p>
              </div>
              <div className="flex gap-2">
                {currentWorkspace.isOwner && <Badge>Owner</Badge>}
                <Button onClick={() => setMode('list')} variant="outline">
                  Back
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">{currentWorkspace.members}</div>
                <p className="text-sm text-gray-600">Members</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">{currentWorkspace.resources}</div>
                <p className="text-sm text-gray-600">Resources</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Members</h3>
            {members.length === 0 ? (
              <p className="text-gray-500">No members yet.</p>
            ) : (
              <div className="space-y-2">
                {members.map((member) => (
                  <div key={member.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <span className="font-medium">{member.username}</span>
                      <Badge variant="outline" className="ml-2">{member.role}</Badge>
                    </div>
                    <span className="text-sm text-gray-400">
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {currentWorkspace.isOwner && (
              <Button className="mt-4" variant="outline">
                Invite Members
              </Button>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Shared Resources</h3>
            {resources.length === 0 ? (
              <p className="text-gray-500">No resources shared yet.</p>
            ) : (
              <div className="space-y-2">
                {resources.map((resource) => (
                  <div key={resource.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <span className="font-medium">{resource.title}</span>
                      <Badge variant="outline" className="ml-2">{resource.type}</Badge>
                    </div>
                    <span className="text-sm text-gray-400">
                      {resource.uploadedBy} • {new Date(resource.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Button className="mt-4" variant="outline">
              Upload Resource
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
