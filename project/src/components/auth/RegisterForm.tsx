import React, { useState } from 'react';
import { ParchmentBox } from '../ui/ParchmentBox';
import { User, Mail, Lock, Calendar, MapPin, Phone, Users, AlertTriangle, FileText, Eye, EyeOff, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface RegisterFormProps {
  onSuccess: () => void;
  onBackToLogin: () => void;
}

export function RegisterForm({ onSuccess, onBackToLogin }: RegisterFormProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [accessPassword, setAccessPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: '',
    postcode: '',
    phone: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    groupDivision: '',
    allergies: '',
    dietaryRequirements: '',
    criminalConvictions: '',
    declarationAgreed: false
  });
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeclaration, setShowDeclaration] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (accessPassword === 'Lewes1264') {
      setHasAccess(true);
      setShowPasswordModal(false);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

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

  const handleDeclarationToggle = () => {
    setFormData(prev => ({
      ...prev,
      declarationAgreed: !prev.declarationAgreed
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!formData.declarationAgreed) {
      setError('You must agree to the declaration to proceed');
      return;
    }

    setIsLoading(true);

    try {
      console.log('🔄 Starting registration process...');
      console.log('📝 Form data:', {
        name: formData.name,
        email: formData.email,
        groupDivision: formData.groupDivision,
        phone: formData.phone,
        // Don't log sensitive data
      });
      
      // First check if email already exists in member_auth table
      console.log('🔍 Checking if email already exists...');
      const { data: existingMember } = await supabase
        .from('member_auth')
        .select('email')
        .eq('email', formData.email)
        .maybeSingle();

      if (existingMember) {
        throw new Error('Email already registered. Please use the login form instead.');
      }

      console.log('✅ Email is available');

      // Sign up with Supabase Auth
      console.log('🔐 Creating auth user...');
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      });

      if (signUpError) {
        console.error('❌ Auth signup error:', signUpError);
        // Handle specific Supabase auth errors
        if (signUpError.message.includes('User already registered')) {
          throw new Error('Email already registered. Please use the login form instead.');
        }
        throw signUpError;
      }
      
      if (authData.user) {
        console.log('✅ Auth user created:', authData.user.id);
        
        // Prepare the member data for update (excluding id since it's the primary key)
        const memberData = {
          name: formData.name,
          email: formData.email,
          is_admin: false,
          can_view_members_area: false,
          date_of_birth: formData.dateOfBirth || null,
          address: formData.address || null,
          postcode: formData.postcode || null,
          phone: formData.phone || null,
          emergency_contact_name: formData.emergencyContactName || null,
          emergency_contact_phone: formData.emergencyContactPhone || null,
          group_division: formData.groupDivision || null,
          allergies: formData.allergies || null,
          dietary_requirements: formData.dietaryRequirements || null,
          criminal_convictions: formData.criminalConvictions || null,
          declaration_agreed: formData.declarationAgreed,
          declaration_date: new Date().toISOString(),
          profile_image_url: null
        };

        console.log('💾 Updating member data:', memberData);
        
        // Update user profile in member_auth table (assuming trigger created basic entry)
        const { data: updateData, error: updateError } = await supabase
          .from('member_auth')
          .update(memberData)
          .eq('id', authData.user.id)
          .select()
          .single();

        if (updateError) {
          console.error('❌ Database update error:', updateError);
          console.error('Error details:', {
            code: updateError.code,
            message: updateError.message,
            details: updateError.details,
            hint: updateError.hint
          });
          
          // If update fails, it might be because no trigger exists, so try insert as fallback
          if (updateError.code === 'PGRST116') { // No rows updated
            console.log('🔄 No existing profile found, trying insert as fallback...');
            
            const memberDataWithId = {
              id: authData.user.id,
              ...memberData
            };

            const { data: insertData, error: insertError } = await supabase
              .from('member_auth')
              .insert(memberDataWithId)
              .select()
              .single();

            if (insertError) {
              console.error('❌ Database insert error:', insertError);
              if (insertError.code === '23505') { // Unique constraint violation
                throw new Error('Email already registered. Please use the login form instead.');
              }
              throw new Error(`Database error: ${insertError.message}`);
            }

            console.log('✅ Member profile created successfully via insert:', insertData);
          } else {
            throw new Error(`Database error: ${updateError.message}`);
          }
        } else {
          console.log('✅ Member profile updated successfully:', updateData);
        }

        console.log('✅ Registration process completed');
        onSuccess();
      } else {
        throw new Error('Failed to create user account');
      }
    } catch (error: any) {
      console.error('❌ Registration error:', error);
      setError(error.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  const declarationText = `DECLARATION - to be read by ALL applicants 16 years of age and over.

Data Protection Act 1998: The data collected by The Sussex Medieval Society (henceforth referred to as the SMS) is for the purposes of managing memberships. All data is treated as confidential and no personal or sensitive data will be shared with any third party without consent unless required by law.

1. I do not object to my name, image, address, membership or other details being held on computer for the purpose of distributing information and other administration purposes relating to the SMS and other organisations lawfully entitled to the same.

2. As a condition of joining the SMS, I agree to be bound by its rules and code of conduct. I further understand and accept that neither the organisers, nor anyone whose name appears in connection with any event organised by or attended by members of the SMS, nor the SMS or its officials shall be held liable for any personal injury, loss, or damage which may occur before, during or after an event or re-enactment.

3. I am aware that at SMS events I may be photographed by third parties, and that the SMS cannot control the use of those images.

4. I am aware that it is a legal requirement that nobody under eighteen years of age may take part in mock combat without the express written consent of their parent or guardian and that a separate 'Parental Consent' form is available for that purpose.

5. I will not take part in any activity with the SMS until I have read and understood the safety policy, rules, and risk assessments contained in the Membership Handbook.

6. I am aware that membership of the SMS lapses in early May each year when membership & these declarations are both due for renewal.

7. I am aware that members must be medically fit to participate in their chosen activity and take full responsibility for their own personal health and fitness. I will consult my GP if necessary, before engaging in any strenuous physical activity.

8. To the best of my knowledge & understanding the information I have given on this form is true and I agree to inform the SMS of any change in my circumstances that may materially affect my membership. I understand that this application/renewal form, and the information it contains, forms the basis of a Contract of Membership between myself and Sussex Medieval Society. False, misleading, or knowingly incorrect information will render this contract null and void and make the applicant liable to immediate dismissal.

I have read & agree to all of the above declaration and consent to my personal data being collected and handled in accordance with the Data Protection Policy of the Sussex Medieval Society.`;

  // Show password modal if user doesn't have access yet
  if (!hasAccess) {
    return (
      <>
        <ParchmentBox>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-amber-500" />
              <h2 className="text-2xl font-medieval text-amber-500">Registration Access</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Please enter the registration password to access the membership form.
            </p>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-6 py-3 bg-amber-500 text-gray-900 rounded-lg font-medieval
                hover:bg-amber-400 transition-colors"
            >
              Enter Password
            </button>
            <div className="mt-6">
              <button
                onClick={onBackToLogin}
                className="text-amber-500 hover:text-amber-400 transition-colors text-sm"
              >
                Back to Login
              </button>
            </div>
          </div>
        </ParchmentBox>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95">
            <div className="bg-gray-800 p-6 rounded-lg border border-amber-500/20 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medieval text-amber-500">Enter Registration Password</h3>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setAccessPassword('');
                    setPasswordError(false);
                  }}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  value={accessPassword}
                  onChange={(e) => {
                    setAccessPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  className={`w-full px-4 py-2 bg-gray-900 border rounded-lg mb-4
                    ${passwordError 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-amber-500/20 focus:border-amber-500'
                    }
                    text-gray-200 focus:outline-none`}
                  placeholder="Enter registration password"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mb-4">Incorrect password</p>
                )}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setAccessPassword('');
                      setPasswordError(false);
                    }}
                    className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 text-gray-900 rounded-lg
                      hover:bg-amber-400 transition-colors"
                  >
                    Access Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  // Show the actual registration form once password is entered correctly
  return (
    <ParchmentBox>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <h2 className="text-2xl font-medieval text-amber-500 mb-6">New Member Registration</h2>
        
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
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
                required
                className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                  text-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-amber-500 mb-2">
                <Mail className="w-4 h-4" />
                <span>Email *</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                  text-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-amber-500 mb-2">
                <Lock className="w-4 h-4" />
                <span>Password *</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 pr-12 bg-gray-800 border border-amber-500/20 rounded-md 
                    text-gray-200 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-amber-500 mb-2">
                <Lock className="w-4 h-4" />
                <span>Confirm Password *</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 pr-12 bg-gray-800 border border-amber-500/20 rounded-md 
                    text-gray-200 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-amber-500 mb-2">
                <Calendar className="w-4 h-4" />
                <span>Date of Birth *</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                  text-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-amber-500 mb-2">
                <Phone className="w-4 h-4" />
                <span>Phone Number *</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                  text-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-2 text-amber-500 mb-2">
              <MapPin className="w-4 h-4" />
              <span>Address *</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                text-gray-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-amber-500 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Postcode *</span>
              </label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                  text-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-amber-500 mb-2">
                <Users className="w-4 h-4" />
                <span>Group Division *</span>
              </label>
              <select
                name="groupDivision"
                value={formData.groupDivision}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                  text-gray-200 focus:outline-none focus:border-amber-500"
              >
                <option value="">Select a division</option>
                <option value="Lewes">Lewes</option>
                <option value="Portsmouth">Portsmouth</option>
                <option value="Derby">Derby</option>
                <option value="Routier">Routier</option>
              </select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-amber-500 mb-2">
                <User className="w-4 h-4" />
                <span>Emergency Contact Name *</span>
              </label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                  text-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-amber-500 mb-2">
                <Phone className="w-4 h-4" />
                <span>Emergency Contact Number *</span>
              </label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                  text-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Health Information */}
          <div>
            <label className="flex items-center gap-2 text-amber-500 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Allergies *</span>
            </label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                text-gray-200 focus:outline-none focus:border-amber-500"
              placeholder="Please list any allergies or medical conditions we should be aware of. Write 'None' if you do not have any."
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-amber-500 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Dietary Requirements *</span>
            </label>
            <textarea
              name="dietaryRequirements"
              value={formData.dietaryRequirements}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                text-gray-200 focus:outline-none focus:border-amber-500"
              placeholder="Please list any dietary requirements. Write 'None' if you do not have any."
            />
          </div>

          {/* Criminal Convictions */}
          <div>
            <label className="flex items-center gap-2 text-amber-500 mb-2">
              <FileText className="w-4 h-4" />
              <span>Previous or Outstanding Criminal Convictions *</span>
            </label>
            <textarea
              name="criminalConvictions"
              value={formData.criminalConvictions}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-2 bg-gray-800 border border-amber-500/20 rounded-md 
                text-gray-200 focus:outline-none focus:border-amber-500"
              placeholder="Please declare any previous or outstanding criminal convictions. Write 'None' if you do not have any."
            />
          </div>

          {/* Declaration - Safari-compatible checkbox */}
          <div className="border border-amber-500/20 rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medieval text-amber-500">Declaration</h3>
              <button
                type="button"
                onClick={() => setShowDeclaration(!showDeclaration)}
                className="text-amber-500 hover:text-amber-400 transition-colors text-sm"
              >
                {showDeclaration ? 'Hide' : 'Show'} Full Declaration
              </button>
            </div>
            
            {showDeclaration && (
              <div className="mb-4 p-4 bg-gray-800/50 rounded-md max-h-64 overflow-y-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap font-sans">
                  {declarationText}
                </pre>
              </div>
            )}

            {/* Safari-compatible checkbox implementation */}
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0 mt-1">
                {/* Hidden native checkbox for form functionality */}
                <input
                  type="checkbox"
                  name="declarationAgreed"
                  checked={formData.declarationAgreed}
                  onChange={handleChange}
                  required
                  className="absolute opacity-0 w-4 h-4 cursor-pointer"
                  style={{ zIndex: 10 }}
                />
                
                {/* Custom visual checkbox that works with Safari */}
                <div 
                  onClick={handleDeclarationToggle}
                  className={`w-4 h-4 border-2 rounded cursor-pointer transition-all duration-200 flex items-center justify-center
                    ${formData.declarationAgreed 
                      ? 'bg-amber-500 border-amber-500' 
                      : 'bg-gray-800 border-amber-500/40 hover:border-amber-500/60'
                    }`}
                >
                  {formData.declarationAgreed && (
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
                onClick={handleDeclarationToggle}
                className="text-gray-300 text-sm cursor-pointer select-none"
              >
                I have read and agree to the declaration above and consent to my personal data being 
                collected and handled in accordance with the Data Protection Policy of the Sussex Medieval Society. *
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-amber-500 text-gray-900 rounded-md font-medieval
            hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Registering...' : 'Register & Enter Members Area'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-amber-500 hover:text-amber-400 transition-colors text-sm"
          >
            Already have an account? Sign in here
          </button>
        </div>

        <div className="mt-6 p-4 bg-amber-500/10 rounded-lg">
          <p className="text-amber-500 text-sm text-center">
            <strong>Note:</strong> Your session will persist until you manually log out.
          </p>
        </div>
      </form>
    </ParchmentBox>
  );
}