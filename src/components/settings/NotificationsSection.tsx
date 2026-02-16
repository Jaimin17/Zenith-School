"use client";

import React, { useState } from "react";
import { Bell, Mail } from "lucide-react";

interface NotificationSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

const NotificationsSection = () => {
  const [emailNotifications, setEmailNotifications] = useState<NotificationSetting[]>([
    {
      id: "announcements",
      name: "Announcements",
      description: "Receive email notifications for new announcements",
      enabled: true,
    },
    {
      id: "assignments",
      name: "Assignment Reminders",
      description: "Get reminded about upcoming assignment due dates",
      enabled: true,
    },
    {
      id: "exams",
      name: "Exam Notifications",
      description: "Receive notifications about upcoming exams and schedules",
      enabled: true,
    },
    {
      id: "attendance",
      name: "Attendance Alerts",
      description: "Receive alerts about attendance records",
      enabled: false,
    },
    {
      id: "grades",
      name: "Grade Updates",
      description: "Get notified when your grades are published",
      enabled: true,
    },
    {
      id: "events",
      name: "Event Updates",
      description: "Receive notifications about school events",
      enabled: false,
    },
  ]);

  const [communicationChannel, setCommunicationChannel] = useState<"email" | "inapp" | "both">("both");

  const [notificationFrequency, setNotificationFrequency] = useState<"immediate" | "daily" | "weekly" | "never">("daily");

  const handleNotificationToggle = (id: string) => {
    setEmailNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, enabled: !notification.enabled } : notification
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-400" />
          Email Notifications
        </h3>

        <div className="space-y-3">
          {emailNotifications.map((notification) => (
            <div key={notification.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{notification.name}</p>
                <p className="text-sm text-gray-500">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={notification.enabled}
                  onChange={() => handleNotificationToggle(notification.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Communication Channels */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-400" />
          Communication Channels
        </h3>

        <div className="space-y-3">
          {/* Email Channel */}
          <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setCommunicationChannel("email")}
          >
            <input
              type="radio"
              name="channel"
              value="email"
              checked={communicationChannel === "email"}
              onChange={() => setCommunicationChannel("email")}
              className="w-4 h-4 text-blue-600 cursor-pointer"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Email Only</p>
              <p className="text-sm text-gray-500">Receive all notifications via email</p>
            </div>
          </div>

          {/* In-App Channel */}
          <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setCommunicationChannel("inapp")}
          >
            <input
              type="radio"
              name="channel"
              value="inapp"
              checked={communicationChannel === "inapp"}
              onChange={() => setCommunicationChannel("inapp")}
              className="w-4 h-4 text-blue-600 cursor-pointer"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">In-App Only</p>
              <p className="text-sm text-gray-500">Receive all notifications inside the application</p>
            </div>
          </div>

          {/* Both Channels */}
          <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setCommunicationChannel("both")}
          >
            <input
              type="radio"
              name="channel"
              value="both"
              checked={communicationChannel === "both"}
              onChange={() => setCommunicationChannel("both")}
              className="w-4 h-4 text-blue-600 cursor-pointer"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Email & In-App</p>
              <p className="text-sm text-gray-500">Receive notifications through both channels</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Frequency */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Frequency</h3>

        <div className="space-y-3">
          {[
            { value: "immediate", label: "Immediate", description: "Get notified instantly" },
            { value: "daily", label: "Daily Digest", description: "Receive a daily summary of notifications" },
            { value: "weekly", label: "Weekly Digest", description: "Receive a weekly summary of notifications" },
            { value: "never", label: "Never", description: "Don't send me any notifications" },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setNotificationFrequency(option.value as any)}
            >
              <input
                type="radio"
                name="frequency"
                value={option.value}
                checked={notificationFrequency === option.value}
                onChange={() => setNotificationFrequency(option.value as any)}
                className="w-4 h-4 text-blue-600 cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{option.label}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Save Preferences
      </button>
    </div>
  );
};

export default NotificationsSection;
