import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Compass, RotateCcw } from "lucide-react";

interface QiblaCompassProps {
  latitude: number;
  longitude: number;
  standalone?: boolean;
}

interface QiblaData {
  direction: number;
  distance: number;
  compassDirection: string;
}

export default function QiblaCompass({ latitude, longitude, standalone = false }: QiblaCompassProps) {
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [calibrated, setCalibrated] = useState(false);

  const { data: qiblaData, isLoading } = useQuery<QiblaData>({
    queryKey: ["/api/qibla", { latitude, longitude }],
  });

  useEffect(() => {
    if ('DeviceOrientationEvent' in window) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          setDeviceHeading(event.alpha);
        }
      };

      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, []);

  const calibrateCompass = () => {
    setCalibrated(true);
    // Reset device heading for calibration
    setDeviceHeading(0);
  };

  if (isLoading) {
    return (
      <div className={`${standalone ? '' : 'p-4 border-t border-border'}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-40 bg-muted rounded-xl mx-auto w-40"></div>
        </div>
      </div>
    );
  }

  if (!qiblaData) {
    return (
      <div className={`${standalone ? '' : 'p-4 border-t border-border'}`}>
        <div className="text-center text-muted-foreground">
          Unable to calculate Qibla direction
        </div>
      </div>
    );
  }

  const needleRotation = qiblaData.direction - deviceHeading;

  return (
    <section className={`${standalone ? '' : 'p-4 border-t border-border'}`} data-testid="section-qibla">
      {!standalone && (
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Compass className="mr-2 text-secondary" />
          Qibla Direction
        </h2>
      )}
      
      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl p-6 text-center">
        <div className="relative w-40 h-40 mx-auto mb-4" data-testid="compass-container">
          {/* Compass Background */}
          <div className="absolute inset-0 rounded-full border-4 border-border bg-card shadow-lg">
            {/* Compass Markings */}
            <div className="absolute inset-2 rounded-full border border-border/50">
              {/* Cardinal Directions */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-muted-foreground">N</div>
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-xs font-semibold text-muted-foreground">E</div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-muted-foreground">S</div>
              <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 text-xs font-semibold text-muted-foreground">W</div>
            </div>
          </div>
          
          {/* Compass Needle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="compass-needle" 
              style={{ transform: `rotate(${needleRotation}deg)` }}
              data-testid="compass-needle"
            >
              <div className="w-1 h-16 bg-gradient-to-t from-red-500 to-green-500 rounded-full shadow-lg relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-2xl font-bold text-secondary" data-testid="text-qibla-direction">
            {qiblaData.direction}° {qiblaData.compassDirection}
          </p>
          <p className="text-sm text-muted-foreground">
            Distance to Kaaba: <span className="font-medium" data-testid="text-qibla-distance">{qiblaData.distance.toLocaleString()} km</span>
          </p>
          <Button 
            onClick={calibrateCompass}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            data-testid="button-calibrate"
          >
            <RotateCcw className="mr-1 h-4 w-4" />
            Calibrate
          </Button>
        </div>
      </div>
    </section>
  );
}
