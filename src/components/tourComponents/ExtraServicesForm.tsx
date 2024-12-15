/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Define the type for a service
type Service = {
  id: string;
  name: string;
  price: number;
  description?: string;
};

// Props interface
interface ExtraServicesFormProps {
  control: any;
  services?: Service[];
  onServiceChange?: (serviceId: string, checked: boolean) => void;
}

const defaultServices: Service[] = [
 {
            id: "healthCoverage",
            name: "Comprehensive Travel Health Insurance",
            price: 250,
            description: "Full medical coverage and emergency assistance",
        },
        {
            id: "travelInsurance",
            name: "Comprehensive Travel Protection",
            price: 150,
            description:
                "Trip cancellation, interruption, and baggage protection",
        },
        {
            id: "guidedTours",
            name: "Professional Local Guide",
            price: 100,
            description: "Expert local guide for in-depth tour experiences",
        },
        {
            id: "transportPackage",
            name: "Private Transportation Package",
            price: 200,
            description: "Comfortable private transfers throughout the tour",
        },
];

const ExtraServicesForm: React.FC<ExtraServicesFormProps> = ({ 
  control, 
  services = defaultServices,
  onServiceChange 
}) => {
  const handleCheckboxChange = (serviceId: string, checked: boolean) => {
    if (onServiceChange) {
      onServiceChange(serviceId, checked);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Extra Services</h3>
        <p className="text-sm text-gray-500">Add additional services to your reservation</p>
      </div>
      
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <Checkbox 
                id={service.id}
                {...control.register(service.id)}
                onCheckedChange={(checked) => handleCheckboxChange(service.id, checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor={service.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {service.name} ($ {service.price})
                </Label>
                {service.description && (
                  <p className="text-sm text-gray-500">
                    {service.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraServicesForm;