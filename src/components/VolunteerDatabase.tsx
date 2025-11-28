import { useState } from 'react';
import { Badge } from './Badge';
import { Search, Filter, Edit, UserCog } from 'lucide-react';

export function VolunteerDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');

  const volunteers = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      skills: ['Driver', 'Server'],
      hours: 45,
      status: 'Active',
      role: 'Volunteer'
    },
    {
      id: 2,
      name: 'Michael Johnson',
      email: 'michael.j@email.com',
      skills: ['Environment', 'Teacher'],
      hours: 38,
      status: 'Active',
      role: 'Volunteer'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      skills: ['First Aid', 'Server'],
      hours: 52,
      status: 'Active',
      role: 'Coordinator'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.w@email.com',
      skills: ['Driver'],
      hours: 12,
      status: 'Inactive',
      role: 'Volunteer'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.a@email.com',
      skills: ['Education', 'Environment'],
      hours: 67,
      status: 'Active',
      role: 'Volunteer'
    }
  ];

  return (
    <div className="p-8">
      <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '24px' }}>
        Volunteer Database Management
      </h1>

      <div 
        className="p-6"
        style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
      >
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search 
              size={20} 
              style={{ 
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#2C3E50'
              }}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border"
              style={{
                borderColor: '#E0E0E0',
                borderRadius: '8px',
                color: '#2C3E50',
                outline: 'none'
              }}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border"
            style={{
              borderColor: '#E0E0E0',
              borderRadius: '8px',
              color: '#2C3E50'
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border"
            style={{
              borderColor: '#E0E0E0',
              borderRadius: '8px',
              color: '#2C3E50'
            }}
          >
            <option value="all">All Roles</option>
            <option value="volunteer">Volunteer</option>
            <option value="coordinator">Coordinator</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Volunteers Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '2px solid #E0E0E0' }}>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Name
                </th>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Email
                </th>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Skills
                </th>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Total Hours
                </th>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Status
                </th>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Role
                </th>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer) => (
                <tr key={volunteer.id} style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td className="py-3 px-4" style={{ color: '#2C3E50', fontWeight: 500 }}>
                    {volunteer.name}
                  </td>
                  <td className="py-3 px-4" style={{ color: '#2C3E50' }}>
                    {volunteer.email}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1"
                          style={{
                            backgroundColor: '#F5F7FA',
                            color: '#2C3E50',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                    {volunteer.hours}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={volunteer.status === 'Active' ? 'success' : 'error'}>
                      {volunteer.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4" style={{ color: '#2C3E50' }}>
                    {volunteer.role}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 transition-colors hover:bg-opacity-80"
                        style={{
                          backgroundColor: '#779F8D',
                          borderRadius: '4px'
                        }}
                        title="Edit Profile"
                      >
                        <Edit size={16} color="#FFFFFF" />
                      </button>
                      <button
                        className="p-2 transition-colors hover:bg-opacity-80"
                        style={{
                          backgroundColor: '#2C3E50',
                          borderRadius: '4px'
                        }}
                        title="Change Permissions"
                      >
                        <UserCog size={16} color="#FFFFFF" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div style={{ color: '#2C3E50', fontSize: '14px' }}>
            Showing {volunteers.length} of {volunteers.length} volunteers
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2"
              style={{
                backgroundColor: '#F5F7FA',
                color: '#2C3E50',
                borderRadius: '8px',
                fontWeight: 500
              }}
            >
              Previous
            </button>
            <button
              className="px-4 py-2"
              style={{
                backgroundColor: '#779F8D',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: 500
              }}
            >
              1
            </button>
            <button
              className="px-4 py-2"
              style={{
                backgroundColor: '#F5F7FA',
                color: '#2C3E50',
                borderRadius: '8px',
                fontWeight: 500
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
