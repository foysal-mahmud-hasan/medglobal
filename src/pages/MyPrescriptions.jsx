import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { ChevronLeft, FileText } from 'lucide-react';
import PrescriptionCard from '@/components/telemedicine/PrescriptionCard';

export default function MyPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    const data = await base44.entities.Prescription.list('-created_date');
    setPrescriptions(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white pb-8">
      <div className="bg-white border-b px-6 pt-12 pb-4">
        <div className="flex items-center gap-4">
          <Link to={createPageUrl('MyHealth')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">My Prescriptions</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-3">
        {prescriptions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-500">No prescriptions yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Prescriptions from doctor consultations will appear here
            </p>
          </div>
        ) : (
          prescriptions.map((prescription, index) => (
            <motion.button
              key={prescription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedPrescription(prescription)}
              className="w-full bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-200 text-left hover:border-sky-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-sky-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800">{prescription.condition_label}</h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {prescription.patient_type === 'child' ? 'Child' : 'Adult'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Dr. {prescription.doctor_name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(prescription.created_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.button>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedPrescription && (
          <PrescriptionCard
            prescription={selectedPrescription}
            isFullScreen
            onClose={() => setSelectedPrescription(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}