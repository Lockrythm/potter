import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Phone, GraduationCap, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomerInfo } from '@/types/order';

interface CheckoutFormProps {
  customerInfo: CustomerInfo;
  onChange: (info: CustomerInfo) => void;
}

export function CheckoutForm({ customerInfo, onChange }: CheckoutFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateField = <K extends keyof CustomerInfo>(field: K, value: CustomerInfo[K]) => {
    onChange({ ...customerInfo, [field]: value });
  };

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-secondary" />
          <span className="font-medium text-sm">Your Details</span>
          <span className="text-xs text-muted-foreground">(Optional)</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-4 border-t border-border/50">
              {/* Customer Type */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Are you a...</Label>
                <RadioGroup
                  value={customerInfo.type || ''}
                  onValueChange={(value) => updateField('type', value as 'college' | 'outsider')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="college" id="college" />
                    <Label htmlFor="college" className="text-sm cursor-pointer">
                      <GraduationCap className="h-4 w-4 inline mr-1" />
                      College Student
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outsider" id="outsider" />
                    <Label htmlFor="outsider" className="text-sm cursor-pointer">
                      Outsider
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Semester */}
              <div className="space-y-2">
                <Label htmlFor="semester" className="text-xs text-muted-foreground">Semester</Label>
                <Select
                  value={customerInfo.semester || ''}
                  onValueChange={(value) => updateField('semester', value)}
                >
                  <SelectTrigger id="semester" className="h-9">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <SelectItem key={sem} value={String(sem)}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department" className="text-xs text-muted-foreground">Department</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="department"
                    placeholder="e.g., Computer Science"
                    value={customerInfo.department || ''}
                    onChange={(e) => updateField('department', e.target.value)}
                    className="pl-10 h-9"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs text-muted-foreground">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={customerInfo.name || ''}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="pl-10 h-9"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="03xx-xxxxxxx"
                    value={customerInfo.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="pl-10 h-9"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
