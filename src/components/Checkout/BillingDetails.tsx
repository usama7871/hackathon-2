"use client";
import { useState } from 'react';

interface BillingFormData {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  street: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo: string;
}

const BillingDetails = () => {
  const [formData, setFormData] = useState<BillingFormData>({
    firstName: '',
    lastName: '',
    company: '',
    country: 'default',
    street: '',
    city: '',
    province: '',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Phone number validation (basic example)
    if (!formData.phone.match(/^\d{10,12}$/)) {
      newErrors.phone = "Please enter a valid phone number (10-12 digits).";
    }

    // Email validation
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Check required fields
    const requiredFields = ["firstName", "lastName", "country", "street", "city", "province", "zipCode"];
    requiredFields.forEach(field => {
      if (!formData[field as keyof BillingFormData]) {
        newErrors[field] = "This field is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Form data:', formData);
      alert("Form submitted successfully!");
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Billing Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name & Last Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className={`w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
                errors.firstName ? "border-red-500" : ""
              }`}
              required
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className={`w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
                errors.lastName ? "border-red-500" : ""
              }`}
              required
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Company Name */}
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company Name (Optional)"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
        />

        {/* Country */}
        <div>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
              errors.country ? "border-red-500" : ""
            }`}
            required
          >
            <option value="default">Country / Region</option>
            <option value="Pakistan">Pakistan</option>
            <option value="India">India</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Nepal">Nepal</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
          {errors.country && (
            <p className="text-sm text-red-500 mt-1">{errors.country}</p>
          )}
        </div>

        {/* Street Address */}
        <div>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street Address"
            className={`w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
              errors.street ? "border-red-500" : ""
            }`}
            required
          />
          {errors.street && (
            <p className="text-sm text-red-500 mt-1">{errors.street}</p>
          )}
        </div>

        {/* City & Province */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Town / City"
              className={`w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
                errors.city ? "border-red-500" : ""
              }`}
              required
            />
            {errors.city && (
              <p className="text-sm text-red-500 mt-1">{errors.city}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="Province"
              className={`w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
                errors.province ? "border-red-500" : ""
              }`}
              required
            />
            {errors.province && (
              <p className="text-sm text-red-500 mt-1">{errors.province}</p>
            )}
          </div>
        </div>

        {/* ZIP Code */}
        <div>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="ZIP Code"
            className={`w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
              errors.zipCode ? "border-red-500" : ""
            }`}
            required
          />
          {errors.zipCode && (
            <p className="text-sm text-red-500 mt-1">{errors.zipCode}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className={`w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
              errors.phone ? "border-red-500" : ""
            }`}
            required
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={`w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
              errors.email ? "border-red-500" : ""
            }`}
            required
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Additional Information */}
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Additional Information"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
          rows={4}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#B88E2F] text-white py-3 rounded-lg hover:bg-[#A07B2A] transition-colors focus:ring-2 focus:ring-[#B88E2F] focus:ring-offset-2"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default BillingDetails;