import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, User } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function PrescriptionCard({ prescription, isFullScreen = false, onClose }) {
  const content = (
    <div className={`${isFullScreen ? 'p-6' : 'p-5'} space-y-4`}>
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-6 h-6 text-sky-600" />
          <h3 className="text-xl font-bold text-gray-800">Prescription</h3>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-4 h-4" />
          <p className="text-sm">
            <span className="font-semibold">{prescription.doctor_name}</span>
            {' • '}
            {prescription.doctor_role}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(prescription.created_date).toLocaleDateString('default', { 
            month: 'long', day: 'numeric', year: 'numeric' 
          })}
        </p>
      </div>

      {/* Patient Info */}
      <div className="bg-gray-50 rounded-xl p-3">
        <p className="text-sm text-gray-600">
          <span className="font-medium">For:</span>{' '}
          {prescription.patient_type === 'child' 
            ? `Your child (${prescription.patient_age})`
            : 'You (Adult)'}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Condition:</span> {prescription.condition_label}
        </p>
      </div>

      {/* Medicines */}
      {prescription.medicines && prescription.medicines.length > 0 && (
        <div>
          <h4 className="font-bold text-gray-800 mb-3">💊 Medicines</h4>
          <div className="space-y-3">
            {prescription.medicines.map((med, index) => (
              <div key={index} className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <h5 className="font-bold text-blue-900 mb-2">
                  {med.name} {med.dosage}
                </h5>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• {med.frequency}</li>
                  <li>• For {med.duration}</li>
                  {med.instructions && <li>• {med.instructions}</li>}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Care Instructions */}
      {prescription.care_instructions && prescription.care_instructions.length > 0 && (
        <div>
          <h4 className="font-bold text-gray-800 mb-3">📋 Care Instructions</h4>
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
            <ul className="space-y-2 text-sm text-emerald-800">
              {prescription.care_instructions.map((instruction, index) => (
                <li key={index}>• {instruction}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Warning */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-red-800 mb-1">⚠️ Important</h4>
            <p className="text-sm text-red-700 leading-relaxed">
              {prescription.warning || 
                'This prescription is based on a remote consultation. If new danger signs appear or you feel very unwell, please seek in-person care immediately.'}
            </p>
          </div>
        </div>
      </div>

      {isFullScreen && onClose && (
        <Button onClick={onClose} className="w-full h-12 mt-4">
          Close
        </Button>
      )}
    </div>
  );

  if (isFullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {content}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border-2 border-sky-200">
      {content}
    </div>
  );
}