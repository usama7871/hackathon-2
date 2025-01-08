"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    delay: 0.2
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    details: ["support@furniro.com", "info@furniro.com"],
    color: "bg-green-50",
    iconColor: "text-green-600",
    delay: 0.3
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Address",
    details: ["396 Lillian Blvd, Holbrook", "New York, 11741"],
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    delay: 0.4
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Working Hours",
    details: ["Monday - Friday: 9:00 - 22:00", "Saturday - Sunday: 10:00 - 20:00"],
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    delay: 0.5
  }
];

export default function ContactInfo() {
  return (
    <>
      {contactInfo.map((info, index) => (
        <motion.div
          key={info.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: info.delay }}
          className="group"
        >
          <div className={`p-6 rounded-2xl ${info.color} transition-all duration-300
            group-hover:shadow-lg group-hover:scale-105`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${info.color} ${info.iconColor}
                group-hover:bg-white transition-colors`}>
                {info.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p
                    key={idx}
                    className="text-gray-600 text-sm mb-1 hover:text-[#B88E2F] 
                      transition-colors cursor-pointer"
                  >
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
} 