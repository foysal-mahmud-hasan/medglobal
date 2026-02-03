import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/index.js';
import { base44} from '../api/base44Client.js'
import { ChevronLeft, Baby } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';

export default function AddChild() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [childData, setChildData] = useState({
    name: '',
    birth_date: '',
    gender: 'male',
    country: 'Bangladesh'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await base44.entities.ChildProfile.create(childData);
      navigate(createPageUrl('ChildHealth'));
    } catch (error) {
      console.error('Error creating child profile:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-4">
          <Link to={createPageUrl('ChildHealth')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Add Child Profile</h1>
        </div>
      </div>

      <div className="px-6 py-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Baby className="w-10 h-10 text-violet-600" />
              </div>
              <p className="text-gray-600">Enter your child's information</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Child's Name
                </label>
                <Input
                  value={childData.name}
                  onChange={(e) => setChildData({ ...childData, name: e.target.value })}
                  placeholder="Enter name or nickname"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  value={childData.birth_date}
                  onChange={(e) => setChildData({ ...childData, birth_date: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Gender
                </label>
                <Select
                  value={childData.gender}
                  onValueChange={(value) => setChildData({ ...childData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Boy</SelectItem>
                    <SelectItem value="female">Girl</SelectItem>
                    <SelectItem value="other">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Country
                </label>
                <Select
                  value={childData.country}
                  onValueChange={(value) => setChildData({ ...childData, country: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 text-lg rounded-2xl bg-violet-500 hover:bg-violet-600"
          >
            {loading ? 'Saving...' : 'Save Child Profile'}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}