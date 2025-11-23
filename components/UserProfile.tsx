'use client'

import React, { useState } from 'react'
import { User, Mail, Calendar, Edit2, Save, X, LogOut } from 'lucide-react'
import { useAuth } from './AuthContext'

export default function UserProfile() {
  const { user, updateProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ name: user?.name || '' })

  if (!user) return null

  const handleSave = () => {
    updateProfile({ name: editData.name })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ name: user.name })
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900">Profile</h3>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4 text-slate-600" />
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="p-2 hover:bg-green-50 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4 text-green-600" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </>
          )}
          <button
            onClick={logout}
            className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="space-y-4">
        {/* Avatar & Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            ) : (
              <h4 className="text-lg font-semibold text-slate-900">{user.name}</h4>
            )}
            <p className="text-slate-600 text-sm">Member</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
          <Mail className="w-5 h-5 text-slate-400" />
          <div>
            <p className="text-sm text-slate-600">Email</p>
            <p className="text-slate-900">{user.email}</p>
          </div>
        </div>

        {/* Join Date */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
          <Calendar className="w-5 h-5 text-slate-400" />
          <div>
            <p className="text-sm text-slate-600">Member since</p>
            <p className="text-slate-900">
              {new Date(user.joinedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}