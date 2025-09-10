import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import BottomNavigation from "@/components/bottom-navigation";
import { Settings as SettingsIcon, Bell, MapPin, Calculator, Palette } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [calculationMethod, setCalculationMethod] = useState("ISNA");
  const [darkMode, setDarkMode] = useState(false);

  const calculationMethods = [
    { value: "ISNA", label: "Islamic Society of North America (ISNA)" },
    { value: "MWL", label: "Muslim World League" },
    { value: "EGYPT", label: "Egyptian General Authority of Survey" },
    { value: "MAKKAH", label: "Umm Al-Qura University, Makkah" },
    { value: "KARACHI", label: "University of Islamic Sciences, Karachi" },
  ];

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => alert("Location permission granted"),
        () => alert("Location permission denied")
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-muted text-foreground p-4 rounded-b-lg shadow-lg">
        <h1 className="text-xl font-bold flex items-center" data-testid="settings-title">
          <SettingsIcon className="mr-2" />
          Settings
        </h1>
        <p className="text-sm opacity-90">Customize your Islamic companion</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Prayer Times Settings */}
        <Card data-testid="card-prayer-settings">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5" />
              Prayer Times
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="calculation-method">Calculation Method</Label>
              <Select value={calculationMethod} onValueChange={setCalculationMethod}>
                <SelectTrigger id="calculation-method" data-testid="select-calculation-method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {calculationMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Settings */}
        <Card data-testid="card-notification-settings">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="prayer-notifications">Prayer Time Notifications</Label>
              <Switch
                id="prayer-notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
                data-testid="switch-notifications"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Get notified when it's time for prayer
            </p>
          </CardContent>
        </Card>

        {/* Location Settings */}
        <Card data-testid="card-location-settings">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Location is used to calculate accurate prayer times and Qibla direction
            </p>
            <Button onClick={handleLocationPermission} data-testid="button-location-permission">
              Grant Location Permission
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card data-testid="card-appearance-settings">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
                data-testid="switch-dark-mode"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Toggle between light and dark themes
            </p>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card data-testid="card-about">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Islamic Companion v1.0.0
            </p>
            <p className="text-sm text-muted-foreground">
              A comprehensive Islamic app for prayer times, Qibla direction, and more.
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation currentPage="settings" />
    </div>
  );
}
