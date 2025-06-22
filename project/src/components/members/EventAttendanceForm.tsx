import React, { useState } from 'react';
import { User, Car, Tent, Shield, Loader2, AlertTriangle } from 'lucide-react';

interface EventAttendanceFormProps {
  eventTitle: string;
  eventId: string;
  onSubmit: (formData: AttendanceFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface AttendanceFormData {
  name: string;
  vehicleRegistration: string;
  campingType: 'authentic' | 'plastic' | 'not-camping';
  insuranceConfirmed: boolean;
  allergies: string;
  dietaryRequirements: string;
}

export function EventAttendanceForm({ 
  eventTitle, 
  eventId, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: EventAttendanceFormProps) {
  const [formData, setFormData] = useState<AttendanceFormData>({
    name: '',
    vehicleRegistration: '',
    campingType: 'authentic',
    insuranceConfirmed: false,
    allergies: '',
    dietaryRequirements: ''
  });
  const [errors, setErrors] = useState<Partial<AttendanceFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing/changing
    if (errors[name as keyof AttendanceFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Dedicated handler for insurance checkbox to ensure it works properly
  const handleInsuranceChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      insuranceConfirmed: checked
    }));

    // Clear error when user checks the box
    if (errors.insuranceConfirmed) {
      setErrors(prev => ({
        ...prev,
        insuranceConfirmed: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AttendanceFormData> = {};

    if (!(formData.name ?? '').trim()) {
      newErrors.name = 'Name is required';
    }

    if (!(formData.vehicleRegistration ?? '').trim()) {
      newErrors.vehicleRegistration = 'Vehicle registration is required';
    }

    if (!formData.insuranceConfirmed) {
      newErrors.insuranceConfirmed = 'You must confirm your insurance is active';
    }

    if (!(formData.allergies ?? '').trim()) {
      newErrors.allergies = 'Please specify any allergies or write "None"';
    }

    if (!(formData.dietaryRequirements ?? '').trim()) {
      newErrors.dietaryRequirements = 'Please specify any dietary requirements or write "None"';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    
    if (!validateForm()) {
      console.log('Form validation failed:', errors);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting attendance form:', error);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Form cancelled');
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="flex items-center gap-2 text-amber-500 mb-2">
          <User className="w-4 h-4" />
          <span>Full Name *</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-md text-gray-200 
            focus:outline-none focus:border-amber-500 disabled:opacity-50 ${
            errors.name ? 'border-red-500' : 'border-amber-500/20'
          }`}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Vehicle Registration */}
      <div>
        <label className="flex items-center gap-2 text-amber-500 mb-2">
          <Car className="w-4 h-4" />
          <span>Vehicle Registration *</span>
        </label>
        <input
          type="text"
          name="vehicleRegistration"
          value={formData.vehicleRegistration}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-md text-gray-200 
            focus:outline-none focus:border-amber-500 disabled:opacity-50 ${
            errors.vehicleRegistration ? 'border-red-500' : 'border-amber-500/20'
          }`}
          placeholder="e.g., AB12 CDE"
        />
        {errors.vehicleRegistration && (
          <p className="text-red-500 text-sm mt-1">{errors.vehicleRegistration}</p>
        )}
      </div>

      {/* Camping Type */}
      <div>
        <label className="flex items-center gap-2 text-amber-500 mb-2">
          <Tent className="w-4 h-4" />
          <span>Camping Type *</span>
        </label>
        <select
          name="campingType"
          value={formData.campingType}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
            text-gray-200 focus:outline-none focus:border-amber-500 disabled:opacity-50"
        >
          <option value="authentic">Authentic Camping</option>
          <option value="plastic">Plastic Camping</option>
          <option value="not-camping">Not Camping</option>
        </select>
        <p className="text-gray-400 text-xs mt-1">
          {formData.campingType === 'authentic' && 'Period-appropriate camping gear only.'}
          {formData.campingType === 'plastic' && 'Modern camping equipment allowed.'}
          {formData.campingType === 'not-camping' && 'Not staying overnight at the event.'}
        </p>
      </div>

      {/* Allergies */}
      <div>
        <label className="flex items-center gap-2 text-amber-500 mb-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Allergies *</span>
        </label>
        <textarea
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          disabled={isLoading}
          rows={3}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-md text-gray-200 
            focus:outline-none focus:border-amber-500 disabled:opacity-50 ${
            errors.allergies ? 'border-red-500' : 'border-amber-500/20'
          }`}
          placeholder="Please list any allergies or medical conditions we should be aware of. Write 'None' if you do not have any."
        />
        {errors.allergies && (
          <p className="text-red-500 text-sm mt-1">{errors.allergies}</p>
        )}
      </div>

      {/* Dietary Requirements */}
      <div>
        <label className="flex items-center gap-2 text-amber-500 mb-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Dietary Requirements *</span>
        </label>
        <textarea
          name="dietaryRequirements"
          value={formData.dietaryRequirements}
          onChange={handleChange}
          disabled={isLoading}
          rows={3}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-md text-gray-200 
            focus:outline-none focus:border-amber-500 disabled:opacity-50 ${
            errors.dietaryRequirements ? 'border-red-500' : 'border-amber-500/20'
          }`}
          placeholder="Please list any dietary requirements. Write 'None' if you do not have any."
        />
        {errors.dietaryRequirements && (
          <p className="text-red-500 text-sm mt-1">{errors.dietaryRequirements}</p>
        )}
      </div>

      {/* Insurance Confirmation - Enhanced for better compatibility */}
      <div>
        <div className="flex items-center gap-2 text-amber-500 mb-2">
          <Shield className="w-4 h-4" />
          <span>Insurance Confirmation *</span>
        </div>
        
        {/* Cross-browser compatible checkbox implementation */}
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0 mt-1">
            {/* Hidden native checkbox for form functionality */}
            <input
              type="checkbox"
              name="insuranceConfirmed"
              checked={formData.insuranceConfirmed}
              onChange={handleChange}
              disabled={isLoading}
              className="absolute opacity-0 w-5 h-5 cursor-pointer"
              style={{ zIndex: 10 }}
              id="insurance-checkbox"
            />
            
            {/* Custom visual checkbox that works across all browsers */}
            <div 
              onClick={() => !isLoading && handleInsuranceChange(!formData.insuranceConfirmed)}
              className={`w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 flex items-center justify-center
                ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                ${formData.insuranceConfirmed 
                  ? 'bg-amber-500 border-amber-500' 
                  : `bg-gray-800 ${errors.insuranceConfirmed ? 'border-red-500' : 'border-amber-500/40'} hover:border-amber-500/60`
                }`}
            >
              {formData.insuranceConfirmed && (
                <svg 
                  className="w-3 h-3 text-gray-900" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
            </div>
          </div>
          
          <label 
            htmlFor="insurance-checkbox"
            onClick={() => !isLoading && handleInsuranceChange(!formData.insuranceConfirmed)}
            className={`text-gray-300 text-sm select-none ${
              isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            I confirm that my insurance is active and covers participation in this event
          </label>
        </div>
        
        {errors.insuranceConfirmed && (
          <p className="text-red-500 text-sm mt-1">{errors.insuranceConfirmed}</p>
        )}
        
        {/* Additional help text */}
        <p className="text-gray-500 text-xs mt-2">
          Please ensure your insurance policy covers medieval reenactment activities before confirming attendance.
        </p>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gray-600 text-gray-200 rounded-md 
            hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-amber-500 text-gray-900 rounded-md font-medieval
            hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? 'Confirming...' : 'Confirm Attendance'}
        </button>
      </div>
    </form>
  );
}